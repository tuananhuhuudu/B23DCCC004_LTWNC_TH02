import type { Assignment, Stats } from './types'

export function isOverdue(dueDate: string, now: Date = new Date()): boolean {
  const due = new Date(dueDate)
  if (isNaN(due.getTime())) return false
  return due.getTime() < now.getTime()
}

export function calcDaysLeft(dueDate: string, now: Date = new Date()): number {
  const due = new Date(dueDate)
  if (isNaN(due.getTime())) return 0
  const MS_PER_DAY = 24 * 60 * 60 * 1000
  const diff = due.getTime() - now.getTime()
  return Math.ceil(diff / MS_PER_DAY)
}

export function calcStats(assignments: Assignment[], now: Date = new Date()): Stats {
  const stats: Stats = {
    total: assignments.length,
    completed: 0,
    overdue: 0,
    bySubject: {},
  }
  for (const a of assignments) {
    if (a.completed) {
      stats.completed += 1
    } else if (isOverdue(a.dueDate, now)) {
      stats.overdue += 1
    }
    stats.bySubject[a.subject] = (stats.bySubject[a.subject] || 0) + 1
  }
  return stats
}

const SUBJECTS = ['Toan roi rac', 'Lap trinh web', 'CSDL', 'Mang may tinh', 'Tri tue nhan tao']
const PRIORITIES: Assignment['priority'][] = ['low', 'medium', 'high']

export function generateAssignments(count: number): Assignment[] {
  const result: Assignment[] = []
  const now = Date.now()
  for (let i = 0; i < count; i++) {
    const offsetDays = (i % 60) - 20
    result.push({
      id: `gen-${i}-${now}`,
      title: `Bai tap mau so ${i + 1}`,
      subject: SUBJECTS[i % SUBJECTS.length],
      dueDate: new Date(now + offsetDays * 24 * 60 * 60 * 1000).toISOString(),
      priority: PRIORITIES[i % PRIORITIES.length],
      completed: i % 4 === 0,
    })
  }
  return result
}
