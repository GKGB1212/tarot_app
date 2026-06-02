// Lưu & đọc lịch sử các lượt bói bằng localStorage.

export interface ReadingRecord {
  id: string
  spreadId: string
  spreadName: string
  question: string
  seed: number
  /** Danh sách lá đã rút theo thứ tự vị trí: [cardId, reversed] */
  draw: { cardId: string; reversed: boolean }[]
  createdAt: number
}

const KEY = 'tarot.history.v1'
const MAX = 50

export function loadHistory(): ReadingRecord[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as ReadingRecord[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveReading(record: ReadingRecord): ReadingRecord[] {
  const list = [record, ...loadHistory()].slice(0, MAX)
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // bỏ qua nếu localStorage không khả dụng (vd chế độ riêng tư)
  }
  return list
}

export function deleteReading(id: string): ReadingRecord[] {
  const list = loadHistory().filter((r) => r.id !== id)
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* noop */
  }
  return list
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}
