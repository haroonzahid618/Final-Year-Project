import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";


// controller Enhance the resume summary
// POST: /api/ai/enhance-sum
export const enhanceSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience and career objectives. Make it compelling and ATS- friendly and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

}


// controller Enhance the Job Description
// POST: /api/ai/job-des
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentences also highlighting key responsbililties and achievements. Use action verbs and quantifiable results where possible. Make it ATS- friendly and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

}


// controller for uploading resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const systemPrompt = 'You are an expert AI Agent to extract data from resume.';

        const userPrompt = `extract data from this resume: ${resumeText}

    Provide data in the following JSON format with no additional task before or after:

    {
    professional_summary :{type: String, default: ""},
    skills :[{type: String}],
    personal_info:{
           image :{type: String, default:""},
           full_name :{type: String, default:""},
           profession :{type: String, default:""},
           email :{type: String, default:""},
           phone :{type: String, default:""},
           location :{type: String, default:""},
           linkedin :{type: String, default:""}
    },
    experience : [
        {
            company: {type: String},
            position: {type: String},
            start_date: {type: String},
            end_date: {type: String},
            description: {type: String},
            is_current: {type: Boolean},
        }
    ],
    project: [
        {
            name: {type: String},
            type: {type: String},
            description: {type: String},
        }
    ],
    education: [
        {
            institution: {type: String},
            degree: {type: String},
            field: {type: String},
            graduation_date: {type: String},
            cgpa: {type: String},
        }
    ],
        }`;

        const response = await ai.chat.completions.create({
            model: process.env.MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: { type: 'json_object' }
        });

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({ userId, title, ...parsedData })
        return res.json({ resumeId: newResume._id });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }

}



// Controller: AI Career Advisor
// POST: /api/ai/career-advisor

export const careerAdvisor = async (req, res) => {
    try {
        const { resumeData } = req.body;

        if (!resumeData) {
            return res.status(400).json({
                message: "Resume data is required"
            });
        }

        const response = await ai.chat.completions.create({
            model: process.env.MODEL,
            messages: [
                {
                    role: "system",
                    content: `You are an expert AI Career Advisor.

Analyze the user's resume, including education, skills,
professional summary, experience and projects.

Recommend the 5 most suitable career fields.

For each career provide:
- career: Career field name
- suitability: Suitability percentage from 0 to 100
- reason: Why this career matches the user's resume
- jobRoles: 3 relevant job roles
- skillsToLearn: 3 to 5 skills the user should learn or improve to become suitable for this career

Return ONLY valid JSON in this format:

{
  "recommendations": [
    {
      "career": "Frontend Developer",
      "suitability": 90,
      "reason": "Reason for recommendation",
      "jobRoles": [
        "React Developer",
        "Frontend Engineer",
        "UI Developer"
      ],
        "skillsToLearn": [
    "TypeScript",
    "Next.js",
    "Redux Toolkit",
    "Jest"
]
    }
  ]
}

Be realistic. Base recommendations only on the
information available in the resume. Do not invent
skills or experience.`
                },
                {
                    role: "user",
                    content: JSON.stringify(resumeData)
                }
            ],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(
            response.choices[0].message.content
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Career Advisor Error:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};




