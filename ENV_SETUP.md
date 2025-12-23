# Environment Variables Setup

## Quick Setup

1. **Copy the example file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit the .env file and add your API keys:**
   ```bash
   nano .env
   ```

## API Key Priority

The chatbot will use APIs in this order:
1. **Grok (xAI)** - if `GROK_API_KEY` is set
2. **Groq** - if `GROQ_API_KEY` is set (FREE ⭐)
3. **Mistral** - if `MISTRAL_API_KEY` is set
4. **OpenAI** - if `OPENAI_API_KEY` is set

## Required Variables

### For Chat (Choose ONE):
- `GROK_API_KEY` - Get from https://x.ai/
- `GROQ_API_KEY` - Get from https://console.groq.com/ (FREE)
- `MISTRAL_API_KEY` - Get from https://console.mistral.ai/
- `OPENAI_API_KEY` - Get from https://platform.openai.com/api-keys

### For RAG Features (Optional):
- `OPENAI_API_KEY` - Required for embeddings/vector database

## Example .env File

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Choose ONE for chat (or use Groq for FREE)
GROK_API_KEY=your_grok_key_here
# OR
GROQ_API_KEY=gsk_your_groq_key_here
# OR
MISTRAL_API_KEY=your_mistral_key_here
# OR
OPENAI_API_KEY=sk-your_openai_key_here

# Required for RAG/embeddings (optional)
OPENAI_API_KEY=sk-your_openai_key_here
```

## Getting Free API Keys

### Groq (Recommended - FREE):
1. Go to https://console.groq.com/
2. Sign up (free, no credit card)
3. Create API key
4. Add to `.env`: `GROQ_API_KEY=gsk_your_key`

### Grok (xAI):
1. Go to https://x.ai/
2. Sign up for API access
3. Get API key from dashboard
4. Add to `.env`: `GROK_API_KEY=your_key`

## After Setup

1. **Restart backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Check console** - You should see which API is being used:
   - `🚀 Using Grok (xAI) for chat`
   - `🚀 Using Groq (FREE tier) for chat`
   - etc.

