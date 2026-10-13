import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { makeStore } from '../testUtils'
import { ThemeProvider } from '../contexts/ThemeContext'
import App from './App'
import type { Assignment } from '../features/assignments/types'

jest.mock('../features/assignments/AssignmentList', () => {
  const actual = jest.requireActual('../features/assignments/AssignmentList')
  return {
    __esModule: true,
    default: function CountingList() {
      ;(globalThis as Record<string, unknown>).listRenders =
        ((globalThis as Record<string, unknown>).listRenders as number) + 1
      return actual.default()
    },
  }
})

const items: Assignment[] = [
  {
    id: 'a1',
    title: 'Bai tap CSDL',
    subject: 'CSDL',
    dueDate: '2030-01-01T00:00:00.000Z',
    priority: 'high',
    completed: false,
  },
]

describe('Doi theme', () => {
  it('khong lam re-render AssignmentList', async () => {
    ;(globalThis as Record<string, unknown>).listRenders = 0
    const store = makeStore({ assignments: { items, loading: false, error: null } })
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>,
    )

    await screen.findByText('Bai tap CSDL')
    const before = (globalThis as Record<string, unknown>).listRenders as number

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /Che do/ }))

    expect(screen.getByRole('button', { name: /Che do/ })).toHaveTextContent('Toi')
    expect(document.querySelector('div.app')).toHaveClass('dark')

    const after = (globalThis as Record<string, unknown>).listRenders as number
    expect(after - before).toBe(0)
  })
})
