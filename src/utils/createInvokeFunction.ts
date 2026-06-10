import { FunctionsHttpError } from '@supabase/supabase-js'
import type { SupabaseClientDB } from '@shared/shortcut.types'
import type { ResponseBody } from '@shared/functions.types'

/**
 * Factory function to create Supabase edge function invokers
 * Handles error responses and HTTP errors consistently
 */
const createInvokeFunction = <T extends ResponseBody>(
  functionName: string,
  supabaseClient: SupabaseClientDB
) => {
  return async (body: unknown): Promise<T> => {
    const { data, error } = await supabaseClient.functions.invoke(functionName, { body })
    if (error instanceof FunctionsHttpError) return await error.context.json()
    if (error) throw error
    return data
  }
}

export default createInvokeFunction
