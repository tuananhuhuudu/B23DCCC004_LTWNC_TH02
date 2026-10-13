import React from 'react'
import type { Assignment } from './types'
import { isOverdue, calcDaysLeft } from './utils'

export interface AssignmentCardProps {
  assignment: Assignment
  pinned: boolean
  onToggleComplete: (id: string) => void
  onTogglePin: (id: string) => void
  onRemove: (id: string) => void
}

export let renderCount = 0

export function resetRenderCount() {
  renderCount = 0
}

function AssignmentCardBase({
  assignment,
  pinned,
  onToggleComplete,
  onTogglePin,
  onRemove,
}: AssignmentCardProps) {
  renderCount += 1

  const overdue = !assignment.completed && isOverdue(assignment.dueDate)
  const daysLeft = calcDaysLeft(assignment.dueDate)

  return (
    <div className="card" data-testid="assignment-card">
      <div className="card-main">
        <span className={assignment.completed ? 'title done' : 'title'}>
          {pinned ? '📌 ' : ''}
          {assignment.title}
        </span>
        <span className="subject">{assignment.subject}</span>
        <span className="priority">{assignment.priority}</span>
        <span className={overdue ? 'due overdue' : 'due'}>
          {overdue ? 'Qua han' : `Con ${daysLeft} ngay`}
        </span>
      </div>
      <div className="card-actions">
        <button onClick={() => onToggleComplete(assignment.id)}>
          {assignment.completed ? 'Bo hoan thanh' : 'Hoan thanh'}
        </button>
        <button onClick={() => onTogglePin(assignment.id)}>
          {pinned ? 'Bo ghim' : 'Ghim'}
        </button>
        <button onClick={() => onRemove(assignment.id)}>Xoa</button>
      </div>
    </div>
  )
}

export const AssignmentCard = React.memo(AssignmentCardBase)
export default AssignmentCard
