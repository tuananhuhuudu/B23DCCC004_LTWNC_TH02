import { useState } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { addAssignment } from './assignmentsSlice'
import type { Priority } from './types'

export default function AssignmentForm() {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Vui long nhap ten bai tap')
      return
    }
    if (!subject.trim()) {
      setError('Vui long nhap mon hoc')
      return
    }
    if (!dueDate) {
      setError('Vui long chon han nop')
      return
    }
    dispatch(addAssignment({ title: title.trim(), subject: subject.trim(), dueDate, priority }))
    setTitle('')
    setSubject('')
    setDueDate('')
    setPriority('medium')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        aria-label="Ten bai tap"
        placeholder="Ten bai tap"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        aria-label="Mon hoc"
        placeholder="Mon hoc"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        aria-label="Han nop"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        aria-label="Do uu tien"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Thap</option>
        <option value="medium">Trung binh</option>
        <option value="high">Cao</option>
      </select>
      <button type="submit">Them bai tap</button>
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
