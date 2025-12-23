# Setting Up Environment Variables

## Quick Setup

1. **Copy the example file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit the .env file and add your API key:**
   ```bash
   nano .env
   # or
   code .env
   ```

3. **Add your OpenAI API key:**
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

## Getting an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)
5. Paste it into your `.env` file

## Full .env Example

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Required for chatbot and vector database
OPENAI_API_KEY=sk-your-key-here

# Optional: Use Mistral instead of OpenAI for chat
# MISTRAL_API_KEY=your_mistral_key_here
```

## After Setting Up

1. **Initialize vector database:**
   ```bash
   npm run setup:vectors
   ```

2. **Start the backend:**
   ```bash
   npm run dev
   ```

## Troubleshooting

- **"API key not found"**: Make sure `.env` file exists in `backend/` directory
- **"Invalid API key"**: Check that your key starts with `sk-` and is correct
- **"No credits"**: Make sure your OpenAI account has credits/quota available

