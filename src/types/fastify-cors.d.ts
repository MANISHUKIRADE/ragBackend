// Type declaration for @fastify/cors
// This file helps TypeScript resolve the module in workspace setups
declare module '@fastify/cors' {
  import { FastifyPluginAsync } from 'fastify'

  interface FastifyCorsOptions {
    origin?: boolean | string | RegExp | Array<string | RegExp> | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void)
    methods?: string | string[]
    allowedHeaders?: string | string[]
    exposedHeaders?: string | string[]
    credentials?: boolean
    maxAge?: number
    preflightContinue?: boolean
    optionsSuccessStatus?: number
    preflight?: boolean
    strictPreflight?: boolean
  }

  const fastifyCors: FastifyPluginAsync<FastifyCorsOptions>
  export default fastifyCors
}

