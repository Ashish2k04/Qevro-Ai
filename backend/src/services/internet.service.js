import 'dotenv/config';
import {tavily as Tavily} from '@tavily/core'

let tavily = new Tavily({
    maxResults: 5,
    topic: "general",
})

export const searchInternetWithTavily = async (query) => {
    return await tavily.search(query, {
        maxResults: 5,
        searchDepth: "advanced"
    })
}

