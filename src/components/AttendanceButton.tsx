import type { Component } from 'solid-js'
import { action, useAction, useSubmission } from '@solidjs/router'
import { useSupabase } from '../utils/context'
import invokeAttendances from '../utils/invokeAttendances'
import ErrorBox from '../components/ErrorBox'

type AttendanceButtonProps = {
  groupId: number
  refetch: () => void
  actionType: 'set' | 'remove'
  label: string
  pendingLabel: string
}

const AttendanceButton: Component<AttendanceButtonProps> = (props) => {
  const supabaseClient = useSupabase()

  const handleAttendance = action(async () => {
    const data = await invokeAttendances(supabaseClient, props.actionType, props.groupId)
    if (data.code !== 200) throw data.message
    await props.refetch()
    return { ok: true }
  })
  const useHandler = useAction(handleAttendance)
  const submission = useSubmission(handleAttendance)

  return (
    <>
      <button onClick={useHandler} disabled={submission.pending}>
        {submission.pending ? props.pendingLabel : props.label}
      </button>
      <ErrorBox>{submission.error}</ErrorBox>
    </>
  )
}

export default AttendanceButton