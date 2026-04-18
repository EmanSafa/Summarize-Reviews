import OpenAI from "openai";

const client = new OpenAI({
   apiKey : process.env.OPEN_AI_KEY
})    

type GenerateTextParams = {
  model? : string ,
  prompt : string
  temprature? : number ,
  maxTokens? : number ,
  instructions? : string,
  previousResponseId? : string,
}
type GenerateTextResponse = {
  id : string ,
  text : string
}
  

export  const llmClient = {
  async generateText({model = 'gpt-4.1' , prompt , temprature = 0.2 , maxTokens = 500 , instructions , previousResponseId}: GenerateTextParams) : Promise<GenerateTextResponse> {
    const response = await client.responses.create({
      model,
      input: prompt,
      temperature: temprature,
      max_output_tokens: maxTokens,
      instructions,
      previous_response_id: previousResponseId,
    })
    return { 
      id : response.id,
      text : response.output_text
    }
  }
}