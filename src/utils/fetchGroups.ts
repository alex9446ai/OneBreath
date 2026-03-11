import Cookies from 'js-cookie'
import { useSupabase } from './context'

export type Group = {
  id: number
  name: string
}
export type Groups = Group[]

export const setGroups = (groups: Groups): void => {
  Cookies.set('groups_cache', JSON.stringify(groups), { expires: 4 })
}

export const getGroups = (): Groups => {
  try {
    return JSON.parse(Cookies.get('groups_cache') ?? '[]')
  } catch {
    return []
  }
}

export const fetchGroups = async (): Promise<Groups> => {
  const cachedGroups = getGroups()
  if (cachedGroups.length > 0) return cachedGroups

  const supabaseClient = useSupabase()
  const { data: groups, error } = await supabaseClient.from('groups')
    .select('id,name').order('id')
  if (error) throw error.message
  setGroups(groups)
  return groups
}

export const fetchGroup = async (id: number): Promise<Group> => {
  const group = (await fetchGroups()).find((group) => group.id == id)
  if (!group) throw 'Mismatch with group select'
  return group
}

export const groupsById = async (): Promise<Record<number, Group>> => {
  return (await fetchGroups()).reduce((acc, group) => {
    acc[group.id] = group
    return acc
  }, {} as Record<number, Group>)
}
