import 'dotenv/config';
import {tavily as Tavily} from '@tavily/core'

let tavily = new Tavily({
    apiKey: process.env.TAVILY_API_KEY
})

export const searchInternetWithTavily = async ({query}) => {
    try{
         console.log("TAVILY QUERY:", query);
        const result = await tavily.search(query, {
              maxResults: 5,
        })
          console.log("TAVILY RESULT:", JSON.stringify(result, null, 2));
        return result
    }
    catch(err){
        console.log("Something went wrong in tavily", err);
        throw err;
    }
}

