import { ChatOpenAI } from '@langchain/openai'
import { ChatMistralAI } from '@langchain/mistralai'
import { ChatGroq } from '@langchain/groq'
import { Groq } from 'groq-sdk'
import { FaissStore } from '@langchain/community/vectorstores/faiss'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Document } from 'langchain/document'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'
import { loadKnowledgeBase } from '../data/knowledgeBase.js'

// Helper function to remove markdown formatting and reasoning tags from text (preserves spaces)
function removeMarkdown(text: string): string {
  if (!text) return text
  
  return text
    .replace(/<think>[\s\S]*?<\/redacted_reasoning>/gi, '') // Remove redacted_reasoning tags
    .replace(/<think>[\s\S]*?<\/think>/gi, '') // Remove think tags
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, '') // Remove thinking tags
    .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '') // Remove reasoning tags
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text** - preserve content
    .replace(/\*(.*?)\*/g, '$1') // Remove italic *text* - preserve content
    .replace(/`(.*?)`/g, '$1') // Remove inline code `code` - preserve content
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links [text](url) -> text
    .replace(/#{1,6}\s+/g, '') // Remove headers # ## ### etc (with spaces)
  // Don't trim here - preserve all spaces in the content
}

export class RAGService {
  private vectorStore: FaissStore | null = null
  private llm: ChatOpenAI | ChatMistralAI | ChatGroq | Groq
  private embeddings: OpenAIEmbeddings
  private systemPrompt: string = '' // Store knowledge base in system prompt
  private useGroqSDK: boolean = false

  constructor() {
    // Priority: Grok (xAI) > Groq (free) > Mistral > OpenAI
    const grokKey = process.env.GROK_API_KEY
    const groqKey = process.env.GROQ_API_KEY
    const mistralKey = process.env.MISTRAL_API_KEY
    const openaiKey = process.env.OPENAI_API_KEY

    // Initialize LLM - prefer free options first
    if (grokKey) {
      console.log('🚀 Using Grok (xAI) for chat')
      // Grok uses OpenAI-compatible API with custom base URL
      this.llm = new ChatOpenAI({
        modelName: 'grok-beta', // or 'grok-2'
        temperature: 0.7,
        openAIApiKey: grokKey,
        configuration: {
          baseURL: 'https://api.x.ai/v1',
        },
        streaming: true,
      } as any)
    } else if (groqKey) {
      console.log('🚀 Using Groq (FREE tier) for chat with direct SDK')
      // Use Groq SDK directly for better control
      this.llm = new Groq({
        apiKey: groqKey,
      })
      this.useGroqSDK = true
    } else if (mistralKey) {
      console.log('🚀 Using Mistral AI for chat')
      this.llm = new ChatMistralAI({
        modelName: 'mistral-medium',
        temperature: 0.7,
        apiKey: mistralKey,
      })
    } else if (openaiKey) {
      console.log('🚀 Using OpenAI for chat')
      this.llm = new ChatOpenAI({
        modelName: 'gpt-3.5-turbo',
        temperature: 0.7,
        openAIApiKey: openaiKey,
        streaming: true,
      })
    } else {
      throw new Error('No API key found. Please set GROK_API_KEY, GROQ_API_KEY (FREE), MISTRAL_API_KEY, or OPENAI_API_KEY in your .env file.')
    }

    // Initialize embeddings (still need OpenAI for embeddings, but can use free alternatives)
    // For now, we'll make embeddings optional
    if (openaiKey) {
      this.embeddings = new OpenAIEmbeddings({
        openAIApiKey: openaiKey,
      })
    } else {
      // Use a placeholder - vector store won't work without embeddings
      console.warn('⚠️  No OpenAI API key for embeddings. RAG features will be limited.')
      this.embeddings = null as any
    }

    this.initializeSystemPrompt()
    this.initializeVectorStore()
  }

