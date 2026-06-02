import { DECK, type TarotCard } from '../data/cards'

export interface DrawnCard {
  card: TarotCard
  reversed: boolean
}

/**
 * Bộ sinh số ngẫu nhiên có hạt giống (mulberry32).
 * Cho phép tái lập một lượt bói nếu biết seed — hữu ích để lưu & xem lại lịch sử.
 */
export function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function randomSeed(): number {
  // Ưu tiên nguồn ngẫu nhiên mạnh của trình duyệt khi có.
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    return crypto.getRandomValues(new Uint32Array(1))[0]
  }
  return Math.floor(Math.random() * 0xffffffff)
}

/** Xáo trộn Fisher–Yates (không làm thay đổi mảng gốc). */
export function shuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Tạo một bộ bài đã xào hoàn chỉnh: trộn thứ tự 78 lá và gán hướng xuôi/ngược.
 * reversedChance: xác suất một lá bị lật ngược (mặc định ~30%, đúng tỉ lệ
 * thường gặp khi xào bài thật).
 */
export function buildShuffledDeck(seed: number, reversedChance = 0.3): DrawnCard[] {
  const rng = makeRng(seed)
  const ordered = shuffle(DECK, rng)
  return ordered.map((card) => ({ card, reversed: rng() < reversedChance }))
}

/**
 * Bộ bài "nguyên cây": 78 lá theo thứ tự gốc, mỗi lá được gieo hướng
 * xuôi/ngược (~30% ngược). Dùng làm điểm bắt đầu cho việc xào tích luỹ.
 */
export function freshDeck(rng: () => number, reversedChance = 0.3): DrawnCard[] {
  return DECK.map((card) => ({ card, reversed: rng() < reversedChance }))
}

/**
 * Một lượt riffle (xóc cầu) thật theo mô hình Gilbert–Shannon–Reeds:
 * chia bộ bài làm hai phần quanh giữa rồi rơi xen kẽ từng lá với xác suất
 * tỉ lệ theo số lá còn lại ở mỗi phần — mô phỏng đúng động tác xóc tay.
 * Một lượt riffle chỉ trộn "một phần"; gọi nhiều lượt (≈5–7) mới trộn đều,
 * nên việc xào nhiều lần là có ý nghĩa thật sự (xào tích luỹ).
 */
export function riffleShuffle(deck: readonly DrawnCard[], rng: () => number): DrawnCard[] {
  const n = deck.length
  // điểm cắt dao động quanh chính giữa (±10%) như khi chia bài bằng tay
  const cut = Math.max(1, Math.min(n - 1, Math.round(n / 2 + (rng() - 0.5) * n * 0.2)))
  const left = deck.slice(0, cut)
  const right = deck.slice(cut)
  const out: DrawnCard[] = []
  let li = 0
  let ri = 0
  while (li < left.length || ri < right.length) {
    const lr = left.length - li
    const rr = right.length - ri
    if (ri >= right.length || (li < left.length && rng() < lr / (lr + rr))) {
      out.push(left[li++])
    } else {
      out.push(right[ri++])
    }
  }
  return out
}

/** Suy luận khuynh hướng Có/Không từ số lá xuôi/ngược đã rút. */
export function yesNoVerdict(cards: DrawnCard[]): {
  verdict: 'Có' | 'Không' | 'Có thể'
  upright: number
  reversed: number
} {
  const upright = cards.filter((c) => !c.reversed).length
  const reversed = cards.length - upright
  let verdict: 'Có' | 'Không' | 'Có thể'
  if (upright > reversed) verdict = 'Có'
  else if (reversed > upright) verdict = 'Không'
  else verdict = 'Có thể'
  return { verdict, upright, reversed }
}
