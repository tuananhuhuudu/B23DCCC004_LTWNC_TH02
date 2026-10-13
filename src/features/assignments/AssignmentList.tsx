import { useCallback, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window'
import type { ListChildComponentProps } from 'react-window'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeAssignment, toggleComplete } from './assignmentsSlice'
import { usePinStore } from '../../store/usePinStore'
import { useDebounce } from '../../hooks/useDebounce'
import AssignmentCard from './AssignmentCard'
import type { Assignment } from './types'

interface RowData {
  items: Assignment[]
  pinnedIds: string[]
  onToggleComplete: (id: string) => void
  onTogglePin: (id: string) => void
  onRemove: (id: string) => void
}

function Row({ index, style, data }: ListChildComponentProps<RowData>) {
  const assignment = data.items[index]
  return (
    <div style={style}>
      <AssignmentCard
        assignment={assignment}
        pinned={data.pinnedIds.includes(assignment.id)}
        onToggleComplete={data.onToggleComplete}
        onTogglePin={data.onTogglePin}
        onRemove={data.onRemove}
      />
    </div>
  )
}

export default function AssignmentList() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.assignments.items)
  const loading = useAppSelector((state) => state.assignments.loading)
  const error = useAppSelector((state) => state.assignments.error)
  const pinnedIds = usePinStore((state) => state.pinnedIds)
  const togglePin = usePinStore((state) => state.togglePin)

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const handleToggleComplete = useCallback(
    (id: string) => {
      dispatch(toggleComplete(id))
    },
    [dispatch],
  )

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeAssignment(id))
    },
    [dispatch],
  )

  const handleTogglePin = useCallback(
    (id: string) => {
      togglePin(id)
    },
    [togglePin],
  )

  const visibleItems = useMemo(() => {
    const key = debouncedKeyword.trim().toLowerCase()
    const filtered = key
      ? items.filter(
          (a) =>
            a.title.toLowerCase().includes(key) || a.subject.toLowerCase().includes(key),
        )
      : items
    const pinned: Assignment[] = []
    const others: Assignment[] = []
    for (const a of filtered) {
      if (pinnedIds.includes(a.id)) {
        pinned.push(a)
      } else {
        others.push(a)
      }
    }
    return [...pinned, ...others]
  }, [items, debouncedKeyword, pinnedIds])

  const rowData = useMemo<RowData>(
    () => ({
      items: visibleItems,
      pinnedIds,
      onToggleComplete: handleToggleComplete,
      onTogglePin: handleTogglePin,
      onRemove: handleRemove,
    }),
    [visibleItems, pinnedIds, handleToggleComplete, handleTogglePin, handleRemove],
  )

  if (loading) {
    return <p>Dang tai...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  return (
    <div>
      <input
        aria-label="Tim kiem"
        placeholder="Tim kiem bai tap"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <p>Tong: {visibleItems.length} bai tap</p>
      {visibleItems.length === 0 ? (
        <p>Khong co bai tap nao</p>
      ) : (
        <FixedSizeList
          height={600}
          width="100%"
          itemCount={visibleItems.length}
          itemSize={90}
          itemData={rowData}
        >
          {Row}
        </FixedSizeList>
      )}
    </div>
  )
}
