import type { Request, Response } from 'express'
import z from 'zod'
import { chatService } from '../services/chat.service'

const chatschema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(3000, 'Prompt is too long (max 3000 characters)'),
   conversationId: z.string().uuid(),
})
export const ChatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatschema.safeParse(req.body)
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format())
         return
      }
      try {
         const { prompt, conversationId } = req.body
         const response = await chatService.sendMessage(conversationId, prompt)

         res.json({ message: response })
      } catch (error) {
         res.status(500).json({ error: 'Faild to generate a response' })
      }
   },
}
