import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
 

  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  

  const isInitiallyApplied = singleJob?.application?.some(application=>application.applicant===user?._id) || false; 
  const [isApplied,setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async() =>{
      try {
        const res = await axios.get(`${APPLICATION_END_POINT}/apply/${jobId}`,{withCredentials:true});
        if(res.data.success){
          console.log(res.data.message)
          setIsApplied(true); //
          const updateSingleJob = {...singleJob,application:[...singleJob.application,{applicant:user?._id}]}
          dispatch(setSingleJob(updateSingleJob)) //helps to update real time
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message);
      }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.application.some(application=>application.applicant == user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#720B97] font-bold"} variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick = {isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-bold py-4 text-lg">Job Description</h1>
      <div className="my-2">
        <h1 className="font-bold my-1 text-lg">
          Role:<span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Location:<span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Description:<span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Experience:<span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Total Applicants:<span className="pl-4 font-normal text-gray-800">{singleJob?.application?.length}</span>
        </h1>
        <h1 className="font-bold my-1 text-lg">
          Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
