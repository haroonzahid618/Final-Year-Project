import express from 'express';
import protect from '../middleware/authMiddle.js';
import { careerAdvisor, enhanceJobDescription, enhanceSummary, uploadResume } from '../controller/aiController.js';


const aiRouter = express.Router();

aiRouter.post('/enhance-sum', protect, enhanceSummary);
aiRouter.post('/job-des', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);
aiRouter.post('/career-advisor', protect, careerAdvisor);

export default aiRouter;