import { useState } from 'react'

/** Khối cho phép sao chép nội dung quẻ bài để đưa sang Gemini luận giải. */
export function CopyResult({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // dự phòng cho trình duyệt cũ / không có quyền clipboard
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div className="copy-block">
      <div className="copy-head">
        <span className="copy-title">✨ Nhờ Gemini luận giải sâu hơn</span>
        <p className="muted small">Sao chép quẻ bài rồi dán vào Gemini để nhận luận giải chi tiết bằng AI.</p>
      </div>
      <div className="copy-actions">
        <button type="button" className={`btn primary ${copied ? 'ok' : ''}`} onClick={copy}>
          {copied ? '✓ Đã sao chép' : '📋 Sao chép quẻ bài'}
        </button>
        <a className="btn ghost" href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer">
          Mở Gemini ↗
        </a>
        <button type="button" className="btn ghost sm" onClick={() => setOpen((o) => !o)}>
          {open ? 'Ẩn nội dung' : 'Xem trước'}
        </button>
      </div>
      {open && <textarea className="copy-preview" readOnly value={text} rows={10} onFocus={(e) => e.target.select()} />}
    </div>
  )
}
