import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Assignment } from './types'
import { generateAssignments } from './utils'
import { fetchAssignmentsApi } from '../../api/assignmentsApi'

export interface AssignmentsState {
  items: Assignment[]
  loading: boolean
  error: string | null
}

const initialState: AssignmentsState = {
  items: [],
  loading: false,
  error: null,
}

export const loadAssignments = createAsyncThunk('assignments/load', async () => {
  const data = await fetchAssignmentsApi()
  return data
})

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: {
      reducer(state, action: PayloadAction<Assignment>) {
        state.items.push(action.payload)
      },
      prepare(input: Omit<Assignment, 'id' | 'completed'>) {
        return {
          payload: {
            ...input,
            id: nanoid(),
            completed: false,
          },
        }
      },
    },
    removeAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter((a) => a.id !== action.payload)
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const found = state.items.find((a) => a.id === action.payload)
      if (found) {
        found.completed = !found.completed
      }
    },
    seedAssignments(state, action: PayloadAction<number>) {
      state.items = generateAssignments(action.payload)
    },
    clearAssignments(state) {
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssignments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAssignments.fulfilled, (state, action: PayloadAction<Assignment[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadAssignments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Khong tai duoc du lieu'
      })
  },
})

export const {
  addAssignment,
  removeAssignment,
  toggleComplete,
  seedAssignments,
  clearAssignments,
} = assignmentsSlice.actions

export default assignmentsSlice.reducer
