import { screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AssignmentList from './AssignmentList'
import { loadAssignments } from './assignmentsSlice'
import { renderWithProviders } from '../../testUtils'
import { usePinStore } from '../../store/usePinStore'
import type { Assignment } from './types'

jest.mock('../../api/assignmentsApi')
import { fetchAssignmentsApi } from '../../api/assignmentsApi'

const mockedFetch = fetchAssignmentsApi as jest.MockedFunction<typeof fetchAssignmentsApi>

const data: Assignment[] = [
  {
    id: 'a1',
    title: 'Bai tap CSDL',
    subject: 'CSDL',
    dueDate: '2030-01-01T00:00:00.000Z',
    priority: 'high',
    completed: false,
  },
  {
    id: 'a2',
    title: 'Bai tap Mang',
    subject: 'Mang may tinh',
    dueDate: '2030-02-01T00:00:00.000Z',
    priority: 'low',
    completed: false,
  },
]

beforeEach(() => {
  jest.clearAllMocks()
  usePinStore.setState({ pinnedIds: [] })
})

describe('AssignmentList voi API gia lap', () => {
  it('hien thi trang thai dang tai roi hien danh sach khi thanh cong', async () => {
    let resolveFn: (value: Assignment[]) => void = () => {}
    mockedFetch.mockReturnValue(
      new Promise<Assignment[]>((resolve) => {
        resolveFn = resolve
      }),
    )

    const { store } = renderWithProviders(<AssignmentList />)
    act(() => {
      store.dispatch(loadAssignments() as never)
    })

    expect(await screen.findByText('Dang tai...')).toBeInTheDocument()

    await act(async () => {
      resolveFn(data)
    })

    await waitFor(() => {
      expect(screen.getByText('Bai tap CSDL')).toBeInTheDocument()
    })
    expect(screen.getByText('Tong: 2 bai tap')).toBeInTheDocument()
  })

  it('hien thi thong bao loi khi API that bai', async () => {
    mockedFetch.mockRejectedValue(new Error('Khong tai duoc du lieu'))

    const { store } = renderWithProviders(<AssignmentList />)
    await act(async () => {
      await store.dispatch(loadAssignments() as never)
    })

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Khong tai duoc du lieu')
    })
  })

  it('dua bai tap da ghim len dau danh sach', async () => {
    const { store } = renderWithProviders(<AssignmentList />)
    act(() => {
      store.dispatch({ type: 'assignments/load/fulfilled', payload: data })
    })

    await waitFor(() => {
      expect(screen.getAllByTestId('assignment-card')).toHaveLength(2)
    })
    expect(screen.getAllByTestId('assignment-card')[0]).toHaveTextContent('Bai tap CSDL')

    const user = userEvent.setup()
    const pinButtons = screen.getAllByRole('button', { name: 'Ghim' })
    await user.click(pinButtons[1])

    await waitFor(() => {
      expect(screen.getAllByTestId('assignment-card')[0]).toHaveTextContent('Bai tap Mang')
    })
  })
})
