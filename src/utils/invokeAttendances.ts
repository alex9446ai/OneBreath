import type { SupabaseClientDB } from '@shared/shortcut.types'
import type { AttendancesExtra, ResponseBody } from '@shared/functions.types'
import createInvokeFunction from './createInvokeFunction'

const createInvokeAttendances = (supabaseClient: SupabaseClientDB) => {
  const invoke = createInvokeFunction<ResponseBody<AttendancesExtra>>('attendances', supabaseClient)
  
  return async (action: 'remove' | 'verify' | 'set', groupId: number): Promise<ResponseBody<AttendancesExtra>> => {
    return invoke({ 'action': action, 'group': groupId })
  }
}

export default createInvokeAttendances