  private async initializeSystemPrompt() {
    // Load knowledge base and create a comprehensive system prompt
    // This will be stored and reused for all conversations
    try {
      const documents = loadKnowledgeBase()
      const knowledgeContent = documents
        .map((doc: Document) => doc.pageContent)
        .join('\n\n')

      this.systemPrompt = `You are a helpful and INTERACTIVE assistant for Manish Ukirade's developer portfolio. 
You have access to comprehensive information about his projects, skills, and experience.

KNOWLEDGE BASE:
${knowledgeContent}

Your role:
- Answer questions about Manish's projects, skills, experience, and achievements
- Provide accurate information based on the knowledge base above
- If a question cannot be answered from the knowledge base, politely say so
- Keep responses VERY SHORT (1-2 sentences maximum, unless specifically asked for details)
- Be friendly, conversational, and engaging
- After answering, proactively ask a follow-up question related to Manish's work to keep the conversation interactive
- Focus on key points only - avoid lengthy explanations
- NEVER include reasoning, thinking, or internal thoughts in your responses - only provide the final answer
- Do NOT use tags like <thinking>, <reasoning>, or <think> in your responses

IMPORTANT: 
- Always keep answers VERY BRIEF (1-2 sentences). Users prefer quick, direct responses.
- Be INTERACTIVE: After each answer, ask a related question like "Would you like to know more about [specific project/technology]?" or "Are you interested in learning about [related topic]?"
- Examples of good follow-up questions: "Want to know more about KYARA's AI capabilities?", "Interested in his cloud migration experience?", "Curious about his tech stack?"

Remember: You have all this information stored in your system context, so you don't need to ask for clarification about Manish's background.`

      console.log('✅ System prompt initialized with knowledge base')
    } catch (error) {
      console.warn('⚠️  Could not load knowledge base for system prompt:', error)
      // Fallback system prompt - VERY SHORT responses, INTERACTIVE with follow-up questions
      this.systemPrompt = `You are a helpful and INTERACTIVE assistant for Manish Ukirade's developer portfolio.
Manish is a Tech Lead, AI/ML Engineer, and Cloud Architect with 6+ years of experience.
He has worked on projects like KYARA (AI HR consultant), enterprise platforms, and cloud migrations.
Answer questions about his experience, skills, and projects based on general knowledge.
Keep responses VERY SHORT (1-2 sentences maximum) and friendly.
After each answer, ask a follow-up question to keep the conversation engaging.`
    }
  }

  private async initializeVectorStore() {
    try {
      // Check if OpenAI API key is available for embeddings
      if (!process.env.OPENAI_API_KEY) {
        console.warn('⚠️  OPENAI_API_KEY not found. Vector store initialization skipped.')
        console.warn('⚠️  Chatbot will work but without RAG capabilities.')
        console.warn('💡 Tip: You can use Groq (FREE) for chat, but still need OpenAI for embeddings.')
        return
      }

      // Try to load existing vector store
      try {
        this.vectorStore = await FaissStore.load(
          './data/vectors',
          this.embeddings
        )
        console.log('✅ Loaded existing vector store')
      } catch (loadError) {
        // If no vector store exists, create one from knowledge base
        console.log('📚 Creating new vector store from knowledge base...')
        const documents = loadKnowledgeBase()
        this.vectorStore = await FaissStore.fromDocuments(documents, this.embeddings)
        
        // Ensure data directory exists
        const fs = await import('fs/promises')
        const path = await import('path')
        const dataDir = path.join(process.cwd(), 'data', 'vectors')
        try {
          await fs.mkdir(path.dirname(dataDir), { recursive: true })
        } catch {
          // Directory might already exist
        }
        
        await this.vectorStore.save('./data/vectors')
        console.log('✅ Created and saved vector store')
      }
    } catch (error) {
      console.error('Error initializing vector store:', error)
      // Don't throw - allow chatbot to work without vector store
      console.warn('⚠️  Continuing without vector store. RAG features will be limited.')
    }
  }

