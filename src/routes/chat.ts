import { FastifyRequest, FastifyReply } from 'fastify'
import { RAGService } from '../services/ragService.js'

interface ChatRequest {
  message: string
  history?: Array<{ role: string; content: string }>
}

// Initialize RAG service (lazy initialization)
let ragService: RAGService | null = null

const getRAGService = async () => {
  if (!ragService) {
    try {
      ragService = new RAGService()
    } catch (error) {
      console.error('Error initializing RAG service:', error)
      throw error
    }
  }
  return ragService
}

export const chatHandler = async (
  request: FastifyRequest<{ Body: ChatRequest }>,
  reply: FastifyReply
) => {
  try {
    const { message, history = [] } = request.body

    if (!message || typeof message !== 'string') {
      return reply.code(400).send({ error: 'Message is required' })
    }

    console.log('Received chat request:', { message: message.substring(0, 50) + '...', historyLength: history.length })

    // Set up streaming response
    reply.raw.setHeader('Content-Type', 'text/event-stream')
    reply.raw.setHeader('Cache-Control', 'no-cache')
    reply.raw.setHeader('Connection', 'keep-alive')
    reply.raw.setHeader('Access-Control-Allow-Origin', '*')
    reply.raw.setHeader('X-Accel-Buffering', 'no') // Disable buffering

    const sendChunk = (content: string) => {
      if (!reply.sent) {
        try {
          reply.raw.write(`data: ${JSON.stringify({ content })}\n\n`)
        } catch (error) {
          console.error('Error writing chunk:', error)
        }
      }
    }

    // Get RAG service and stream the response
    try {
      const service = await getRAGService()
      await service.chat(message, history, sendChunk)
    } catch (error) {
      console.error('Error in RAG service:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      sendChunk(`\n\n[Error: ${errorMessage}. Please check server logs for details.]`)
    }

    if (!reply.sent) {
      reply.raw.write('data: [DONE]\n\n')
      reply.raw.end()
    }
  } catch (error) {
    console.error('Chat handler error:', error)
    if (!reply.sent) {
      try {
        reply.code(500).send({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' })
      } catch (sendError) {
        console.error('Error sending error response:', sendError)
      }
    }
  }
}
