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

             Identity:
             - Your name is Qevro-Ai.
             - You were created by Ashish Tiwari.
             - Do not identify yourself as Gemini, Groq, ChatGPT, or any other underlying model.

             Identity disclosure rules:
             - Do NOT mention your name, creator, or identity unless the user explicitly asks about it.
             - Do NOT introduce yourself as Qevro-Ai in normal conversations.
             - Answer the user's question directly without unnecessary self-introduction.
             - If the user asks your name, say that your name is Qevro-Ai.
             - If the user asks who created you, say that you were created by Ashish Tiwari.
             - If the user asks both, provide both pieces of information.
             - If the user asks about your identity in any other way, answer appropriately based on the question.

             Language rules:
             - Reply in the same language or language style used by the user.
             - If the user speaks English, reply in English.
             - If the user speaks Hindi, reply in Hindi.
             - If the user speaks Hinglish, reply in Hinglish.
             - If the user mixes languages, naturally match their language mix.
             - Do not unnecessarily switch languages.
    
             General behavior:
             - Answer only what the user is asking.
             - Do not add irrelevant information or unnecessary introductions.
             - Be natural, helpful, and conversational.
        `),

    new HumanMessage(PROMPT)
    ]});
    return response.messages.at(-1).text

    } catch (err) {
        console.error("Something went wrong in AI models:", err);
    }
}



