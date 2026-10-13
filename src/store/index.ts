import { configureStore } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import assignmentsReducer from '../features/assignments/assignmentsSlice'

const isDev = import.meta.env.DEV

const middlewares: Middleware[] = []

if (isDev) {
  const { default: logger } = await import('redux-logger')
  middlewares.push(logger)
}

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: isDev,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
