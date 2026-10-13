import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('tra ve gia tri ban dau ngay lap tuc', () => {
    const { result } = renderHook(() => useDebounce('a', 300))
    expect(result.current).toBe('a')
  })

  it('chi cap nhat gia tri sau khi het thoi gian cho', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('ab')
  })

  it('huy lan cap nhat cu khi gia tri doi lien tuc', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => {
      jest.advanceTimersByTime(200)
    })
    rerender({ value: 'abc' })
    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current).toBe('abc')
  })
})
