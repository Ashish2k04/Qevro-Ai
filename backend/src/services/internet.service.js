import 'dotenv/config';
import { TavilySearch } from "@langchain/tavily";

export const webSearchTool = new TavilySearch({
    maxResults: 5,
    topic: "general",
})