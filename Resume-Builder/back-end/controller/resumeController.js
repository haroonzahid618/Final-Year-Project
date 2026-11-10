
import imageFeature from "../configs/imageFeature.js";
import Resume from "../models/Resume.js";
import fs from 'fs';

//create a new resume
//POST: /api/resumes/create
export const createResume = async (req,res) => {

   try {

    const userId = req.userId;
    const {title} = req.body;

    const newResume = await Resume.create({userId,title});
    return res.status(200).json({message: "Resume create successfully", resume: newResume});

   } catch (error) {
    return res.status(400).json({message: error.message})
    
   }
    
}

//delete a new resume
//DELETE: /api/resumes/delete
export const deleteResume = async (req,res) => {

   try {

    const userId = req.userId;
    const {resumeId} = req.params;

     await Resume.findOneAndDelete({userId, _id:resumeId});
    return res.status(200).json({message: "Resume delete successfully"});

   } catch (error) {
    return res.status(400).json({message: error.message})
    
   }
    
}
// get user resume by Id
// GET: /api/resumes/get
export const getResumeById = async (req,res) => {

   try {

    const userId = req.userId;
    const {resumeId} = req.params;

    const resume = await Resume.findOne({userId, _id:resumeId})
    if (!resume) {
      return res.status(404).json({message: 'Resume Not Found!'})
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return res.status(200).json({resume});

   } catch (error) {
    return res.status(400).json({message: error.message})
    
   }
    
}

// get resume by Id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req,res) => {

   try {

    const {resumeId} = req.params;

    const resume = await Resume.findOne({public:true , _id :resumeId})

    if (!resume) {
      return res.status(404).json({message: 'Resume Not Found!'})
    }

    return res.status(200).json({resume});

   } catch (error) {
    return res.status(400).json({message: error.message})
    
   }
    
}

// resume update
// PUT :/api/resumes/updates

export const updateResume = async (req,res) => {
   try {
      const userId = req.userId;
      const {resumeId, resumeData, removeBackground} = req.body;
      const image = req.file;

      let resumeDataCopy;
      if (typeof resumeData === 'string'){
         resumeDataCopy = await JSON.parse(resumeData)
      }else{
         resumeDataCopy = structuredClone(resumeData)
      }

      if (image) {

         const imageBufferData = fs.createReadStream(image.path)

         const response = await imageFeature.files.upload({
           file: imageBufferData,
           fileName: 'resume.png',
           folder: 'user-resumes',
           transformation:{
            pre:'w-300,h-300,fo-face,z-0.75' +
            (removeBackground ? ',e-bgremove': '')
           }
});
            resumeDataCopy.personal_info.image = response.url;

         
      }

      const resume = await Resume.findByIdAndUpdate({userId , _id: resumeId}, resumeDataCopy ,  { returnDocument: 'after' })
      
      return res.status(200).json({message:'Save Successfully', resume});

   } catch (error) {
      return res.status(400).send({message: error.message}) 
   }
}