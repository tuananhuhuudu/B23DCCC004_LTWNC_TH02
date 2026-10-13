import reducer, {
  addAssignment,
  removeAssignment,
  toggleComplete,
  seedAssignments,
  clearAssignments,
  loadAssignments,
} from './assignmentsSlice'
import type { AssignmentsState } from './assignmentsSlice'
import type { Assignment } from './types'

const sample: Assignment = {
  id: 'a1',
  title: 'Bai tap 1',
  subject: 'CSDL',
  dueDate: '2026-10-20T00:00:00.000Z',
  priority: 'high',
  completed: false,
}

function stateWith(items: Assignment[]): AssignmentsState {
  return { items, loading: false, error: null }
}

describe('assignmentsSlice reducer', () => {
  it('tra ve state ban dau', () => {
    const state = reducer(undefined, { type: 'unknown' })
    expect(state).toEqual({ items: [], loading: false, error: null })
  })

  it('them bai tap moi co id va completed mac dinh', () => {
    const state = reducer(
      stateWith([]),
      addAssignment({
        title: 'Bai moi',
        subject: 'Mang',
        dueDate: '2026-11-01',
        priority: 'low',
      }),
    )
    expect(state.items).toHaveLength(1)
    expect(state.items[0].title).toBe('Bai moi')
    expect(state.items[0].completed).toBe(false)
    expect(state.items[0].id).toBeTruthy()
  })

  it('xoa bai tap theo id', () => {
    const state = reducer(stateWith([sample]), removeAssignment('a1'))
    expect(state.items).toHaveLength(0)
  })

  it('khong doi gi khi xoa id khong ton tai', () => {
    const state = reducer(stateWith([sample]), removeAssignment('khong-co'))
    expect(state.items).toHaveLength(1)
  })

  it('dao trang thai hoan thanh', () => {
    const once = reducer(stateWith([sample]), toggleComplete('a1'))
    expect(once.items[0].completed).toBe(true)
    const twice = reducer(once, toggleComplete('a1'))
    expect(twice.items[0].completed).toBe(false)
  })

  it('sinh du lieu mau va xoa het', () => {
    const seeded = reducer(stateWith([]), seedAssignments(50))
    expect(seeded.items).toHaveLength(50)
    const cleared = reducer(seeded, clearAssignments())
    expect(cleared.items).toHaveLength(0)
  })

  it('xu ly trang thai pending cua loadAssignments', () => {
    const state = reducer(stateWith([]), { type: loadAssignments.pending.type })
    expect(state.loading).toBe(true)
    expect(state.error).toBeNull()
  })

  it('xu ly trang thai fulfilled cua loadAssignments', () => {
    const state = reducer(
      { items: [], loading: true, error: null },
      { type: loadAssignments.fulfilled.type, payload: [sample] },
    )
    expect(state.loading).toBe(false)
    expect(state.items).toHaveLength(1)
  })

  it('xu ly trang thai rejected cua loadAssignments', () => {
    const state = reducer(
      { items: [], loading: true, error: null },
      { type: loadAssignments.rejected.type, error: { message: 'Loi mang' } },
    )
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Loi mang')
  })
})
