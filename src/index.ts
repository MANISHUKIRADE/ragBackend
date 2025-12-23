import Fastify from 'fastify'
import cors from '@fastify/cors'
import { chatHandler } from './routes/chat.js'
import { healthHandler } from './routes/health.js'
import 'dotenv/config'

const fastify = Fastify({
  logger: true,
})

// Start server
const start = async () => {
  try {
    // Register plugins
    await fastify.register(cors, {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    })

    // Register routes
    fastify.get('/health', healthHandler)
    fastify.post('/api/chat', chatHandler)

    const port = Number(process.env.PORT) || 3001
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`🚀 Server running on http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

