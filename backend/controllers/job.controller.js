import { Job } from "../models/job.model.js";

//admin work
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userID = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "Soething is missing",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            Company: companyId,
            createdBy: userID,
        });
        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({ path: "Company" }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}


//admin will check the jobs he has created till now
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId }).populate({
            path: 'Company',
            createdAt: -1
        });
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
    }
}