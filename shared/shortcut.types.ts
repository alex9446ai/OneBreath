import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@shared/database.types.ts'

export type SupabaseClientDB = SupabaseClient<Database>
