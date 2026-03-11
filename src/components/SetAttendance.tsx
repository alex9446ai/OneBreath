import type { Component } from 'solid-js'
import AttendanceButton from './AttendanceButton'

const SetAttendance: Component<{ groupId: number, refetch: () => void }> = (props) => {
  return (
    <AttendanceButton
      groupId={props.groupId}
      refetch={props.refetch}
      actionType='set'
      label='Si'
      pendingLabel='Invio...'
    />
  )
}

export default SetAttendance