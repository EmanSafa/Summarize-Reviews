const conversations = new Map<string, string>()
//object with two methods to get and set previous response IDs for conversations
export const conversationRepository = {
   getPreviousResponseId(conversationId: string) {
      return conversations.get(conversationId)
   },

   setPreviousResponseId(conversationId: string, responseId: string) {
      return conversations.set(conversationId, responseId)
   },
}
