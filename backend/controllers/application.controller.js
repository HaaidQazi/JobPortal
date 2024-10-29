import { application } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { populate } from "dotenv";

export const applyJob = async (req,res) =>{
    try {
        const userID = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message :"Job id is required",
                success : false
            })
        };

        //check if it the user has already applied for the job 
        const existingApplication = await Application.findOne({job:jobId,applicant:userID});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this jobs",
                success:false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        //create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userID,
        });

        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            messsage:"Job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async(req,res)=>{
    try {
        const userID=req.id;
        const application = await Application.find({applicant:userID}).sort({createdAt: -1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'Company',
                options:{sort:{createdAt:-1}}
            }
        });
        if(application){
            return res.status(200).json({
                application,
                success:true
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const getApplicants = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'application',
            options:{sort:{createdAt:-1}},
            populate:{path:'applicant'}
        });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async(req,res)=>{
    try {
        const { status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        };

        //find the app by applicationID

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            })
        };

        //update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}