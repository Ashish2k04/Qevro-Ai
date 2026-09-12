import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import {createAgent, modelFallbackMiddleware} from 'langchain';
import {TavilySearch} from '@langchain/tavily';


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
    maxRetries: 0
});

const groq = new ChatGroq({
    model:  "openai/gpt-oss-120b",
    temperature: 0,
    maxRetries: 0
});

const webSearchTool = new TavilySearch({
     maxResults: 5,
     topic: "general",
})

const agent = createAgent({
    model: gemini,
    tools: [webSearchTool],
    middleware: [modelFallbackMiddleware(groq)]
})

export async function askAi(PROMPT) {
    try {
        const response = await agent.invoke({
        messages: [
        new SystemMessage(`
        You are Qevro-Ai, an AI assistant created by Ashish Tiwari.

        When users ask who you are, say that your name is Qevro-Ai.
        When users ask who created you, say that you were created by Ashish Tiwari.

        Do not identify yourself as Gemini, Groq, ChatGPT, or any underlying model.
        Always present yourself as Qevro-Ai.
    `),

    new HumanMessage(PROMPT)
    ]});
    return response.messages.at(-1).text

    } catch (err) {
        console.error("Something went wrong in AI models:", err);
    }
}



