import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Signup = () => {
  const [input,setInput] =useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler =(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const changeFileHandler =(e)=>{
    setInput({...input,file:e.target.files?.[0]});
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },withCredentials:true,
      });
      if (res?.data?.success) {
        navigate("/login");
        toast.success(res.data.message);
    }    
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex item-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" value ={input.name} name="fullname" onChange ={changeEventHandler}  placeholder="haaid" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" value ={input.email} name="email" onChange ={changeEventHandler} placeholder="haaid@gmail.com" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="text"value ={input.phoneNumber} name="phoneNumber" onChange ={changeEventHandler} placeholder="8080808080" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" value ={input.password} name="password" onChange={changeEventHandler}  placeholder="Password" />
          </div>
          <div className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2 ">
              <input
                type="radio"
                id="option-student"
                name="role"
                value="Student"
                checked={input.role ==='Student'}
                onChange={changeEventHandler}
                className="custom-radio"
              />
              <Label htmlFor="option-student">Student</Label>
            </div>
            <div className="flex items-center space-x-2 mr-20">
              <input
                type="radio"
                id="option-recruiter"
                name="role"
                value="Recruiter"
                checked={input.role ==='Recruiter'}
                onChange={changeEventHandler}
                className="custom-radio"
              />
              <Label htmlFor="option-recruiter">Recruiter</Label>
            </div>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
            <Input
            accept ="image/*"
            type="file"
            onChange={changeFileHandler}
            className="cursor-pointer"/>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm">Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
          <style>{`
            .custom-radio {
              appearance: none;
              width: 1rem;
              height: 1rem;
              border: 2px solid #4a5568;
              border-radius: 50%;
              display: inline-block;
              position: relative;
              cursor: pointer;
              outline: none;
              transition: background-color 0.2s ease;
            }
            .custom-radio:checked::before {
              content: "";
              width: 0.5rem;
              height: 0.5rem;
              background-color: #1a202c;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          `}</style>
        </form>
      </div>
    </div>
  );
};

export default Signup;
