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
      origin: (origin, callback) => {
        // Allow requests from Vercel domains and localhost
        const allowedOrigins = [
          'https://manish-port-folio.vercel.app',
          'https://manish-port-folio-ck1vj2t34-manishukirades-projects.vercel.app',
          process.env.FRONTEND_URL,
          'http://localhost:3000',
          'http://localhost:5173', // Vite dev server
        ].filter(Boolean) // Remove undefined values
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'), false)
        }
      },
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

