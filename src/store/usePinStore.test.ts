import { usePinStore } from './usePinStore'

beforeEach(() => {
  usePinStore.setState({ pinnedIds: [] })
})

describe('usePinStore', () => {
  it('ban dau khong co bai tap nao duoc ghim', () => {
    expect(usePinStore.getState().pinnedIds).toEqual([])
    expect(usePinStore.getState().isPinned('a1')).toBe(false)
  })

  it('ghim roi bo ghim mot bai tap', () => {
    usePinStore.getState().togglePin('a1')
    expect(usePinStore.getState().isPinned('a1')).toBe(true)

    usePinStore.getState().togglePin('a1')
    expect(usePinStore.getState().isPinned('a1')).toBe(false)
  })

  it('ghim duoc nhieu bai tap cung luc', () => {
    usePinStore.getState().togglePin('a1')
    usePinStore.getState().togglePin('a2')
    expect(usePinStore.getState().pinnedIds).toEqual(['a1', 'a2'])
  })
})
