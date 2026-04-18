'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'

type Note = {
  id: number
  text: string
  createdAt: string
}

export default function Home() {
  // === useState: quản lý danh sách ghi chú ===
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load dữ liệu từ localStorage sau khi component mount để tránh hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('my-notes')
      if (!saved) {
        setIsLoaded(true)
        return
      }

      try {
        setNotes(JSON.parse(saved) as Note[])
      } catch {
        // Bỏ qua dữ liệu localStorage không hợp lệ
      } finally {
        setIsLoaded(true)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  // === useEffect #2: Lưu vào localStorage mỗi khi notes thay đổi ===
  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem('my-notes', JSON.stringify(notes))
  }, [notes, isLoaded])  // [notes] = chạy lại mỗi khi notes thay đổi

  // === Hàm thêm ghi chú ===
  const handleAddNote = (text: string) => {
    const newNote = {
      id: Date.now(),           // dùng timestamp làm id unique
      text: text,
      createdAt: new Date().toISOString(),
    }
    setNotes(prev => [newNote, ...prev])  // thêm vào đầu danh sách
  }

  // === Hàm xóa ghi chú ===
  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px 40px' }}>
      {/* Truyền noteCount xuống Header qua props */}
      <Header noteCount={notes.length} />

      <div style={{ paddingTop: 28 }}>
        {/* Truyền hàm thêm note xuống NoteForm */}
        <NoteForm onAddNote={handleAddNote} />

        {/* Truyền notes và hàm xóa xuống NoteList */}
        <NoteList notes={notes} onDelete={handleDeleteNote} />
      </div>
    </main>
  )
}