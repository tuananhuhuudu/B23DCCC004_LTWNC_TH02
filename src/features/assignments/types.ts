export type Priority = 'low' | 'medium' | 'high'

export interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  priority: Priority
  completed: boolean
}

export interface Stats {
  total: number
  completed: number
  overdue: number
  bySubject: Record<string, number>
}
