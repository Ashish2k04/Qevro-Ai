import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";

const model_1 = new ChatGroq({
    model:  "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    maxRetries: 0
});

const model_2 = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 0
});

export async function testApi() {
    try {
        const res = await model_1.invoke("What is Ai?");
        console.log("Response from groq:", res.text);

    } catch (err) {
        console.error("Groq failed, using gemini flash.");
        const res = await model_2.invoke("What API provider am I calling?");
        console.log("Response from gemini:", res.text);
    }
}