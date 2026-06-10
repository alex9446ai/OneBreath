import { createResource, For, Suspense } from 'solid-js'
import { A } from '@solidjs/router'
import { getGroupFromLS } from '../utils/mixed'
import { useSupabase } from '../utils/context'
import createInvokeLeaderboard from '../utils/invokeLeaderboard'
import Title from '../components/Title'
import GroupName from '../components/GroupName'
import GoBack from '../components/GoBack'
import './Leaderboard.sass'

const Leaderboard = () => {
  const groupId = getGroupFromLS()
  const supabaseClient = useSupabase()
  const invokeLeaderboard = createInvokeLeaderboard(supabaseClient)

  const [leaderboard] = createResource(groupId, (gid) => invokeLeaderboard(gid))

  return (<>
    <Title>Classifica presenze</Title>
    <main id='leaderboard-page'>
      <p>Classifica presenze <GroupName id={groupId} /></p>
      <Suspense fallback='Caricamento...'>
        <div class='grid'>
          <p>Nome</p><p>Numero presenze</p>
          <For each={leaderboard()?.extra}>
            {(attendance) => <>
              <p>{attendance.first_name} {attendance.last_name}</p>
              <p>{attendance.apg}</p>
            </>}
          </For>
        </div>
      </Suspense>
      <p class='hide-hint'>ℹ️ <A href='/settings'>Puoi nasconderti da questa lista</A></p>
    </main>
    <nav>
      <GoBack />
    </nav>
  </>)
}

export default Leaderboard
