'use client'
import { useTheme } from '@/context/ThemeContext'

// noteCount là props truyền từ page.jsx xuống
export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme()  // lấy theme từ Context

  return (
    <header style={{
      background: 'var(--header-bg)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 22 }}>📋</span>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>
          Ghi Chú Cá Nhân
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Hiển thị số lượng ghi chú - đây là props từ parent */}
        <span style={{
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: 20,
          padding: '4px 14px',
          fontSize: 13,
          fontWeight: 500,
        }}>
          {noteCount} ghi chú
        </span>

        {/* Nút đổi theme - dùng toggleTheme từ Context */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: 38,
            height: 38,
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}