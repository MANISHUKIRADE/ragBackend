import 'dotenv/config'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { OpenAIEmbeddings } from '@langchain/openai'
import { loadKnowledgeBase } from '../data/knowledgeBase.js'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

async function setupVectors() {
  console.log('🚀 Setting up vector database...')

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in environment variables')
    console.error('')
    console.error('Please create a .env file in the backend directory with:')
    console.error('OPENAI_API_KEY=your_openai_api_key_here')
    console.error('')
    console.error('You can get an API key from: https://platform.openai.com/api-keys')
    process.exit(1)
  }

  try {
    // Ensure data directory exists
    const dataDir = join(process.cwd(), 'data', 'vectors')
    if (!existsSync(join(process.cwd(), 'data'))) {
      await mkdir(join(process.cwd(), 'data'), { recursive: true })
    }

    // Load knowledge base
    const documents = loadKnowledgeBase()
    console.log(`📚 Loaded ${documents.length} documents`)

    // Initialize embeddings
    console.log('🔑 Using OpenAI API key (checking validity)...')
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    // Create vector store
    console.log('🔨 Creating vector embeddings...')
    const vectorStore = await FaissStore.fromDocuments(documents, embeddings)

    // Save vector store
    console.log('💾 Saving vector store...')
    await vectorStore.save(dataDir)

    console.log('✅ Vector database setup complete!')
  } catch (error) {
    console.error('❌ Error setting up vectors:', error)
    process.exit(1)
  }
}

setupVectors()

