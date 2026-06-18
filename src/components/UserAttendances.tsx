import { createResource, For, Show, Suspense, type Component } from 'solid-js'
import { useSupabase } from '../utils/context'
import { getUserId } from '../utils/mixed.supabase'
import { getGroupAcronym } from '../utils/mixed'
import GroupLegend from '../components/GroupLegend'
import ErrorBox from '../components/ErrorBox'
import './UserAttendances.sass'

const UserAttendances: Component<{ id?: string }> = (props) => {
  const supabaseClient = useSupabase()

  const [attendances] = createResource(async () => {
    const userId = props.id ?? await getUserId(supabaseClient)
    const { data: attendances, error } = await supabaseClient.from('pretty_attendances')
      .select('marked_day,group_name').eq('user_id', userId)
    if (error) throw error
    return attendances
  })

  return (<>
    <GroupLegend />
    <Suspense fallback='Caricamento...'>
      <ErrorBox>{attendances.error}</ErrorBox>
      <Show when={attendances() && !attendances.error}>
        <div class='user-attendances-grid'>
          <p>Data</p><p>Gruppo</p>
          <For each={attendances()}>
            {(attendance) => (<>
              <p>{attendance.marked_day}</p><p>{getGroupAcronym(attendance.group_name)}</p>
            </>)}
          </For>
        </div>
      </Show>
    </Suspense>
  </>)
}

export default UserAttendances
