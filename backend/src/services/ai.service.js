import 'dotenv/config'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai';
import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import {createAgent, modelFallbackMiddleware, tool} from 'langchain';
import { searchInternetWithTavily } from './internet.service.js';
import * as z from "zod";

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

const searchInternetTool = tool(
    searchInternetWithTavily,
    {
    name: "SearchInternet",
    description: `
               Search the internet for accurate and current information.

               Use this tool whenever the user asks about:
               - latest or current information
               - recent events
               - today's information
               - dates of recent events
               - information that may have changed over time

               IMPORTANT:
               Create the search query from the user's actual question.
               Do not assume or add an old year, date, location, person, or other constraint that the user did not mention.
               For questions containing words like "latest", "current", "last", or "recent", search for the most recent relevant information.
             `,
    schema: z.object({
        query: z.string().describe("The search query to look up the internet.")
    })
})

const agent = createAgent({
    model: gemini,
    tools: [searchInternetTool],
    // middleware: [modelFallbackMiddleware(groq)]
})

export async function askAi(PROMPT) {
    try {
        const response = await agent.invoke({
        messages: [
            new SystemMessage(`
    You are Qevro-Ai, an AI assistant created by Ashish Tiwari. Do not mention your identity unless explicitly asked.

    IMPORTANT:
    - When the user asks for latest, current, recent, up-to-date, today's, or internet-based information, ALWAYS use the SearchInternet tool before answering.
    - Do not rely on your internal knowledge for information that may have changed recently.
    - When using SearchInternet, create the query directly from the user's question. Do not add arbitrary years, dates, locations, or other assumptions.
    - For "latest", "current", "last", or "recent" questions, prefer the newest relevant information from the search results.
    - Check the dates in search results before answering.

    Answer ONLY the latest user message. Previous messages are provided only as context. Do not repeat, combine, summarize, or include answers from previous messages unless the latest question explicitly refers to them. If the latest question is unrelated to previous messages, completely ignore previous answers and answer only the latest question.
        `)
      ,
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



