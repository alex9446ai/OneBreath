import { For } from 'solid-js'

const FallbackGroups = () => {
  const predictedLength = 7
  const range = Array.from({ length: predictedLength }, (_, i) => i + 1)
  return (
    <For each={range}>
      {(id) => (
        <div>
          <input type='radio' name='group' id={`group${id}`} required value={0} />
          <label for={`group${id}`}>Caricamento {id}...</label>
        </div>
      )}
    </For>
  )
}

export default FallbackGroups
