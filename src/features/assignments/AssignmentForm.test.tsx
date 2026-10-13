import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssignmentForm from './AssignmentForm'
import { renderWithProviders } from '../../testUtils'

describe('AssignmentForm', () => {
  it('bao loi khi chua nhap ten bai tap', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<AssignmentForm />)
    await user.click(screen.getByRole('button', { name: 'Them bai tap' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Vui long nhap ten bai tap')
    expect(store.getState().assignments.items).toHaveLength(0)
  })

  it('bao loi khi chua nhap mon hoc', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AssignmentForm />)
    await user.type(screen.getByLabelText('Ten bai tap'), 'Bai tap moi')
    await user.click(screen.getByRole('button', { name: 'Them bai tap' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Vui long nhap mon hoc')
  })

  it('bao loi khi chua chon han nop', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AssignmentForm />)
    await user.type(screen.getByLabelText('Ten bai tap'), 'Bai tap moi')
    await user.type(screen.getByLabelText('Mon hoc'), 'CSDL')
    await user.click(screen.getByRole('button', { name: 'Them bai tap' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Vui long chon han nop')
  })

  it('them bai tap vao store va xoa trang form khi hop le', async () => {
    const user = userEvent.setup()
    const { store } = renderWithProviders(<AssignmentForm />)
    await user.type(screen.getByLabelText('Ten bai tap'), 'Bai tap lon')
    await user.type(screen.getByLabelText('Mon hoc'), 'Lap trinh web')
    await user.type(screen.getByLabelText('Han nop'), '2026-12-31')
    await user.selectOptions(screen.getByLabelText('Do uu tien'), 'high')
    await user.click(screen.getByRole('button', { name: 'Them bai tap' }))

    const items = store.getState().assignments.items
    expect(items).toHaveLength(1)
    expect(items[0].title).toBe('Bai tap lon')
    expect(items[0].subject).toBe('Lap trinh web')
    expect(items[0].priority).toBe('high')
    expect(screen.getByLabelText('Ten bai tap')).toHaveValue('')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
