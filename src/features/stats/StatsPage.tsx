import { useMemo } from 'react'
import { useAppSelector } from '../../store/hooks'
import { calcStats } from '../assignments/utils'

export default function StatsPage() {
  const items = useAppSelector((state) => state.assignments.items)
  const stats = useMemo(() => calcStats(items), [items])

  return (
    <div className="stats">
      <h2>Thong ke</h2>
      <p>Tong so bai tap: {stats.total}</p>
      <p>Da hoan thanh: {stats.completed}</p>
      <p>Qua han: {stats.overdue}</p>
      <h3>Theo mon hoc</h3>
      <ul>
        {Object.entries(stats.bySubject).map(([subject, count]) => (
          <li key={subject}>
            {subject}: {count}
          </li>
        ))}
      </ul>
    </div>
  )
}
