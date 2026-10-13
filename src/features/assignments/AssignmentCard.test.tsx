import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssignmentCard from './AssignmentCard'
import type { Assignment } from './types'

const assignment: Assignment = {
  id: 'a1',
  title: 'Lam bai tap lon',
  subject: 'Lap trinh web',
  dueDate: '2030-01-01T00:00:00.000Z',
  priority: 'high',
  completed: false,
}

function setup(override: Partial<Assignment> = {}, pinned = false) {
  const onToggleComplete = jest.fn()
  const onTogglePin = jest.fn()
  const onRemove = jest.fn()
  render(
    <AssignmentCard
      assignment={{ ...assignment, ...override }}
      pinned={pinned}
      onToggleComplete={onToggleComplete}
      onTogglePin={onTogglePin}
      onRemove={onRemove}
    />,
  )
  return { onToggleComplete, onTogglePin, onRemove }
}

describe('AssignmentCard', () => {
  it('hien thi ten, mon hoc va do uu tien', () => {
    setup()
    expect(screen.getByText('Lam bai tap lon')).toBeInTheDocument()
    expect(screen.getByText('Lap trinh web')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
  })

  it('hien thi qua han khi da den han va chua hoan thanh', () => {
    setup({ dueDate: '2020-01-01T00:00:00.000Z' })
    expect(screen.getByText('Qua han')).toBeInTheDocument()
  })

  it('goi onToggleComplete khi bam nut hoan thanh', async () => {
    const user = userEvent.setup()
    const { onToggleComplete } = setup()
    await user.click(screen.getByRole('button', { name: 'Hoan thanh' }))
    expect(onToggleComplete).toHaveBeenCalledWith('a1')
  })

  it('goi onTogglePin khi bam nut ghim', async () => {
    const user = userEvent.setup()
    const { onTogglePin } = setup()
    await user.click(screen.getByRole('button', { name: 'Ghim' }))
    expect(onTogglePin).toHaveBeenCalledWith('a1')
  })

  it('hien thi icon ghim va nut bo ghim khi da ghim', () => {
    setup({}, true)
    expect(screen.getByText(/Lam bai tap lon/)).toHaveTextContent('📌')
    expect(screen.getByRole('button', { name: 'Bo ghim' })).toBeInTheDocument()
  })

  it('goi onRemove khi bam nut xoa', async () => {
    const user = userEvent.setup()
    const { onRemove } = setup()
    await user.click(screen.getByRole('button', { name: 'Xoa' }))
    expect(onRemove).toHaveBeenCalledWith('a1')
  })
})
