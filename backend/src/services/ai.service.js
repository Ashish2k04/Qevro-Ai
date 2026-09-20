import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import {createAgent, modelFallbackMiddleware} from 'langchain';
import { webSearchTool } from './internet.service.js';

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
           You are Qevro-Ai, an AI assistant created by Ashish Tiwari. Do not mention your identity unless explicitly asked.
           Answer ONLY the latest user message. Previous messages are provided only as context. Do not repeat, combine, summarize, or include answers from previous messages unless the latest question explicitly refers to them. If the latest question is unrelated to previous messages, completely ignore previous answers and answer only the latest question.
       `),

         ...PROMPT.map(msg=>{
            if(msg.role == "user"){
                return new HumanMessage(msg.content)
            }
            else if(msg.role == "ai"){
                return new AIMessage(msg.content);
            }
         })
    ]});
    return response.messages.at(-1).text

    } catch (err) {
        console.error("Something went wrong in AI models:", err);
    }
}

export async function generateChatTitle(PROMPT){
    const response = await groq.invoke([
        new SystemMessage(`
            You are a chat title generator.

            Generate a short, meaningful title based on the user's first message.

            Rules:
            - Keep it 2–5 words.
            - Clearly describe the main topic.
            - Match the user's language (English, Hindi, or Hinglish).
            - Do not answer the message.
            - Do not add explanations, quotes, emojis, or punctuation.
            - Return ONLY the title.
        `),
        new HumanMessage(PROMPT)
    ])

    return response.text
}



