import { screen } from '@testing-library/react'
import StatsPage from './StatsPage'
import { renderWithProviders } from '../../testUtils'
import type { Assignment } from '../assignments/types'

const items: Assignment[] = [
  {
    id: 'a1',
    title: 'Bai 1',
    subject: 'CSDL',
    dueDate: '2030-01-01T00:00:00.000Z',
    priority: 'high',
    completed: true,
  },
  {
    id: 'a2',
    title: 'Bai 2',
    subject: 'CSDL',
    dueDate: '2020-01-01T00:00:00.000Z',
    priority: 'low',
    completed: false,
  },
  {
    id: 'a3',
    title: 'Bai 3',
    subject: 'Mang may tinh',
    dueDate: '2030-01-01T00:00:00.000Z',
    priority: 'medium',
    completed: false,
  },
]

describe('StatsPage', () => {
  it('hien thi tong so, da hoan thanh va qua han', () => {
    renderWithProviders(<StatsPage />, {
      assignments: { items, loading: false, error: null },
    })
    expect(screen.getByText('Tong so bai tap: 3')).toBeInTheDocument()
    expect(screen.getByText('Da hoan thanh: 1')).toBeInTheDocument()
    expect(screen.getByText('Qua han: 1')).toBeInTheDocument()
  })

  it('hien thi so bai tap theo tung mon hoc', () => {
    renderWithProviders(<StatsPage />, {
      assignments: { items, loading: false, error: null },
    })
    expect(screen.getByText('CSDL: 2')).toBeInTheDocument()
    expect(screen.getByText('Mang may tinh: 1')).toBeInTheDocument()
  })
})
