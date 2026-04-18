'use client'
import { useState } from 'react'

// onAddNote là hàm callback truyền từ page.jsx
export default function NoteForm({ onAddNote }) {
  // State quản lý nội dung input
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (!text.trim()) return  // không thêm nếu rỗng

    onAddNote(text.trim())   // gọi hàm từ parent để thêm note
    setText('')               // reset input về rỗng
  }

  // Cho phép nhấn Enter để thêm
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      marginBottom: 24,
    }}>
      <input
        type="text"
        value={text}                          // controlled: value gắn với state
        onChange={(e) => setText(e.target.value)}  // cập nhật state khi gõ
        onKeyDown={handleKeyDown}
        placeholder="Nhập ghi chú mới..."
        style={{
          flex: 1,
          padding: '12px 18px',
          borderRadius: 12,
          border: '1.5px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--text)',
          fontSize: 15,
          outline: 'none',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        + Thêm
      </button>
    </div>
  )
}