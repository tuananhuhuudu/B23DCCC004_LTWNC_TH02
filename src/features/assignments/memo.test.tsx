import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssignmentCard from './AssignmentCard'
import * as cardModule from './AssignmentCard'
import { useCallback, useState } from 'react'
import type { Assignment } from './types'

const a: Assignment = {
  id: 'a1', title: 'Bai tap', subject: 'CSDL',
  dueDate: '2030-01-01T00:00:00.000Z', priority: 'high', completed: false,
}

function Parent() {
  const [n, setN] = useState(0)
  const onToggleComplete = useCallback(() => {}, [])
  const onTogglePin = useCallback(() => {}, [])
  const onRemove = useCallback(() => {}, [])
  return (
    <div>
      <button onClick={() => setN((v) => v + 1)}>re-render parent {n}</button>
      <AssignmentCard assignment={a} pinned={false}
        onToggleComplete={onToggleComplete} onTogglePin={onTogglePin} onRemove={onRemove} />
    </div>
  )
}

it('React.memo chan re-render khi props khong doi', async () => {
  render(<Parent />)
  const before = cardModule.renderCount
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: /re-render parent/ }))
  await screen.findByText('re-render parent 1')
  expect(cardModule.renderCount - before).toBe(0)
})
