// Các kiểu trải bài (spreads) phổ biến trong Tarot.
// Mỗi vị trí có toạ độ (x, y) theo phần trăm để xếp lên bàn trải, kèm ý nghĩa.

export interface SpreadPosition {
  label: string // tên vị trí, vd "Quá khứ"
  meaning: string // vị trí này nói về điều gì
  x: number // 0–100, vị trí ngang trên bàn trải
  y: number // 0–100, vị trí dọc
  rotate?: number // độ xoay (dùng cho lá "thử thách" trong Celtic Cross)
}

export interface Spread {
  id: string
  name: string
  tagline: string
  description: string
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao'
  icon: string
  positions: SpreadPosition[]
}

export const SPREADS: Spread[] = [
  {
    id: 'single',
    name: 'Một Lá – Thông Điệp Hôm Nay',
    tagline: 'Nhanh gọn, súc tích',
    description:
      'Rút một lá duy nhất cho câu hỏi trong ngày, một lời khuyên hoặc năng lượng chủ đạo. Phù hợp để bắt đầu mỗi sáng.',
    difficulty: 'Cơ bản',
    icon: '🌅',
    positions: [{ label: 'Thông điệp', meaning: 'Năng lượng & lời khuyên cho bạn lúc này', x: 50, y: 50 }],
  },
  {
    id: 'three',
    name: 'Ba Lá – Quá Khứ · Hiện Tại · Tương Lai',
    tagline: 'Dòng chảy thời gian',
    description:
      'Trải bài kinh điển ba lá cho thấy diễn tiến của một vấn đề theo thời gian, hoặc Tình huống – Hành động – Kết quả.',
    difficulty: 'Cơ bản',
    icon: '⏳',
    positions: [
      { label: 'Quá khứ', meaning: 'Gốc rễ, những gì đã dẫn tới hiện tại', x: 20, y: 50 },
      { label: 'Hiện tại', meaning: 'Tình thế và năng lượng ngay lúc này', x: 50, y: 50 },
      { label: 'Tương lai', meaning: 'Xu hướng sắp tới nếu giữ nguyên hướng đi', x: 80, y: 50 },
    ],
  },
  {
    id: 'love',
    name: 'Tình Yêu – Soi Chiếu Mối Quan Hệ',
    tagline: 'Trái tim hai phía',
    description:
      'Năm lá khám phá cảm xúc và mong muốn của cả hai người, mối liên kết hiện tại và hướng phát triển của tình cảm.',
    difficulty: 'Trung cấp',
    icon: '💞',
    positions: [
      { label: 'Bạn', meaning: 'Cảm xúc & mong muốn của bạn', x: 22, y: 35 },
      { label: 'Đối phương', meaning: 'Cảm xúc & mong muốn của người ấy', x: 78, y: 35 },
      { label: 'Sợi dây kết nối', meaning: 'Nền tảng & bản chất mối quan hệ hiện tại', x: 50, y: 55 },
      { label: 'Thử thách', meaning: 'Trở ngại hoặc bài học cần vượt qua', x: 28, y: 78 },
      { label: 'Hướng phát triển', meaning: 'Tiềm năng & lời khuyên cho tương lai', x: 72, y: 78 },
    ],
  },
  {
    id: 'yesno',
    name: 'Có Hay Không – Quyết Định Nhanh',
    tagline: 'Một câu trả lời rõ ràng',
    description:
      'Rút ba lá để cảm nhận khuynh hướng Có / Không cho một câu hỏi cụ thể, dựa trên số lá xuôi và ngược cùng năng lượng tổng thể.',
    difficulty: 'Cơ bản',
    icon: '⚖️',
    positions: [
      { label: 'Lá 1', meaning: 'Năng lượng thứ nhất', x: 25, y: 50 },
      { label: 'Lá 2', meaning: 'Năng lượng thứ hai', x: 50, y: 50 },
      { label: 'Lá 3', meaning: 'Năng lượng thứ ba', x: 75, y: 50 },
    ],
  },
  {
    id: 'celtic',
    name: 'Thập Tự Celtic – Phân Tích Toàn Diện',
    tagline: 'Mười lá, cái nhìn sâu nhất',
    description:
      'Trải bài kinh điển và sâu sắc nhất gồm 10 lá: soi chiếu tình huống, thử thách, quá khứ – tương lai, nội tâm, ngoại cảnh, hy vọng/nỗi sợ và kết quả cuối cùng.',
    difficulty: 'Nâng cao',
    icon: '✠',
    positions: [
      { label: '1. Hiện tại', meaning: 'Trọng tâm vấn đề, tình thế hiện tại', x: 30, y: 50 },
      { label: '2. Thử thách', meaning: 'Trở ngại trực tiếp chắn ngang', x: 30, y: 50, rotate: 90 },
      { label: '3. Nền tảng', meaning: 'Gốc rễ tiềm thức, cội nguồn vấn đề', x: 30, y: 78 },
      { label: '4. Quá khứ', meaning: 'Những gì vừa qua, đang lùi xa', x: 12, y: 50 },
      { label: '5. Mục tiêu', meaning: 'Điều bạn hướng tới, tiềm thức bên trên', x: 30, y: 22 },
      { label: '6. Tương lai gần', meaning: 'Điều sắp đến trong thời gian tới', x: 48, y: 50 },
      { label: '7. Bản thân', meaning: 'Thái độ & vị thế của bạn', x: 72, y: 80 },
      { label: '8. Ngoại cảnh', meaning: 'Ảnh hưởng từ người khác & môi trường', x: 72, y: 58 },
      { label: '9. Hy vọng & nỗi sợ', meaning: 'Điều bạn mong mỏi hoặc lo lắng', x: 72, y: 36 },
      { label: '10. Kết quả', meaning: 'Kết cục có khả năng xảy ra nhất', x: 72, y: 14 },
    ],
  },
]

export function getSpread(id: string): Spread | undefined {
  return SPREADS.find((s) => s.id === id)
}
