'use client'

// B1: Import những thứ cần thiết từ React
import { createContext, useContext, useEffect, useState } from 'react'

// B2: Tạo Context (cái "kho chứa" theme toàn app)
const ThemeContext = createContext()

// B3: Tạo Provider - component bọc toàn app
export function ThemeProvider({ children }) {
  // useState lưu theme hiện tại: 'light' hoặc 'dark'
  const [theme, setTheme] = useState('light')
  const [isThemeLoaded, setIsThemeLoaded] = useState(false)

  // Chỉ đọc theme đã lưu sau khi mount để tránh hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTheme = localStorage.getItem('theme-mode')
      if (savedTheme === 'dark') {
        setTheme('dark')
      }
      setIsThemeLoaded(true)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  // Đồng bộ theme ra toàn bộ trang và lưu vào localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    if (!isThemeLoaded) return
    localStorage.setItem('theme-mode', theme)
  }, [theme, isThemeLoaded])

  // Hàm đổi theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

// B4: Custom hook - để dùng theme dễ dàng
// Chỉ cần gọi useTheme() thay vì useContext(ThemeContext)
export function useTheme() {
  return useContext(ThemeContext)
}