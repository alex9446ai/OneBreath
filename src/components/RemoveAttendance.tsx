import type { Component } from 'solid-js'
import AttendanceButton from './AttendanceButton'

const RemoveAttendance: Component<{ groupId: number, refetch: () => void }> = (props) => {
  return (
    <AttendanceButton
      groupId={props.groupId}
      refetch={props.refetch}
      actionType='remove'
      label='Annulla'
      pendingLabel='Annullo...'
    />
  )
}

export default RemoveAttendance