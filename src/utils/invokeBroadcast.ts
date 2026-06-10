import type { SupabaseClientDB } from '@shared/shortcut.types'
import type { ResponseBody } from '@shared/functions.types'
import createInvokeFunction from './createInvokeFunction'

const createInvokeBroadcast = (supabaseClient: SupabaseClientDB) => {
  const invoke = createInvokeFunction<ResponseBody<null>>('broadcast', supabaseClient)
  
  return async (userIds: string[], message: string): Promise<ResponseBody<null>> => {
    return invoke({ 'user_ids': userIds, 'message': message })
  }
}

export default createInvokeBroadcast
