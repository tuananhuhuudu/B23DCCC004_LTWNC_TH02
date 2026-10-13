import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import assignmentsReducer, { addAssignment, toggleComplete, removeAssignment } from '../features/assignments/assignmentsSlice'

describe('redux-logger middleware', () => {
  it('in log khi them, hoan thanh va xoa bai tap', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const groupSpy = jest.spyOn(console, 'group').mockImplementation(() => {})
    const groupEndSpy = jest.spyOn(console, 'groupEnd').mockImplementation(() => {})

    const store = configureStore({
      reducer: { assignments: assignmentsReducer },
      middleware: (gdm) => gdm().concat(logger),
    })

    store.dispatch(addAssignment({ title: 'A', subject: 'B', dueDate: '2030-01-01', priority: 'low' }))
    const id = store.getState().assignments.items[0].id
    store.dispatch(toggleComplete(id))
    store.dispatch(removeAssignment(id))

    const calls = spy.mock.calls.flat().join(' ')
    expect(calls).toContain('prev state')
    expect(calls).toContain('next state')
    expect(store.getState().assignments.items).toHaveLength(0)

    spy.mockRestore(); groupSpy.mockRestore(); groupEndSpy.mockRestore()
  })
})
