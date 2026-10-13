import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import assignmentsReducer from './features/assignments/assignmentsSlice'
import type { AssignmentsState } from './features/assignments/assignmentsSlice'
import { ThemeProvider } from './contexts/ThemeContext'

export function makeStore(preloaded?: { assignments: AssignmentsState }) {
  return configureStore({
    reducer: { assignments: assignmentsReducer },
    preloadedState: preloaded,
  })
}

export function renderWithProviders(
  ui: ReactElement,
  preloaded?: { assignments: AssignmentsState },
) {
  const store = makeStore(preloaded)
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper }) }
}
