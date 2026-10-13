import { isOverdue, calcDaysLeft, calcStats, generateAssignments } from './utils'
import type { Assignment } from './types'

const NOW = new Date('2026-10-13T00:00:00.000Z')

function makeAssignment(partial: Partial<Assignment>): Assignment {
  return {
    id: '1',
    title: 'Bai tap',
    subject: 'CSDL',
    dueDate: '2026-10-20T00:00:00.000Z',
    priority: 'medium',
    completed: false,
    ...partial,
  }
}

describe('isOverdue', () => {
  it('tra ve true khi han nop da qua', () => {
    expect(isOverdue('2026-10-01T00:00:00.000Z', NOW)).toBe(true)
  })

  it('tra ve false khi han nop con trong tuong lai', () => {
    expect(isOverdue('2026-10-20T00:00:00.000Z', NOW)).toBe(false)
  })

  it('tra ve false khi han nop dung bang thoi diem hien tai', () => {
    expect(isOverdue('2026-10-13T00:00:00.000Z', NOW)).toBe(false)
  })

  it('tra ve false khi ngay khong hop le', () => {
    expect(isOverdue('khong-phai-ngay', NOW)).toBe(false)
  })
})

describe('calcDaysLeft', () => {
  it('tinh dung so ngay con lai', () => {
    expect(calcDaysLeft('2026-10-20T00:00:00.000Z', NOW)).toBe(7)
  })

  it('tra ve so am khi da qua han', () => {
    expect(calcDaysLeft('2026-10-10T00:00:00.000Z', NOW)).toBe(-3)
  })

  it('tra ve 0 khi cung ngay', () => {
    expect(calcDaysLeft('2026-10-13T00:00:00.000Z', NOW)).toBe(0)
  })

  it('tra ve 0 khi ngay khong hop le', () => {
    expect(calcDaysLeft('abc', NOW)).toBe(0)
  })
})

describe('calcStats', () => {
  it('tra ve gia tri rong khi danh sach trong', () => {
    expect(calcStats([], NOW)).toEqual({
      total: 0,
      completed: 0,
      overdue: 0,
      bySubject: {},
    })
  })

  it('dem dung so bai hoan thanh, qua han va theo mon', () => {
    const items = [
      makeAssignment({ id: '1', completed: true, subject: 'CSDL' }),
      makeAssignment({ id: '2', dueDate: '2026-10-01T00:00:00.000Z', subject: 'CSDL' }),
      makeAssignment({ id: '3', dueDate: '2026-11-01T00:00:00.000Z', subject: 'Mang' }),
    ]
    const stats = calcStats(items, NOW)
    expect(stats.total).toBe(3)
    expect(stats.completed).toBe(1)
    expect(stats.overdue).toBe(1)
    expect(stats.bySubject).toEqual({ CSDL: 2, Mang: 1 })
  })

  it('khong tinh qua han cho bai da hoan thanh', () => {
    const items = [
      makeAssignment({ id: '1', completed: true, dueDate: '2026-01-01T00:00:00.000Z' }),
    ]
    const stats = calcStats(items, NOW)
    expect(stats.overdue).toBe(0)
    expect(stats.completed).toBe(1)
  })
})

describe('generateAssignments', () => {
  it('sinh dung so luong bai tap', () => {
    const items = generateAssignments(100)
    expect(items).toHaveLength(100)
    expect(items[0].id).not.toBe(items[1].id)
  })

  it('tra ve mang rong khi count bang 0', () => {
    expect(generateAssignments(0)).toEqual([])
  })
})
