import type { LeaderboardExtra, ResponseBody } from '@shared/functions.types'
import type { SupabaseClientDB } from '@shared/shortcut.types'
import createInvokeFunction from './createInvokeFunction'

const createInvokeLeaderboard = (supabaseClient: SupabaseClientDB) => {
  const invoke = createInvokeFunction<ResponseBody<LeaderboardExtra>>('leaderboard', supabaseClient)
  
  return async (groupId: number): Promise<ResponseBody<LeaderboardExtra>> => {
    return invoke({ 'group': groupId })
  }
}

export default createInvokeLeaderboard
