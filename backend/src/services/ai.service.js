import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { ChatMistralAI } from "@langchain/mistralai";

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

const model_3 = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    maxRetries: 0
});

// const model = model_3.withFallbacks({
//     fallbacks:[
//         model_1,
//         model_2
//     ]
// })

// export async function testApi() {
//     try {
//         const res = await model.invoke("let me know which ai model you're?");
//         console.log("Response:", res.text);

//     } catch (err) {
//         console.error("Something went wrong in AI models:", err.message);
//     }
// }


export async function testApi() {
    try {
        const res = await model_3.invoke("let me know which ai model you're?");
        console.log("Response from mistral:", res.text);

    } catch (err) {
        console.error("Mistral failed.");
        const res = await model_1.invoke("let me know which ai model you're?");
        console.log("Response from groq:", res.text);
    }
}