  async chat(
    message: string,
    history: Array<{ role: string; content: string }> = [],
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    // Check if any API key is available
    if (!process.env.GROK_API_KEY && !process.env.GROQ_API_KEY && !process.env.MISTRAL_API_KEY && !process.env.OPENAI_API_KEY) {
      throw new Error('No API key found. Please set GROK_API_KEY, GROQ_API_KEY (FREE), MISTRAL_API_KEY, or OPENAI_API_KEY in your .env file.')
    }

    let fullResponse = ''

    // Use Groq SDK directly if configured
    if (this.useGroqSDK && this.llm instanceof Groq) {
      try {
        // Build messages array for Groq SDK
        const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
          {
            role: 'system',
            content: this.systemPrompt, // Use stored system prompt with knowledge base
          },
          // Add conversation history (last 6 messages)
          ...history.slice(-6).map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })) as Array<{ role: 'user' | 'assistant'; content: string }>,
          {
            role: 'user',
            content: message,
          },
        ]

        const chatCompletion = await this.llm.chat.completions.create({
          messages: messages as any,
          model: 'qwen/qwen3-32b',
          temperature: 0.7,
          max_tokens: 4096,
          top_p: 0.95,
          stream: true,
          stop: null as any,
        } as any) as unknown as AsyncIterable<any>

        // Stream the response
        for await (const chunk of chatCompletion) {
          const content = chunk.choices?.[0]?.delta?.content || ''
          if (content && onChunk) {
            // Remove markdown formatting before sending to frontend
            const cleanContent = removeMarkdown(content)
            onChunk(cleanContent)
            fullResponse += cleanContent
          }
        }
      } catch (error: any) {
        console.error('Groq SDK error:', error)
        const errorMsg = error?.message || 'Unknown error'
        
        // Check if it's a model decommissioned error
        if (error?.error?.code === 'model_decommissioned' || errorMsg.includes('decommissioned')) {
          console.error('⚠️  Model decommissioned. Trying fallback model...')
          try {
            // Try with fallback model
            const chatCompletion = await this.llm.chat.completions.create({
              messages: [
                { role: 'system', content: this.systemPrompt },
                ...history.slice(-6).map((msg) => ({
                  role: msg.role === 'user' ? 'user' : 'assistant',
                  content: msg.content,
                })) as any,
                { role: 'user', content: message },
              ],
              model: 'llama-3.3-70b-versatile', // Fallback model
              temperature: 0.7,
              max_tokens: 4096,
              top_p: 0.95,
              stream: true,
            } as any) as unknown as AsyncIterable<any>

            for await (const chunk of chatCompletion) {
              const content = chunk.choices?.[0]?.delta?.content || ''
              if (content && onChunk) {
                // Remove markdown formatting before sending to frontend
                const cleanContent = removeMarkdown(content)
                onChunk(cleanContent)
                fullResponse += cleanContent
              }
            }
          } catch (fallbackError) {
            if (onChunk) {
              onChunk(`\n\n[Error: ${fallbackError instanceof Error ? fallbackError.message : 'Model error'}. Please check server logs.]`)
            }
            throw fallbackError
          }
        } else {
          if (onChunk) {
            onChunk(`\n\n[Error: ${errorMsg}. Please check server logs.]`)
          }
          throw error
        }
      }
    } else {
      // Use LangChain for other providers
      // Build context from retrieved documents if vector store is available
      let context = ''
      if (this.vectorStore) {
        try {
          const relevantDocs = await this.vectorStore.similaritySearch(message, 3)
          context = relevantDocs
            .map((doc: Document) => doc.pageContent)
            .join('\n\n')
        } catch (error) {
          console.warn('Error retrieving documents from vector store:', error)
          // Continue without context
        }
      }

      // Build system prompt (use stored one if available, otherwise build from context)
      // VERY SHORT responses (1-2 sentences), INTERACTIVE with follow-up questions
      const systemPrompt = this.systemPrompt || (context 
        ? `You are a helpful and INTERACTIVE assistant for Manish Ukirade's developer portfolio. 
You have access to information about his projects, skills, and experience.
Use the following context to answer questions accurately and helpfully:

${context}

If the question cannot be answered from the context, politely say so.
Keep responses VERY SHORT (1-2 sentences maximum) and friendly.
After each answer, ask a follow-up question related to Manish's work to keep the conversation engaging.`
        : `You are a helpful and INTERACTIVE assistant for Manish Ukirade's developer portfolio.
Manish is a Tech Lead, AI/ML Engineer, and Cloud Architect with 6+ years of experience.
He has worked on projects like KYARA (AI HR consultant), enterprise platforms, and cloud migrations.
Answer questions about his experience, skills, and projects based on general knowledge.
Keep responses VERY SHORT (1-2 sentences maximum) and friendly.
After each answer, ask a follow-up question to keep the conversation engaging.`)

      // Build messages using LangChain message format
      const langchainMessages = [
        new SystemMessage(systemPrompt),
        ...history.slice(-6).map((msg) => {
          if (msg.role === 'user') {
            return new HumanMessage(msg.content)
          } else if (msg.role === 'assistant') {
            return new AIMessage(msg.content)
          }
          return new HumanMessage(msg.content)
        }),
        new HumanMessage(message),
      ]

      // Stream response
      try {
        if (this.llm instanceof ChatGroq) {
          // Groq supports streaming
          try {
            const stream = await this.llm.stream(langchainMessages)
            
            for await (const chunk of stream) {
              const content = typeof chunk.content === 'string' ? chunk.content : String(chunk.content)
              if (content && onChunk) {
                // Remove markdown formatting before sending to frontend
                const cleanContent = removeMarkdown(content)
                onChunk(cleanContent)
                fullResponse += cleanContent
              }
            }
          } catch (streamError: any) {
            console.error('Groq stream error:', streamError)
            
            // Check if it's a model decommissioned error
            if (streamError?.error?.code === 'model_decommissioned' || streamError?.message?.includes('decommissioned')) {
              console.error('⚠️  Model decommissioned. Trying fallback model...')
              // Try with a different model
              try {
                const fallbackLLM = new ChatGroq({
                  modelName: 'llama-3.3-70b-versatile', // Fallback model
                  temperature: 0.7,
                  apiKey: process.env.GROQ_API_KEY!,
                })
                const response = await fallbackLLM.invoke(langchainMessages)
                const content = typeof response.content === 'string' ? response.content : String(response.content)
                
                // Simulate streaming
                const cleanContent = removeMarkdown(content)
                for (let i = 0; i < cleanContent.length; i += 5) {
                  const chunk = cleanContent.slice(i, i + 5)
                  if (onChunk) {
                    onChunk(chunk)
                  }
                  fullResponse += chunk
                  await new Promise((resolve) => setTimeout(resolve, 10))
                }
              } catch (fallbackError) {
                // If fallback also fails, use invoke on original
                const response = await this.llm.invoke(langchainMessages)
                const content = typeof response.content === 'string' ? response.content : String(response.content)
                
                // Simulate streaming
                const cleanContent = removeMarkdown(content)
                for (let i = 0; i < cleanContent.length; i += 5) {
                  const chunk = cleanContent.slice(i, i + 5)
                  if (onChunk) {
                    onChunk(chunk)
                  }
                  fullResponse += chunk
                  await new Promise((resolve) => setTimeout(resolve, 10))
                }
              }
            } else {
              // Fallback to invoke if stream fails for other reasons
              const response = await this.llm.invoke(langchainMessages)
              const content = typeof response.content === 'string' ? response.content : String(response.content)
              
              // Simulate streaming
              for (let i = 0; i < content.length; i += 5) {
                const chunk = content.slice(i, i + 5)
                if (onChunk) {
                  onChunk(chunk)
                }
                fullResponse += chunk
                await new Promise((resolve) => setTimeout(resolve, 10))
              }
            }
          }
        } else if (this.llm instanceof ChatOpenAI) {
          try {
            const stream = await this.llm.stream(langchainMessages)
            
            for await (const chunk of stream) {
              const content = typeof chunk.content === 'string' ? chunk.content : String(chunk.content)
              if (content && onChunk) {
                // Remove markdown formatting before sending to frontend
                const cleanContent = removeMarkdown(content)
                onChunk(cleanContent)
                fullResponse += cleanContent
              }
            }
          } catch (streamError) {
            console.error('Error in OpenAI stream:', streamError)
            // Fallback to invoke if stream fails
            const response = await this.llm.invoke(langchainMessages)
            const content = typeof response.content === 'string' ? response.content : String(response.content)
            
            // Simulate streaming
            const cleanContent = removeMarkdown(content)
            for (let i = 0; i < cleanContent.length; i += 5) {
              const chunk = cleanContent.slice(i, i + 5)
              if (onChunk) {
                onChunk(chunk)
              }
              fullResponse += chunk
              await new Promise((resolve) => setTimeout(resolve, 10))
            }
          }
        } else if (this.llm instanceof ChatMistralAI) {
          // For Mistral, get full response and simulate streaming
          const response = await this.llm.invoke(langchainMessages)
          const content = typeof response.content === 'string' ? response.content : String(response.content)
          
          // Simulate streaming by sending chunks
          const cleanContent = removeMarkdown(content)
          for (let i = 0; i < cleanContent.length; i += 5) {
            const chunk = cleanContent.slice(i, i + 5)
            if (onChunk) {
              onChunk(chunk)
            }
            fullResponse += chunk
            // Small delay to simulate streaming
            await new Promise((resolve) => setTimeout(resolve, 10))
          }
        } else {
          throw new Error('Unsupported LLM provider')
        }
      } catch (error) {
        console.error('Error streaming response:', error)
        const errorMsg = error instanceof Error ? error.message : 'Unknown error'
        
        // Send error message to user
        if (onChunk) {
          onChunk(`\n\n[Error: ${errorMsg}. Please check that your API key is set correctly in the backend .env file.]`)
        }
        throw error
      }
    }

    return fullResponse
  }
}
