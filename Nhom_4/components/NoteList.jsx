// NoteList.jsx - nhận notes[] và onDelete từ parent
'use client'

export default function NoteList({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>
        Chưa có ghi chú nào. Hãy thêm ghi chú mới! ✍️
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  )
}

// NoteItem - hiển thị 1 ghi chú
function NoteItem({ note, onDelete }) {
  // Format ngày giờ theo kiểu Việt Nam
  const dateStr = new Date(note.createdAt).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1.5px solid var(--border)',
      borderRadius: 14,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'border-color 0.2s',
    }}>
      <div>
        <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>
          {note.text}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
          {dateStr}
        </div>
      </div>

      <button
        onClick={() => onDelete(note.id)}
        style={{
          background: '#fff0f0',
          color: 'var(--danger)',
          border: '1px solid #ffd0d0',
          borderRadius: 8,
          padding: '6px 14px',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        Xóa
      </button>
    </div>
  )
}