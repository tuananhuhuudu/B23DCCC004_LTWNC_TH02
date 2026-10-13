import { lazy, Suspense, useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { seedAssignments, clearAssignments } from '../features/assignments/assignmentsSlice'
import AssignmentForm from '../features/assignments/AssignmentForm'
import AssignmentList from '../features/assignments/AssignmentList'
import ThemeToggle from '../components/ThemeToggle'

const StatsPage = lazy(() => import('../features/stats/StatsPage'))

export default function App() {
  const dispatch = useAppDispatch()
  const [showStats, setShowStats] = useState(false)

  return (
    <>
      <header>
        <h1>Student Deadline Tracker</h1>
        <ThemeToggle />
      </header>

      <section className="toolbar">
        <button onClick={() => dispatch(seedAssignments(10000))}>
          Tao 10.000 bai tap mau
        </button>
        <button onClick={() => dispatch(clearAssignments())}>Xoa het</button>
        <button onClick={() => setShowStats((s) => !s)}>
          {showStats ? 'An thong ke' : 'Xem thong ke'}
        </button>
      </section>

      <AssignmentForm />
      <AssignmentList />

      {showStats && (
        <Suspense fallback={<p>Dang tai thong ke...</p>}>
          <StatsPage />
        </Suspense>
      )}
    </>
  )
}
