import type { Assignment } from '../features/assignments/types'

export async function fetchAssignmentsApi(): Promise<Assignment[]> {
  const res = await fetch('/api/assignments')
  if (!res.ok) {
    throw new Error('Khong tai duoc du lieu')
  }
  return res.json()
}
