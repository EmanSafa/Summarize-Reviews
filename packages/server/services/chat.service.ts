import { conversationRepository } from '../repositories/conversation.reposatoriy'
import fs from 'fs'
import path from 'path'
import template from '../prompts/chatbot.txt'
import { llmClient } from '../LLMs/client'

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
)
const instructions = template.replace('{{parkInfo}}', parkInfo)

type ChatResponse = {
   id: string
   message: string
}

//leaky abstractionfor openai response management
export const chatService = {
   async sendMessage(
      conversationId: string,
      prompt: string
   ): Promise<ChatResponse> {
      const response = await llmClient.generateText({
         model: 'gpt-4o-mini',
         prompt,
         instructions,
         maxTokens: 100,
         previousResponseId:
            conversationRepository.getPreviousResponseId(conversationId),
      })
      
      conversationRepository.setPreviousResponseId(conversationId, response.id)
      return {
         id: response.id,
         message: response.text,
      }
   },
}
