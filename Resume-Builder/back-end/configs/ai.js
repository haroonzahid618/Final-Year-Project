import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    baseURL: process.env.BASE_URL,
});

export default ai;
