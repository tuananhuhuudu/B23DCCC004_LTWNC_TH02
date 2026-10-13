import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      Che do: {theme === 'light' ? 'Sang' : 'Toi'}
    </button>
  )
}
