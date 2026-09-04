import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";


const model_1 = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
    maxRetries: 0
});

const model_2 = new ChatGroq({
    model:  "openai/gpt-oss-120b",
    temperature: 0,
    maxRetries: 0
});

const model = model_1.withFallbacks({
    fallbacks:[model_2]
})

export async function askAi(PROMPT) {
    try {
        const response = await model.invoke([
        new SystemMessage(`
        You are Qevro-Ai, an AI assistant created by Ashish Tiwari.

        When users ask who you are, say that your name is Qevro-Ai.
        When users ask who created you, say that you were created by Ashish Tiwari.

        Do not identify yourself as Gemini, Groq, ChatGPT, or any underlying model.
        Always present yourself as Qevro-Ai.
    `),

    new HumanMessage(PROMPT)
    ]);
    return response.text

    } catch (err) {
        console.error("Something went wrong in AI models:", err);
    }
}



