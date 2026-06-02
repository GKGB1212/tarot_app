import type { TarotCard } from '../data/cards'
import { SUIT_META, rankLabel } from '../data/cards'

export interface ShareItem {
  posLabel?: string
  posMeaning?: string
  card: TarotCard
  reversed: boolean
}

/**
 * Dựng đoạn văn bản mô tả lượt bói kèm yêu cầu luận giải,
 * để người dùng sao chép và dán vào Gemini (hoặc AI khác).
 */
export function buildGeminiPrompt(opts: {
  spreadName: string
  question: string
  items: ShareItem[]
}): string {
  const { spreadName, question, items } = opts
  const lines: string[] = []

  lines.push(
    'Bạn là một chuyên gia Tarot giàu kinh nghiệm. Hãy luận giải quẻ bài dưới đây một cách chi tiết, ' +
      'sâu sắc và dễ hiểu: phân tích từng lá theo vị trí của nó, sau đó tổng hợp thành một câu chuyện ' +
      'chung và đưa ra lời khuyên thiết thực cho tôi.',
  )
  lines.push('')
  lines.push(`• Kiểu trải bài: ${spreadName}`)
  lines.push(`• Câu hỏi: ${question.trim() || '(không có câu hỏi cụ thể, xin một thông điệp chung)'}`)
  lines.push('')
  lines.push('Các lá đã rút:')

  items.forEach((it, i) => {
    const suit =
      it.card.arcana === 'major'
        ? 'Ẩn Chính'
        : `${rankLabel(it.card)} bộ ${SUIT_META[it.card.suit!].nameVi}`
    const orient = it.reversed ? 'Ngược' : 'Xuôi'
    const pos = it.posLabel ? `[${it.posLabel}] ` : ''
    lines.push(`${i + 1}. ${pos}${it.card.nameVi} (${it.card.name}) — ${orient} · ${suit}`)
    if (it.posMeaning) lines.push(`   Ý nghĩa vị trí: ${it.posMeaning}`)
    const kws = it.reversed ? it.card.keywordsRev : it.card.keywords
    lines.push(`   Từ khóa: ${kws.join(', ')}`)
  })

  lines.push('')
  lines.push('Hãy trả lời bằng tiếng Việt.')
  return lines.join('\n')
}
