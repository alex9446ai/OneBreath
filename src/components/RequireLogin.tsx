import { createSignal, onMount, Show, type ParentComponent } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { useSupabase } from '../utils/context'
import { LoggedOnMount } from './OnMountSupabase'
import manageRawError from '../utils/manageRawError'

const RequireLogin: ParentComponent = (props) => {
  const [loggedIn, setLoggedIn] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const navigate = useNavigate()
  const supabaseClient = useSupabase()

  const checkSession = async () => {
    setError(null)
    try {
      const { data, error: sessionError } = await supabaseClient.auth.getSession()
      if (sessionError) throw sessionError
      data.session === null ? navigate('/login') : setLoggedIn(true)
    } catch (err) {
      setError(manageRawError(err))
    }
  }

  onMount(() => checkSession())

  return (
    <Show when={loggedIn()} fallback={
      <main>
        <Show when={error()}>
          {(err) => (
            <div style={{ padding: '1rem', 'text-align': 'center' }}>
              <p style={{ color: 'red', 'margin-bottom': '1rem' }}>
                Errore di connessione: {err()}
              </p>
              <button onClick={checkSession}>Riprova</button>
            </div>
          )}
        </Show>
        <Show when={!error()}>
          <p>Verifica login...</p>
        </Show>
      </main>
    }>
      {props.children}
      <LoggedOnMount />
    </Show>
  )
}

export default RequireLogin
