// Bộ bài Tarot chuẩn Rider–Waite–Smith (78 lá)
// 22 Ẩn Chính (Major Arcana) + 56 Ẩn Phụ (Minor Arcana: 4 chất × 14 lá)

export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type Arcana = 'major' | 'minor'

export interface TarotCard {
  id: string
  name: string // tên tiếng Anh
  nameVi: string // tên tiếng Việt
  arcana: Arcana
  suit?: Suit
  /** Major: 0–21. Minor: 1–14 (1=Ace … 11=Page, 12=Knight, 13=Queen, 14=King) */
  number: number
  element?: string
  emblem: string // biểu tượng trung tâm trên mặt bài
  keywords: string[] // từ khóa khi xuôi
  keywordsRev: string[] // từ khóa khi ngược
  upright: string // luận giải khi xuôi
  reversed: string // luận giải khi ngược
  love: string // gợi ý về tình cảm (xuôi)
  career: string // gợi ý về sự nghiệp/tài chính (xuôi)
}

export const SUIT_META: Record<
  Suit,
  { nameVi: string; element: string; emblem: string; theme: string }
> = {
  wands: { nameVi: 'Gậy', element: 'Lửa', emblem: '🔥', theme: 'fire' },
  cups: { nameVi: 'Cốc', element: 'Nước', emblem: '🍷', theme: 'water' },
  swords: { nameVi: 'Kiếm', element: 'Khí', emblem: '⚔️', theme: 'air' },
  pentacles: { nameVi: 'Tiền', element: 'Đất', emblem: '🪙', theme: 'earth' },
}

const ROMAN = [
  '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI',
]

export function roman(n: number): string {
  return ROMAN[n] ?? String(n)
}

// ───────────────────────────── ẨN CHÍNH ─────────────────────────────
const major: TarotCard[] = [
  {
    id: 'major-0', name: 'The Fool', nameVi: 'Gã Khờ', arcana: 'major', number: 0,
    element: 'Khí', emblem: '🦋',
    keywords: ['khởi đầu mới', 'tự do', 'phiêu lưu', 'ngây thơ', 'tin tưởng'],
    keywordsRev: ['liều lĩnh', 'thiếu suy nghĩ', 'do dự', 'sợ thay đổi'],
    upright: 'Một khởi đầu hoàn toàn mới đang mở ra. Hãy bước đi với trái tim rộng mở, tin vào hành trình dù chưa thấy hết con đường.',
    reversed: 'Có thể bạn đang hành động hấp tấp, hoặc ngược lại quá sợ hãi mà chùn bước. Cân nhắc trước khi nhảy, nhưng đừng để nỗi sợ trói chân.',
    love: 'Một mối quan hệ mới mẻ, đầy hứng khởi; hãy để bản thân được rung động một cách hồn nhiên.',
    career: 'Cơ hội mới, một con đường chưa ai đi. Dám thử nghiệm sẽ được tưởng thưởng.',
  },
  {
    id: 'major-1', name: 'The Magician', nameVi: 'Nhà Ảo Thuật', arcana: 'major', number: 1,
    element: 'Sao Thủy', emblem: '🪄',
    keywords: ['ý chí', 'sáng tạo', 'kỹ năng', 'biểu lộ', 'tài nguyên'],
    keywordsRev: ['thao túng', 'tài năng bị lãng phí', 'ảo tưởng', 'thiếu tập trung'],
    upright: 'Bạn có đủ mọi công cụ cần thiết để biến ý tưởng thành hiện thực. Tập trung ý chí và hành động — bạn là người kiến tạo.',
    reversed: 'Năng lực bị phân tán hoặc dùng sai mục đích. Coi chừng sự lừa dối — của người khác hoặc chính mình.',
    love: 'Sức hút mạnh mẽ và khả năng chủ động tạo nên mối quan hệ bạn mong muốn.',
    career: 'Thời điểm tốt để khởi sự; kỹ năng và nguồn lực của bạn đang ở đỉnh cao.',
  },
  {
    id: 'major-2', name: 'The High Priestess', nameVi: 'Nữ Tư Tế', arcana: 'major', number: 2,
    element: 'Mặt Trăng', emblem: '🌙',
    keywords: ['trực giác', 'tiềm thức', 'bí ẩn', 'tĩnh lặng', 'nội tâm'],
    keywordsRev: ['phớt lờ trực giác', 'bí mật bị che giấu', 'mất kết nối nội tâm'],
    upright: 'Câu trả lời nằm trong sự tĩnh lặng. Hãy lắng nghe trực giác và những điều chưa được nói ra.',
    reversed: 'Bạn đang bỏ qua tiếng nói bên trong, hoặc có những bí mật cần được sáng tỏ.',
    love: 'Một sự kết nối sâu sắc, đầy bí ẩn. Hãy tin vào cảm nhận thay vì vội phân tích.',
    career: 'Tin vào linh cảm; thông tin quan trọng có thể chưa được tiết lộ hết.',
  },
  {
    id: 'major-3', name: 'The Empress', nameVi: 'Nữ Hoàng', arcana: 'major', number: 3,
    element: 'Sao Kim', emblem: '🌹',
    keywords: ['phồn thịnh', 'nuôi dưỡng', 'sáng tạo', 'thiên nhiên', 'sung túc'],
    keywordsRev: ['phụ thuộc', 'bế tắc sáng tạo', 'bỏ bê bản thân'],
    upright: 'Giai đoạn sinh sôi, dồi dào và được chăm sóc. Những gì bạn gieo trồng đang đơm hoa kết trái.',
    reversed: 'Bạn có thể đang cho đi quá nhiều mà quên chính mình, hoặc cảm hứng tạm thời cạn kiệt.',
    love: 'Tình cảm ấm áp, nuôi dưỡng; có thể là dấu hiệu của gắn bó sâu sắc hoặc tin vui sinh nở.',
    career: 'Dự án phát triển tốt đẹp; sự sáng tạo được đền đáp xứng đáng.',
  },
  {
    id: 'major-4', name: 'The Emperor', nameVi: 'Hoàng Đế', arcana: 'major', number: 4,
    element: 'Bạch Dương', emblem: '🦅',
    keywords: ['quyền lực', 'kỷ luật', 'cấu trúc', 'ổn định', 'lãnh đạo'],
    keywordsRev: ['độc đoán', 'cứng nhắc', 'mất kiểm soát', 'lạm quyền'],
    upright: 'Sự ổn định đến từ kỷ luật và trật tự. Hãy nắm quyền chủ động và xây dựng nền móng vững chắc.',
    reversed: 'Cứng nhắc hoặc kiểm soát thái quá đang gây trở ngại; cũng có thể là thiếu vắng cấu trúc cần thiết.',
    love: 'Một mối quan hệ vững vàng, có trách nhiệm; coi chừng sự áp đặt.',
    career: 'Vị thế, quyền lực và sự công nhận; lãnh đạo bằng sự nghiêm túc.',
  },
  {
    id: 'major-5', name: 'The Hierophant', nameVi: 'Giáo Hoàng', arcana: 'major', number: 5,
    element: 'Kim Ngưu', emblem: '🗝️',
    keywords: ['truyền thống', 'niềm tin', 'học hỏi', 'thể chế', 'dẫn dắt'],
    keywordsRev: ['nổi loạn', 'phá vỡ quy chuẩn', 'tự do tư tưởng'],
    upright: 'Tìm về những giá trị truyền thống, người thầy hoặc hệ thống đã được kiểm chứng. Có điều cần học hỏi.',
    reversed: 'Bạn muốn đi con đường riêng, thoát khỏi khuôn mẫu cũ. Đôi khi cần thách thức quy ước.',
    love: 'Cam kết nghiêm túc, có thể gắn với hôn nhân hay những giá trị chung.',
    career: 'Học hỏi từ người đi trước; môi trường có quy chuẩn, tổ chức rõ ràng.',
  },
  {
    id: 'major-6', name: 'The Lovers', nameVi: 'Tình Nhân', arcana: 'major', number: 6,
    element: 'Song Tử', emblem: '💞',
    keywords: ['tình yêu', 'lựa chọn', 'hòa hợp', 'kết nối', 'giá trị'],
    keywordsRev: ['bất hòa', 'lựa chọn sai', 'mất cân bằng', 'cám dỗ'],
    upright: 'Một sự kết nối sâu sắc và chân thật, hoặc một lựa chọn quan trọng dựa trên giá trị cốt lõi của bạn.',
    reversed: 'Mâu thuẫn trong giá trị, sự thiếu hòa hợp, hoặc một quyết định bị né tránh.',
    love: 'Tình yêu đích thực, sự hòa hợp tâm hồn; cũng có thể là ngã rẽ buộc phải chọn.',
    career: 'Quan hệ đối tác quan trọng; cần chọn lựa phù hợp với giá trị của mình.',
  },
  {
    id: 'major-7', name: 'The Chariot', nameVi: 'Cỗ Xe', arcana: 'major', number: 7,
    element: 'Cự Giải', emblem: '🏇',
    keywords: ['chiến thắng', 'ý chí', 'quyết tâm', 'kiểm soát', 'tiến lên'],
    keywordsRev: ['mất phương hướng', 'thiếu kiểm soát', 'hung hăng', 'trì hoãn'],
    upright: 'Bằng quyết tâm và sự tự chủ, bạn vượt qua trở ngại và giành chiến thắng. Hãy giữ vững tay lái.',
    reversed: 'Thiếu định hướng hoặc để cảm xúc lấn át lý trí khiến bạn chệch đường.',
    love: 'Theo đuổi điều mình muốn một cách kiên định; cần cân bằng hai phía.',
    career: 'Tiến bộ nhờ nỗ lực và kỷ luật; chiến thắng đang trong tầm tay.',
  },
  {
    id: 'major-8', name: 'Strength', nameVi: 'Sức Mạnh', arcana: 'major', number: 8,
    element: 'Sư Tử', emblem: '🦁',
    keywords: ['sức mạnh nội tâm', 'lòng can đảm', 'kiên nhẫn', 'từ bi', 'kiểm soát mềm mỏng'],
    keywordsRev: ['nghi ngờ bản thân', 'yếu đuối', 'nóng nảy', 'thiếu tự tin'],
    upright: 'Sức mạnh thật sự đến từ sự dịu dàng và làm chủ bản thân, không phải vũ lực. Hãy kiên nhẫn và can đảm.',
    reversed: 'Bạn đang nghi ngờ chính mình hoặc để cảm xúc tiêu cực chi phối. Hãy tử tế với bản thân.',
    love: 'Tình cảm bền bỉ vượt thử thách nhờ sự bao dung và kiên nhẫn.',
    career: 'Vượt khó bằng sự bình tĩnh và bền bỉ; quyền lực mềm thắng thế.',
  },
  {
    id: 'major-9', name: 'The Hermit', nameVi: 'Ẩn Sĩ', arcana: 'major', number: 9,
    element: 'Xử Nữ', emblem: '🏮',
    keywords: ['nội quan', 'tìm kiếm', 'cô độc', 'minh triết', 'dẫn lối'],
    keywordsRev: ['cô lập', 'lạc lối', 'né tránh', 'cô đơn'],
    upright: 'Đã đến lúc lùi lại, tự vấn và tìm câu trả lời từ bên trong. Ánh sáng minh triết soi đường cho bạn.',
    reversed: 'Sự cô độc có thể chuyển thành cô lập; hoặc bạn đang trốn tránh việc nhìn vào nội tâm.',
    love: 'Cần thời gian cho riêng mình để hiểu điều mình thật sự muốn.',
    career: 'Suy ngẫm sâu trước khi quyết định; tìm lời khuyên từ người dày dạn.',
  },
  {
    id: 'major-10', name: 'Wheel of Fortune', nameVi: 'Bánh Xe Số Phận', arcana: 'major', number: 10,
    element: 'Mộc Tinh', emblem: '🎡',
    keywords: ['vận may', 'chu kỳ', 'bước ngoặt', 'số phận', 'thay đổi'],
    keywordsRev: ['vận rủi', 'kháng cự thay đổi', 'mất kiểm soát', 'trì trệ'],
    upright: 'Bánh xe đang quay theo hướng có lợi. Một bước ngoặt may mắn xuất hiện — hãy đón nhận dòng chảy.',
    reversed: 'Một chu kỳ đi xuống hoặc cảm giác mọi thứ ngoài tầm kiểm soát. Mọi thứ rồi sẽ xoay vần.',
    love: 'Số phận đưa đẩy; một thay đổi lớn trong tình cảm sắp đến.',
    career: 'Thời cơ và may mắn xoay chuyển tình thế theo chiều hướng tốt.',
  },
  {
    id: 'major-11', name: 'Justice', nameVi: 'Công Lý', arcana: 'major', number: 11,
    element: 'Thiên Bình', emblem: '⚖️',
    keywords: ['công bằng', 'sự thật', 'nhân quả', 'trách nhiệm', 'cân bằng'],
    keywordsRev: ['bất công', 'trốn tránh trách nhiệm', 'thiên vị', 'gian dối'],
    upright: 'Sự thật sẽ được phơi bày và mọi việc được phân xử công bằng. Hãy hành động chính trực và chịu trách nhiệm.',
    reversed: 'Có sự bất công, thiên lệch hoặc né tránh hậu quả. Hãy trung thực với chính mình.',
    love: 'Một mối quan hệ công bằng, sòng phẳng; mọi việc được nhìn nhận đúng đắn.',
    career: 'Vấn đề pháp lý/hợp đồng được giải quyết công bằng; nhân quả rõ ràng.',
  },
  {
    id: 'major-12', name: 'The Hanged Man', nameVi: 'Người Bị Treo', arcana: 'major', number: 12,
    element: 'Nước', emblem: '🙃',
    keywords: ['buông bỏ', 'góc nhìn mới', 'tạm dừng', 'hy sinh', 'chấp nhận'],
    keywordsRev: ['trì hoãn', 'kháng cự', 'bế tắc', 'hy sinh vô ích'],
    upright: 'Tạm dừng và nhìn mọi việc từ một góc độ khác. Đôi khi buông bỏ kiểm soát lại mở ra sự thấu hiểu.',
    reversed: 'Bạn đang mắc kẹt, trì hoãn điều cần thiết hoặc hy sinh mà không nhận lại gì.',
    love: 'Cần nhìn lại mối quan hệ bằng góc nhìn mới; kiên nhẫn chờ thời điểm.',
    career: 'Dự án tạm ngưng; hãy dùng khoảng lặng này để nhìn nhận lại hướng đi.',
  },
  {
    id: 'major-13', name: 'Death', nameVi: 'Cái Chết', arcana: 'major', number: 13,
    element: 'Bọ Cạp', emblem: '🦋',
    keywords: ['kết thúc', 'chuyển hóa', 'tái sinh', 'buông bỏ', 'khởi đầu'],
    keywordsRev: ['kháng cự thay đổi', 'níu kéo', 'trì trệ', 'sợ kết thúc'],
    upright: 'Một chương khép lại để chương mới mở ra. Đây là sự chuyển hóa cần thiết, không phải mất mát đáng sợ.',
    reversed: 'Bạn đang níu kéo điều đã hết hạn. Sự kháng cự khiến quá trình chuyển mình kéo dài đau đớn.',
    love: 'Một giai đoạn của mối quan hệ kết thúc, nhường chỗ cho điều mới mẻ hơn.',
    career: 'Thay đổi lớn, có thể là kết thúc một công việc để bắt đầu hành trình mới.',
  },
  {
    id: 'major-14', name: 'Temperance', nameVi: 'Tiết Độ', arcana: 'major', number: 14,
    element: 'Nhân Mã', emblem: '🏺',
    keywords: ['cân bằng', 'điều độ', 'kiên nhẫn', 'hòa hợp', 'dung hòa'],
    keywordsRev: ['mất cân bằng', 'thái quá', 'thiếu kiên nhẫn', 'xung đột'],
    upright: 'Sự hài hòa đến từ điều độ và kiên nhẫn. Hãy dung hòa các thái cực và tìm điểm cân bằng.',
    reversed: 'Có sự thái quá hoặc mất cân bằng trong cuộc sống. Bạn đang vội vàng hoặc dao động giữa các cực.',
    love: 'Mối quan hệ hài hòa, dung hòa khác biệt; sự kiên nhẫn được đền đáp.',
    career: 'Hợp tác ăn ý, tìm được tiếng nói chung; tiến chậm mà chắc.',
  },
  {
    id: 'major-15', name: 'The Devil', nameVi: 'Ác Quỷ', arcana: 'major', number: 15,
    element: 'Ma Kết', emblem: '😈',
    keywords: ['ràng buộc', 'cám dỗ', 'vật chất', 'lệ thuộc', 'bóng tối'],
    keywordsRev: ['giải thoát', 'phá xiềng', 'nhận ra sự thật', 'lấy lại tự do'],
    upright: 'Bạn có thể đang bị trói buộc bởi cám dỗ, thói quen xấu hay sự lệ thuộc. Hãy nhận diện sợi xích đó.',
    reversed: 'Bạn đang bắt đầu phá bỏ xiềng xích và giành lại tự do. Sự thật được nhìn rõ.',
    love: 'Sức hút mãnh liệt nhưng coi chừng sự lệ thuộc hay độc hại.',
    career: 'Cảm giác bị mắc kẹt vì tiền bạc hoặc cam kết; xem lại điều gì đang trói buộc bạn.',
  },
  {
    id: 'major-16', name: 'The Tower', nameVi: 'Tòa Tháp', arcana: 'major', number: 16,
    element: 'Hỏa Tinh', emblem: '🗼',
    keywords: ['biến động', 'sụp đổ', 'tỉnh ngộ', 'thay đổi đột ngột', 'giải phóng'],
    keywordsRev: ['né tránh tai họa', 'sợ thay đổi', 'khủng hoảng kéo dài'],
    upright: 'Một sự kiện bất ngờ làm lung lay nền móng cũ. Dù gây sốc, nó phá vỡ ảo tưởng để xây lại điều chân thật.',
    reversed: 'Bạn đang cố trì hoãn một sự sụp đổ tất yếu, hoặc đang dần hồi phục sau biến cố.',
    love: 'Một cú sốc hoặc sự thật bất ngờ làm rung chuyển mối quan hệ.',
    career: 'Thay đổi đột ngột, có thể là sự đổ vỡ — nhưng mở đường cho nền móng mới.',
  },
  {
    id: 'major-17', name: 'The Star', nameVi: 'Ngôi Sao', arcana: 'major', number: 17,
    element: 'Bảo Bình', emblem: '⭐',
    keywords: ['hy vọng', 'niềm tin', 'chữa lành', 'cảm hứng', 'thanh thản'],
    keywordsRev: ['mất hy vọng', 'nản lòng', 'mất kết nối', 'hoài nghi'],
    upright: 'Sau giông bão là ánh sao hy vọng. Đây là thời kỳ chữa lành, cảm hứng và niềm tin được phục hồi.',
    reversed: 'Bạn đang mất niềm tin hoặc cảm thấy nản lòng. Hãy nhớ rằng ánh sáng vẫn còn đó.',
    love: 'Hy vọng và sự chữa lành trong tình cảm; một kết nối trong sáng, đầy cảm hứng.',
    career: 'Lạc quan có cơ sở; ước mơ dần thành hình, hãy giữ niềm tin.',
  },
  {
    id: 'major-18', name: 'The Moon', nameVi: 'Mặt Trăng', arcana: 'major', number: 18,
    element: 'Song Ngư', emblem: '🌕',
    keywords: ['ảo ảnh', 'trực giác', 'nỗi sợ', 'tiềm thức', 'mơ hồ'],
    keywordsRev: ['sáng tỏ', 'vượt qua sợ hãi', 'sự thật lộ diện'],
    upright: 'Mọi thứ chưa rõ ràng như vẻ ngoài. Hãy cẩn trọng với ảo tưởng và lắng nghe trực giác giữa sương mù.',
    reversed: 'Sương mù dần tan, sự thật và nỗi sợ được nhìn nhận rõ hơn.',
    love: 'Có điều mơ hồ hoặc chưa nói ra; hãy lắng nghe cảm giác thật của mình.',
    career: 'Thông tin chưa đầy đủ; đừng vội quyết định khi mọi thứ còn mập mờ.',
  },
  {
    id: 'major-19', name: 'The Sun', nameVi: 'Mặt Trời', arcana: 'major', number: 19,
    element: 'Mặt Trời', emblem: '☀️',
    keywords: ['niềm vui', 'thành công', 'sức sống', 'rõ ràng', 'lạc quan'],
    keywordsRev: ['lạc quan thái quá', 'trì hoãn niềm vui', 'thiếu sức sống tạm thời'],
    upright: 'Ánh sáng rực rỡ của niềm vui và thành công. Mọi thứ sáng tỏ, ấm áp và tràn đầy sức sống.',
    reversed: 'Niềm vui tạm bị che khuất, hoặc sự lạc quan đang hơi quá đà. Hạnh phúc vẫn rất gần.',
    love: 'Hạnh phúc rạng rỡ, sự ấm áp và niềm vui trong tình cảm.',
    career: 'Thành công, được công nhận; mọi nỗ lực tỏa sáng.',
  },
  {
    id: 'major-20', name: 'Judgement', nameVi: 'Phán Xét', arcana: 'major', number: 20,
    element: 'Lửa', emblem: '🎺',
    keywords: ['thức tỉnh', 'phán xét', 'tha thứ', 'tái sinh', 'tiếng gọi'],
    keywordsRev: ['tự phán xét', 'do dự', 'né tránh bài học', 'hối tiếc'],
    upright: 'Một tiếng gọi thức tỉnh. Đã đến lúc nhìn lại, tha thứ cho quá khứ và bước lên một tầm cao mới.',
    reversed: 'Bạn quá khắt khe với bản thân hoặc đang lảng tránh một bài học quan trọng.',
    love: 'Hàn gắn quá khứ, một quyết định lớn dựa trên những gì đã trải qua.',
    career: 'Đánh giá lại con đường đã đi; một bước chuyển mình quan trọng.',
  },
  {
    id: 'major-21', name: 'The World', nameVi: 'Thế Giới', arcana: 'major', number: 21,
    element: 'Thổ Tinh', emblem: '🌍',
    keywords: ['hoàn thành', 'trọn vẹn', 'thành tựu', 'hòa nhập', 'viên mãn'],
    keywordsRev: ['dang dở', 'trì hoãn hoàn thành', 'thiếu khép lại'],
    upright: 'Một chu kỳ hoàn tất trong viên mãn. Bạn đã đạt được sự trọn vẹn — hãy ăn mừng thành tựu này.',
    reversed: 'Một việc gần xong nhưng còn dang dở. Cần thêm chút nữa để thực sự khép lại.',
    love: 'Mối quan hệ trọn vẹn, viên mãn; cảm giác hoàn chỉnh bên nhau.',
    career: 'Hoàn thành mục tiêu lớn, một thành tựu đáng tự hào và sự công nhận.',
  },
]

// ───────────────────────────── ẨN PHỤ ─────────────────────────────
// Dữ liệu rút gọn theo từng chất; mỗi lá gồm từ khóa & luận giải xuôi/ngược.
interface MinorSeed {
  n: number
  name: string
  nameVi: string
  emblem: string
  kw: string[]
  kwR: string[]
  up: string
  rev: string
  love: string
  career: string
}

const RANK_VI: Record<number, string> = {
  1: 'Ách', 11: 'Hoàng Tử', 12: 'Hiệp Sĩ', 13: 'Hoàng Hậu', 14: 'Đức Vua',
}

const wandsSeed: MinorSeed[] = [
  { n: 1, name: 'Ace of Wands', nameVi: 'Ách Gậy', emblem: '🔥', kw: ['cảm hứng', 'khởi đầu', 'tiềm năng', 'đam mê'], kwR: ['chậm trễ', 'thiếu năng lượng', 'do dự'], up: 'Tia lửa cảm hứng đầu tiên cho một dự án hay đam mê mới. Hãy nắm bắt năng lượng này.', rev: 'Ý tưởng hay nhưng chưa đúng lúc, hoặc bạn đang thiếu nhiệt huyết để bắt đầu.', love: 'Một tia lửa đam mê mới bùng lên.', career: 'Ý tưởng mới đầy hứa hẹn, hãy khởi động.' },
  { n: 2, name: 'Two of Wands', nameVi: 'Hai Gậy', emblem: '🗺️', kw: ['lập kế hoạch', 'tầm nhìn', 'quyết định', 'tương lai'], kwR: ['sợ rủi ro', 'thiếu kế hoạch', 'ngại bước ra'], up: 'Bạn đang đứng trước thế giới rộng mở, lên kế hoạch cho bước đi lớn. Tầm nhìn dài hạn là chìa khóa.', rev: 'Nỗi sợ điều chưa biết khiến bạn chần chừ; kế hoạch còn thiếu chắc chắn.', love: 'Cân nhắc tương lai của mối quan hệ.', career: 'Hoạch định chiến lược dài hạn, mở rộng tầm nhìn.' },
  { n: 3, name: 'Three of Wands', nameVi: 'Ba Gậy', emblem: '⛵', kw: ['mở rộng', 'tiến triển', 'tầm nhìn xa', 'cơ hội'], kwR: ['trì hoãn', 'trở ngại', 'thiếu tầm nhìn'], up: 'Kế hoạch của bạn bắt đầu có kết quả. Hãy nhìn xa và sẵn sàng mở rộng.', rev: 'Có chậm trễ hoặc trở ngại ngoài dự tính; cần kiên nhẫn và điều chỉnh.', love: 'Mối quan hệ phát triển, hướng tới điều lớn hơn.', career: 'Cơ hội mở rộng, hợp tác hoặc vươn ra xa.' },
  { n: 4, name: 'Four of Wands', nameVi: 'Bốn Gậy', emblem: '🎉', kw: ['ăn mừng', 'hòa hợp', 'mái ấm', 'thành quả'], kwR: ['bất hòa gia đình', 'lễ kỷ niệm bị hoãn', 'thiếu ổn định'], up: 'Thời điểm ăn mừng và tận hưởng sự ổn định, hòa thuận. Một cột mốc đáng vui.', rev: 'Niềm vui bị gián đoạn hoặc có căng thẳng trong gia đình/tập thể.', love: 'Mối quan hệ hài hòa, có thể tiến tới cam kết.', career: 'Hoàn thành một giai đoạn, đáng để ăn mừng.' },
  { n: 5, name: 'Five of Wands', nameVi: 'Năm Gậy', emblem: '⚔️', kw: ['xung đột', 'cạnh tranh', 'bất đồng', 'thử thách'], kwR: ['tránh xung đột', 'hòa giải', 'căng thẳng nội tâm'], up: 'Sự cạnh tranh và bất đồng quan điểm. Đây là thử thách có thể giúp bạn mạnh mẽ hơn.', rev: 'Xung đột dần lắng xuống, hoặc bạn đang né tránh va chạm cần thiết.', love: 'Có cãi vã, khác biệt cần dung hòa.', career: 'Môi trường cạnh tranh; giữ vững lập trường.' },
  { n: 6, name: 'Six of Wands', nameVi: 'Sáu Gậy', emblem: '🏆', kw: ['chiến thắng', 'công nhận', 'tự hào', 'thành công'], kwR: ['thiếu công nhận', 'tự kiêu', 'thất bại tạm thời'], up: 'Chiến thắng và sự công nhận sau nỗ lực. Hãy tự hào và đón nhận lời tán dương.', rev: 'Thành quả chưa được ghi nhận, hoặc cần khiêm tốn hơn.', love: 'Được trân trọng trong mối quan hệ.', career: 'Thành công và sự công nhận xứng đáng.' },
  { n: 7, name: 'Seven of Wands', nameVi: 'Bảy Gậy', emblem: '🛡️', kw: ['phòng thủ', 'kiên định', 'bảo vệ lập trường', 'thử thách'], kwR: ['kiệt sức', 'từ bỏ', 'choáng ngợp'], up: 'Bạn đang ở thế phải bảo vệ vị trí của mình. Hãy đứng vững, bạn có lợi thế.', rev: 'Bạn cảm thấy quá tải và muốn buông xuôi; đừng từ bỏ quá sớm.', love: 'Cần kiên định bảo vệ điều mình tin.', career: 'Giữ vững thành quả trước cạnh tranh.' },
  { n: 8, name: 'Eight of Wands', nameVi: 'Tám Gậy', emblem: '💨', kw: ['tốc độ', 'chuyển động', 'tin tức', 'hành động nhanh'], kwR: ['chậm trễ', 'vội vàng', 'mất đà'], up: 'Mọi việc tăng tốc nhanh chóng. Tin tức hoặc tiến triển đến dồn dập — hãy sẵn sàng.', rev: 'Có sự chậm trễ hoặc mọi thứ diễn ra quá vội khiến rối ren.', love: 'Tình cảm tiến triển nhanh, tin nhắn/liên lạc dồn dập.', career: 'Mọi việc chuyển động nhanh, nắm bắt kịp thời.' },
  { n: 9, name: 'Nine of Wands', nameVi: 'Chín Gậy', emblem: '🪵', kw: ['kiên cường', 'bền bỉ', 'cảnh giác', 'gần đích'], kwR: ['kiệt quệ', 'phòng thủ thái quá', 'muốn bỏ cuộc'], up: 'Bạn đã đi gần hết chặng đường dù mệt mỏi. Hãy kiên cường thêm chút nữa.', rev: 'Bạn kiệt sức hoặc quá đề phòng. Hãy cho mình nghỉ ngơi.', love: 'Thận trọng vì tổn thương cũ; cần lòng tin.', career: 'Bền bỉ qua khó khăn, gần đến thành công.' },
  { n: 10, name: 'Ten of Wands', nameVi: 'Mười Gậy', emblem: '🎒', kw: ['gánh nặng', 'trách nhiệm', 'áp lực', 'gắng sức'], kwR: ['buông bớt', 'kiệt sức', 'trút gánh nặng'], up: 'Bạn đang mang quá nhiều trên vai. Thành quả gần kề nhưng hãy biết san sẻ bớt.', rev: 'Đã đến lúc buông bớt gánh nặng không cần thiết.', love: 'Mối quan hệ có thể đang quá tải trách nhiệm.', career: 'Quá nhiều việc; cần ủy thác và san sẻ.' },
  { n: 11, name: 'Page of Wands', nameVi: 'Hoàng Tử Gậy', emblem: '🧒', kw: ['khám phá', 'nhiệt huyết', 'tin vui', 'ý tưởng mới'], kwR: ['thiếu định hướng', 'bốc đồng', 'tin xấu'], up: 'Một tâm hồn tò mò, đầy nhiệt huyết khám phá. Tin vui hoặc cơ hội học hỏi đang đến.', rev: 'Ý tưởng thiếu kế hoạch hoặc sự bốc đồng cản trở bạn.', love: 'Sự háo hức, một khởi đầu vui tươi.', career: 'Đam mê học hỏi, thử nghiệm điều mới.' },
  { n: 12, name: 'Knight of Wands', nameVi: 'Hiệp Sĩ Gậy', emblem: '🐎', kw: ['hành động', 'đam mê', 'phiêu lưu', 'năng lượng'], kwR: ['hấp tấp', 'thiếu kiên nhẫn', 'bốc đồng'], up: 'Lao về phía trước với đam mê và năng lượng dồi dào. Hành động táo bạo được tưởng thưởng.', rev: 'Sự nóng vội hoặc thiếu kiên nhẫn có thể khiến mọi thứ chệch hướng.', love: 'Đam mê cuồng nhiệt nhưng coi chừng thiếu bền.', career: 'Hành động quyết liệt; tránh hấp tấp.' },
  { n: 13, name: 'Queen of Wands', nameVi: 'Hoàng Hậu Gậy', emblem: '👸', kw: ['tự tin', 'cuốn hút', 'độc lập', 'nhiệt tình'], kwR: ['thiếu tự tin', 'ghen tị', 'thái quá'], up: 'Sự tự tin rạng rỡ và sức cuốn hút tự nhiên. Bạn truyền cảm hứng cho mọi người quanh mình.', rev: 'Thiếu tự tin hoặc cảm giác ghen tị, đố kỵ đang chi phối.', love: 'Quyến rũ, ấm áp và nồng nhiệt.', career: 'Lãnh đạo bằng sự nhiệt huyết và bản lĩnh.' },
  { n: 14, name: 'King of Wands', nameVi: 'Đức Vua Gậy', emblem: '🤴', kw: ['lãnh đạo', 'tầm nhìn', 'quyết đoán', 'truyền cảm hứng'], kwR: ['độc đoán', 'bốc đồng', 'kỳ vọng quá cao'], up: 'Người lãnh đạo có tầm nhìn và lôi cuốn, dám hành động vì lý tưởng lớn. Hãy dẫn dắt bằng đam mê.', rev: 'Sự nóng nảy hoặc áp đặt làm giảm sức ảnh hưởng của bạn.', love: 'Một người nồng nhiệt, mạnh mẽ và tận tâm.', career: 'Lãnh đạo có tầm nhìn, truyền lửa cho tập thể.' },
]

const cupsSeed: MinorSeed[] = [
  { n: 1, name: 'Ace of Cups', nameVi: 'Ách Cốc', emblem: '💧', kw: ['tình cảm mới', 'tình yêu', 'trực giác', 'khởi đầu cảm xúc'], kwR: ['cảm xúc bị kìm nén', 'trống rỗng', 'khép lòng'], up: 'Trái tim rộng mở đón nhận tình yêu và cảm xúc mới mẻ, tinh khôi. Hãy để mình được rung động.', rev: 'Cảm xúc bị dồn nén hoặc bạn đang khép lòng vì sợ tổn thương.', love: 'Khởi đầu của một tình yêu trong trẻo.', career: 'Niềm vui và cảm hứng trong công việc sáng tạo.' },
  { n: 2, name: 'Two of Cups', nameVi: 'Hai Cốc', emblem: '💑', kw: ['kết đôi', 'hòa hợp', 'gắn kết', 'thấu hiểu'], kwR: ['bất hòa', 'mất cân bằng', 'rạn nứt'], up: 'Một sự kết nối đẹp đẽ và cân bằng giữa hai người. Tình cảm hay quan hệ đối tác nở hoa.', rev: 'Sự mất hòa hợp hoặc hiểu lầm đang làm mối quan hệ chông chênh.', love: 'Tình yêu đôi lứa hài hòa, thấu hiểu.', career: 'Quan hệ hợp tác ăn ý, tôn trọng lẫn nhau.' },
  { n: 3, name: 'Three of Cups', nameVi: 'Ba Cốc', emblem: '🥂', kw: ['tình bạn', 'ăn mừng', 'cộng đồng', 'niềm vui'], kwR: ['cô lập', 'tiệc tùng thái quá', 'tin đồn'], up: 'Niềm vui được chia sẻ cùng bạn bè và những người thân yêu. Hãy ăn mừng và tận hưởng.', rev: 'Có sự xa cách trong nhóm bạn, hoặc vui chơi thái quá làm xao nhãng.', love: 'Tình cảm được bạn bè ủng hộ, vui vẻ.', career: 'Hợp tác nhóm vui vẻ, ăn mừng thành quả chung.' },
  { n: 4, name: 'Four of Cups', nameVi: 'Bốn Cốc', emblem: '😔', kw: ['chán nản', 'thờ ơ', 'nội quan', 'bỏ lỡ'], kwR: ['tỉnh thức', 'đón nhận cơ hội', 'động lực mới'], up: 'Sự chán chường khiến bạn bỏ lỡ cơ hội ngay trước mắt. Hãy nhìn ra ngoài sự buồn tẻ.', rev: 'Bạn đang thoát khỏi sự uể oải và sẵn sàng đón nhận điều mới.', love: 'Đừng để sự thờ ơ che mất một tình cảm chân thành.', career: 'Cảm giác mất hứng; hãy tìm lại ý nghĩa.' },
  { n: 5, name: 'Five of Cups', nameVi: 'Năm Cốc', emblem: '😢', kw: ['mất mát', 'tiếc nuối', 'buồn bã', 'thất vọng'], kwR: ['chấp nhận', 'hồi phục', 'tha thứ', 'tiến lên'], up: 'Nỗi buồn vì mất mát là có thật, nhưng đừng quên những điều tốt đẹp vẫn còn lại phía sau.', rev: 'Bạn đang chữa lành và học cách buông bỏ tiếc nuối để bước tiếp.', love: 'Tổn thương cần thời gian chữa lành.', career: 'Thất vọng tạm thời; tập trung vào điều còn lại.' },
  { n: 6, name: 'Six of Cups', nameVi: 'Sáu Cốc', emblem: '🧸', kw: ['hoài niệm', 'ký ức', 'ngây thơ', 'tử tế'], kwR: ['mắc kẹt quá khứ', 'lý tưởng hóa', 'trưởng thành'], up: 'Những ký ức ngọt ngào và sự ngây thơ trong trẻo. Một người hoặc điều gì từ quá khứ có thể trở lại.', rev: 'Bạn đang sống quá nhiều trong hoài niệm; đã đến lúc hướng về hiện tại.', love: 'Tình cũ trở lại hoặc một tình cảm trong sáng, hồn nhiên.', career: 'Hợp tác dựa trên sự tin cậy lâu năm.' },
  { n: 7, name: 'Seven of Cups', nameVi: 'Bảy Cốc', emblem: '🌫️', kw: ['lựa chọn', 'ảo tưởng', 'mơ mộng', 'phân vân'], kwR: ['sáng suốt', 'quyết định', 'thực tế'], up: 'Nhiều lựa chọn hấp dẫn bày ra, nhưng không phải đều thực tế. Hãy tỉnh táo phân biệt mơ và thật.', rev: 'Bạn đã nhìn rõ và sẵn sàng đưa ra lựa chọn đúng đắn.', love: 'Coi chừng lý tưởng hóa; nhìn người ấy như họ thật sự là.', career: 'Quá nhiều hướng đi; cần ưu tiên rõ ràng.' },
  { n: 8, name: 'Eight of Cups', nameVi: 'Tám Cốc', emblem: '🌄', kw: ['rời đi', 'tìm kiếm ý nghĩa', 'buông bỏ', 'chuyển hướng'], kwR: ['sợ thay đổi', 'mắc kẹt', 'quay lại'], up: 'Bạn rời bỏ điều không còn thỏa mãn để đi tìm ý nghĩa sâu sắc hơn. Một sự ra đi can đảm.', rev: 'Bạn lưỡng lự giữa ở lại và ra đi, sợ buông bỏ điều quen thuộc.', love: 'Rời bỏ mối quan hệ không còn nuôi dưỡng bạn.', career: 'Tìm kiếm công việc có ý nghĩa hơn.' },
  { n: 9, name: 'Nine of Cups', nameVi: 'Chín Cốc', emblem: '😊', kw: ['mãn nguyện', 'ước nguyện thành', 'hài lòng', 'sung túc'], kwR: ['thỏa mãn hời hợt', 'tham lam', 'ước vọng chưa trọn'], up: 'Lá bài của điều ước thành hiện thực. Sự hài lòng và mãn nguyện trong tầm tay.', rev: 'Niềm vui có thể chỉ ở bề mặt; hãy tìm sự thỏa mãn sâu sắc hơn.', love: 'Hạnh phúc và sự viên mãn trong tình cảm.', career: 'Đạt được điều mong muốn, hài lòng với thành quả.' },
  { n: 10, name: 'Ten of Cups', nameVi: 'Mười Cốc', emblem: '🌈', kw: ['hạnh phúc viên mãn', 'gia đình', 'hòa thuận', 'tình yêu trọn vẹn'], kwR: ['bất hòa gia đình', 'giá trị lệch lạc', 'vỡ mộng'], up: 'Hạnh phúc trọn vẹn trong tình yêu và gia đình. Sự hòa thuận và viên mãn về mặt cảm xúc.', rev: 'Có rạn nứt trong gia đình hoặc khoảng cách giữa lý tưởng và thực tế.', love: 'Tình yêu viên mãn, hướng tới mái ấm bền lâu.', career: 'Sự cân bằng giữa công việc và hạnh phúc cá nhân.' },
  { n: 11, name: 'Page of Cups', nameVi: 'Hoàng Tử Cốc', emblem: '🧒', kw: ['nhạy cảm', 'sáng tạo', 'tin nhắn tình cảm', 'mơ mộng'], kwR: ['cảm xúc non nớt', 'thất vọng', 'trốn tránh'], up: 'Một trái tim nhạy cảm và giàu trí tưởng tượng. Tin vui về tình cảm hoặc nguồn cảm hứng mới.', rev: 'Sự non nớt trong cảm xúc hoặc một tin tức gây thất vọng nhẹ.', love: 'Một lời tỏ tình dịu dàng hoặc khởi đầu ngọt ngào.', career: 'Ý tưởng sáng tạo, trực giác dẫn lối.' },
  { n: 12, name: 'Knight of Cups', nameVi: 'Hiệp Sĩ Cốc', emblem: '🐎', kw: ['lãng mạn', 'lý tưởng', 'theo đuổi trái tim', 'quyến rũ'], kwR: ['mơ mộng hão', 'thất thường', 'không thực tế'], up: 'Người lãng mạn theo đuổi trái tim, mang đến lời mời hoặc đề nghị đầy cảm xúc. Hãy đón nhận.', rev: 'Lời hứa hoa mỹ nhưng thiếu thực tế; coi chừng sự thất thường.', love: 'Một người lãng mạn, ngọt ngào xuất hiện.', career: 'Theo đuổi đam mê sáng tạo bằng cả trái tim.' },
  { n: 13, name: 'Queen of Cups', nameVi: 'Hoàng Hậu Cốc', emblem: '👸', kw: ['thấu cảm', 'dịu dàng', 'trực giác', 'chăm sóc'], kwR: ['quá nhạy cảm', 'phụ thuộc cảm xúc', 'kiệt sức tinh thần'], up: 'Sự dịu dàng, thấu cảm và trí tuệ cảm xúc sâu sắc. Hãy tin vào trái tim và chăm sóc người khác bằng tình yêu.', rev: 'Bạn có thể đang quá nhạy cảm hoặc đánh mất ranh giới cảm xúc.', love: 'Yêu thương sâu sắc, đầy thấu hiểu và bao dung.', career: 'Làm việc bằng trực giác và sự đồng cảm.' },
  { n: 14, name: 'King of Cups', nameVi: 'Đức Vua Cốc', emblem: '🤴', kw: ['điềm tĩnh', 'làm chủ cảm xúc', 'bao dung', 'khôn ngoan'], kwR: ['kìm nén', 'thao túng cảm xúc', 'ủ rũ'], up: 'Bậc thầy cân bằng cảm xúc — điềm tĩnh, bao dung và khôn ngoan giữa sóng gió. Hãy dẫn dắt bằng sự thấu hiểu.', rev: 'Cảm xúc bị đè nén hoặc dùng để thao túng; cần thành thật với chính mình.', love: 'Một người chín chắn, ấm áp và đáng tin.', career: 'Lãnh đạo điềm tĩnh, xử lý khéo léo mọi mâu thuẫn.' },
]

const swordsSeed: MinorSeed[] = [
  { n: 1, name: 'Ace of Swords', nameVi: 'Ách Kiếm', emblem: '⚔️', kw: ['sáng tỏ', 'sự thật', 'ý tưởng đột phá', 'quyết đoán'], kwR: ['rối trí', 'thông tin sai', 'thiếu sáng suốt'], up: 'Một khoảnh khắc sáng tỏ và sự thật được nhìn nhận rõ ràng. Tư duy sắc bén mở ra hướng đi mới.', rev: 'Suy nghĩ rối ren hoặc thông tin chưa chính xác làm mờ phán đoán.', love: 'Một cuộc trò chuyện thẳng thắn làm sáng tỏ mọi việc.', career: 'Ý tưởng đột phá, quyết định dứt khoát.' },
  { n: 2, name: 'Two of Swords', nameVi: 'Hai Kiếm', emblem: '⚖️', kw: ['bế tắc', 'do dự', 'né tránh', 'cân nhắc'], kwR: ['quyết định', 'thoát bế tắc', 'sự thật phơi bày'], up: 'Bạn đang né tránh một quyết định khó khăn, bịt mắt trước sự thật. Hãy gỡ bỏ tấm khăn che.', rev: 'Bế tắc được tháo gỡ; bạn buộc phải đối diện và lựa chọn.', love: 'Lưỡng lự trong tình cảm; cần đối diện cảm xúc thật.', career: 'Một quyết định khó bị trì hoãn; cần thông tin để chọn.' },
  { n: 3, name: 'Three of Swords', nameVi: 'Ba Kiếm', emblem: '💔', kw: ['đau lòng', 'chia ly', 'tổn thương', 'sự thật phũ phàng'], kwR: ['chữa lành', 'tha thứ', 'vượt qua nỗi đau'], up: 'Nỗi đau từ sự thật hoặc chia ly. Tổn thương là thật, nhưng nó cũng là khởi đầu của chữa lành.', rev: 'Bạn đang dần hồi phục sau tổn thương và học cách buông bỏ.', love: 'Đau lòng, hiểu lầm hoặc chia tay; cần thời gian.', career: 'Lời phê bình hoặc thất vọng; rút ra bài học.' },
  { n: 4, name: 'Four of Swords', nameVi: 'Bốn Kiếm', emblem: '🛌', kw: ['nghỉ ngơi', 'hồi phục', 'tĩnh tâm', 'tạm dừng'], kwR: ['kiệt sức', 'trì trệ', 'cần hành động'], up: 'Đã đến lúc nghỉ ngơi và phục hồi năng lượng. Sự tĩnh lặng giúp bạn lấy lại sức mạnh.', rev: 'Bạn cần nghỉ ngơi nhưng đang cố gắng quá sức, hoặc đã đến lúc trở lại.', love: 'Cần khoảng lặng để hồi phục tình cảm.', career: 'Tạm nghỉ để nạp lại năng lượng trước khi bứt phá.' },
  { n: 5, name: 'Five of Swords', nameVi: 'Năm Kiếm', emblem: '🗡️', kw: ['xung đột', 'thắng bằng mọi giá', 'bất hòa', 'thua thiệt'], kwR: ['hòa giải', 'buông bỏ hận thù', 'rút lui'], up: 'Một chiến thắng để lại nhiều mất mát, hoặc xung đột mà không ai thật sự thắng. Cân nhắc cái giá phải trả.', rev: 'Bạn sẵn sàng làm lành và buông bỏ những tranh chấp vô nghĩa.', love: 'Cãi vã gây tổn thương; cần hạ cái tôi.', career: 'Cạnh tranh không lành mạnh; chọn trận chiến đáng giá.' },
  { n: 6, name: 'Six of Swords', nameVi: 'Sáu Kiếm', emblem: '🛶', kw: ['chuyển tiếp', 'rời khó khăn', 'hồi phục', 'tiến về phía trước'], kwR: ['mắc kẹt', 'kháng cự chuyển đổi', 'mang theo gánh nặng'], up: 'Bạn đang rời khỏi giai đoạn khó khăn để đến vùng nước êm hơn. Sự chuyển tiếp dần ổn định.', rev: 'Bạn khó dứt khỏi quá khứ hoặc còn mang theo nhiều tổn thương.', love: 'Vượt qua giai đoạn khó, hướng tới bình yên.', career: 'Một sự chuyển đổi cần thiết, di chuyển hoặc thay đổi.' },
  { n: 7, name: 'Seven of Swords', nameVi: 'Bảy Kiếm', emblem: '🕵️', kw: ['mưu lược', 'lén lút', 'chiến thuật', 'tự bảo vệ'], kwR: ['thú nhận', 'bị phơi bày', 'lương tâm cắn rứt'], up: 'Cần khéo léo và chiến lược, nhưng coi chừng sự lừa dối — của bạn hoặc người khác.', rev: 'Sự thật bị che giấu dần lộ ra; đã đến lúc thành thật.', love: 'Coi chừng sự thiếu trung thực hoặc bí mật.', career: 'Hành động khôn khéo, nhưng giữ sự chính trực.' },
  { n: 8, name: 'Eight of Swords', nameVi: 'Tám Kiếm', emblem: '🪤', kw: ['mắc kẹt', 'tự giới hạn', 'sợ hãi', 'bất lực'], kwR: ['giải thoát', 'tìm lối ra', 'lấy lại sức mạnh'], up: 'Bạn cảm thấy bị mắc kẹt, nhưng phần lớn rào cản nằm trong tâm trí. Lối thoát luôn có nếu bạn dám nhìn.', rev: 'Bạn đang nhận ra mình tự do hơn mình tưởng và tìm được lối ra.', love: 'Cảm giác bị trói buộc; nhìn lại để tìm tự do.', career: 'Tự ti cản trở bạn; rào cản nằm ở suy nghĩ.' },
  { n: 9, name: 'Nine of Swords', nameVi: 'Chín Kiếm', emblem: '😰', kw: ['lo âu', 'mất ngủ', 'sợ hãi', 'ám ảnh'], kwR: ['vơi bớt lo lắng', 'tìm sự giúp đỡ', 'hy vọng trở lại'], up: 'Những lo âu và nỗi sợ đang đè nặng tâm trí, thường lớn hơn thực tế. Hãy chia sẻ để nhẹ lòng.', rev: 'Nỗi lo dần được tháo gỡ; ánh sáng hy vọng quay lại.', love: 'Lo lắng thái quá; hãy nói ra thay vì giày vò.', career: 'Căng thẳng, áp lực tinh thần; tìm sự hỗ trợ.' },
  { n: 10, name: 'Ten of Swords', nameVi: 'Mười Kiếm', emblem: '🌑', kw: ['kết thúc đau đớn', 'chạm đáy', 'phản bội', 'buông bỏ'], kwR: ['hồi phục', 'điều tồi tệ đã qua', 'tái sinh'], up: 'Một kết thúc đau đớn nhưng dứt khoát. Đã chạm đáy nghĩa là chỉ còn đường đi lên.', rev: 'Điều tồi tệ nhất đã qua; bạn đang trên đường hồi phục.', love: 'Một mối quan hệ kết thúc; bình minh mới đang chờ.', career: 'Kết thúc một giai đoạn khó khăn; khởi đầu lại.' },
  { n: 11, name: 'Page of Swords', nameVi: 'Hoàng Tử Kiếm', emblem: '🧒', kw: ['tò mò', 'tư duy sắc', 'cảnh giác', 'ý tưởng mới'], kwR: ['nói nhiều', 'tọc mạch', 'thiếu chín chắn'], up: 'Trí tò mò và tinh thần ham học hỏi. Một ý tưởng mới hoặc tin tức cần được tìm hiểu kỹ.', rev: 'Coi chừng lời nói thiếu suy nghĩ hoặc thông tin chưa kiểm chứng.', love: 'Trò chuyện cởi mở nhưng tránh nói lời tổn thương.', career: 'Học hỏi nhanh, tư duy phân tích sắc bén.' },
  { n: 12, name: 'Knight of Swords', nameVi: 'Hiệp Sĩ Kiếm', emblem: '🐎', kw: ['quyết liệt', 'tham vọng', 'hành động nhanh', 'thẳng thắn'], kwR: ['hấp tấp', 'nóng vội', 'thiếu cân nhắc'], up: 'Lao về mục tiêu với quyết tâm và lý lẽ sắc bén. Hành động nhanh và dứt khoát.', rev: 'Sự vội vàng và thiếu suy xét có thể gây hậu quả; chậm lại một nhịp.', love: 'Theo đuổi mạnh mẽ nhưng coi chừng thiếu tinh tế.', career: 'Tiến nhanh nhờ quyết đoán; cân nhắc rủi ro.' },
  { n: 13, name: 'Queen of Swords', nameVi: 'Hoàng Hậu Kiếm', emblem: '👸', kw: ['minh mẫn', 'độc lập', 'thẳng thắn', 'công tâm'], kwR: ['lạnh lùng', 'cay nghiệt', 'cô lập'], up: 'Trí tuệ sắc bén, sự độc lập và công bằng. Bạn nhìn thấu sự thật và nói lời chân thật.', rev: 'Sự lạnh lùng hoặc cay nghiệt có thể đẩy người khác ra xa.', love: 'Cần sự trung thực và tôn trọng ranh giới.', career: 'Quyết định sáng suốt, công tâm và rõ ràng.' },
  { n: 14, name: 'King of Swords', nameVi: 'Đức Vua Kiếm', emblem: '🤴', kw: ['lý trí', 'quyền uy', 'công bằng', 'kỷ luật tư duy'], kwR: ['độc đoán', 'lạnh lùng', 'lạm dụng lý lẽ'], up: 'Bậc thầy của lý trí và sự công bằng. Hãy quyết định dựa trên logic, đạo đức và sự thật.', rev: 'Lý lẽ bị dùng để áp đặt hoặc thiếu lòng trắc ẩn.', love: 'Cần giao tiếp lý trí nhưng đừng quên trái tim.', career: 'Lãnh đạo bằng trí tuệ, nguyên tắc và sự công minh.' },
]

const pentaclesSeed: MinorSeed[] = [
  { n: 1, name: 'Ace of Pentacles', nameVi: 'Ách Tiền', emblem: '🪙', kw: ['cơ hội', 'thịnh vượng', 'khởi đầu vật chất', 'nền tảng'], kwR: ['cơ hội bị lỡ', 'thiếu kế hoạch', 'bất ổn tài chính'], up: 'Một cơ hội mới về tài chính, công việc hay sức khỏe. Hạt giống của sự thịnh vượng đã được gieo.', rev: 'Cơ hội bị bỏ lỡ hoặc kế hoạch tài chính chưa vững.', love: 'Một khởi đầu ổn định, thực tế và bền vững.', career: 'Cơ hội việc làm hoặc khoản đầu tư đầy hứa hẹn.' },
  { n: 2, name: 'Two of Pentacles', nameVi: 'Hai Tiền', emblem: '🤹', kw: ['cân bằng', 'linh hoạt', 'xoay xở', 'ưu tiên'], kwR: ['quá tải', 'mất cân bằng', 'lộn xộn'], up: 'Bạn đang khéo léo cân bằng nhiều việc cùng lúc. Sự linh hoạt giúp bạn xoay xở tốt.', rev: 'Bạn đang ôm đồm quá nhiều và mất cân bằng; cần ưu tiên lại.', love: 'Cân bằng giữa tình cảm và các trách nhiệm khác.', career: 'Quản lý nhiều việc; giữ sự linh hoạt và ưu tiên.' },
  { n: 3, name: 'Three of Pentacles', nameVi: 'Ba Tiền', emblem: '🛠️', kw: ['hợp tác', 'kỹ năng', 'xây dựng', 'học hỏi'], kwR: ['thiếu phối hợp', 'làm ẩu', 'bất đồng'], up: 'Thành quả đến từ sự hợp tác và phối hợp kỹ năng. Tay nghề của bạn được công nhận.', rev: 'Thiếu sự phối hợp hoặc chất lượng công việc chưa đạt.', love: 'Cùng nhau xây dựng, lắng nghe và phối hợp.', career: 'Làm việc nhóm hiệu quả; tay nghề được trọng dụng.' },
  { n: 4, name: 'Four of Pentacles', nameVi: 'Bốn Tiền', emblem: '🔒', kw: ['giữ gìn', 'an toàn', 'tiết kiệm', 'kiểm soát'], kwR: ['keo kiệt', 'bám víu', 'sợ mất mát', 'cởi mở hơn'], up: 'Bạn coi trọng sự an toàn và giữ gìn những gì mình có. Cẩn thận đừng để nó thành bám víu.', rev: 'Sự keo kiệt hoặc bám víu thái quá; hãy học cách buông tay đúng lúc.', love: 'Coi chừng sự kiểm soát hoặc khép kín cảm xúc.', career: 'Quản lý tài chính chặt chẽ; tránh quá bảo thủ.' },
  { n: 5, name: 'Five of Pentacles', nameVi: 'Năm Tiền', emblem: '❄️', kw: ['khó khăn', 'thiếu thốn', 'cô đơn', 'lo lắng'], kwR: ['hồi phục', 'tìm được hỗ trợ', 'vượt qua khốn khó'], up: 'Một giai đoạn khó khăn về vật chất hoặc cảm giác bị bỏ rơi. Hãy nhớ rằng sự giúp đỡ vẫn ở gần.', rev: 'Bạn đang vượt qua giai đoạn khó khăn và tìm lại sự ổn định.', love: 'Cảm giác bị bỏ rơi; hãy mở lòng đón nhận hỗ trợ.', career: 'Khó khăn tài chính tạm thời; đừng ngại tìm trợ giúp.' },
  { n: 6, name: 'Six of Pentacles', nameVi: 'Sáu Tiền', emblem: '🤝', kw: ['cho và nhận', 'hào phóng', 'sẻ chia', 'cân bằng'], kwR: ['bất công', 'cho có điều kiện', 'lệ thuộc'], up: 'Sự cân bằng giữa cho và nhận. Lòng hào phóng được đáp lại; giúp đỡ và được giúp đỡ.', rev: 'Mối quan hệ cho–nhận mất cân bằng hoặc có điều kiện ràng buộc.', love: 'Sự sẻ chia công bằng nuôi dưỡng tình cảm.', career: 'Được hỗ trợ tài chính hoặc cơ hội đáp đền.' },
  { n: 7, name: 'Seven of Pentacles', nameVi: 'Bảy Tiền', emblem: '🌱', kw: ['kiên nhẫn', 'đầu tư dài hạn', 'đánh giá', 'gặt hái'], kwR: ['thiếu kiên nhẫn', 'nỗ lực phí hoài', 'sốt ruột'], up: 'Bạn dừng lại để đánh giá thành quả của quá trình vun trồng. Kiên nhẫn rồi sẽ được đền đáp.', rev: 'Cảm giác sốt ruột vì kết quả đến chậm; xem lại liệu có đáng đầu tư tiếp.', love: 'Mối quan hệ cần thời gian vun đắp mới đơm hoa.', career: 'Đầu tư dài hạn; kiên trì sẽ gặt hái.' },
  { n: 8, name: 'Eight of Pentacles', nameVi: 'Tám Tiền', emblem: '🔨', kw: ['chăm chỉ', 'rèn luyện', 'tỉ mỉ', 'thành thạo'], kwR: ['cẩu thả', 'lười biếng', 'thiếu động lực'], up: 'Sự cần mẫn và rèn luyện tỉ mỉ đưa bạn đến tay nghề tinh thông. Tập trung trau dồi kỹ năng.', rev: 'Thiếu động lực hoặc làm việc qua loa; chất lượng đang giảm sút.', love: 'Đầu tư công sức vun đắp mối quan hệ.', career: 'Nâng cao kỹ năng, chăm chỉ rèn nghề.' },
  { n: 9, name: 'Nine of Pentacles', nameVi: 'Chín Tiền', emblem: '🍇', kw: ['sung túc', 'tự lập', 'tận hưởng', 'thành quả'], kwR: ['lệ thuộc', 'chi tiêu quá đà', 'bất an'], up: 'Bạn tận hưởng thành quả của sự tự lập và nỗ lực. Sự sung túc và an nhàn xứng đáng.', rev: 'Sự lệ thuộc tài chính hoặc chi tiêu thiếu kiểm soát.', love: 'Yêu bản thân và độc lập trước khi gắn bó.', career: 'Thành công tự thân, hưởng quả ngọt.' },
  { n: 10, name: 'Ten of Pentacles', nameVi: 'Mười Tiền', emblem: '🏛️', kw: ['thịnh vượng bền vững', 'gia đình', 'di sản', 'ổn định lâu dài'], kwR: ['rắc rối tài chính gia đình', 'thiếu ổn định', 'mâu thuẫn thừa kế'], up: 'Sự thịnh vượng bền vững và an khang lâu dài, thường gắn với gia đình và di sản. Nền móng vững chắc.', rev: 'Có bất ổn về tài chính gia đình hoặc tranh chấp lợi ích.', love: 'Tình cảm hướng tới sự ổn định gia đình lâu dài.', career: 'Thành công bền vững, tài sản tích lũy lâu dài.' },
  { n: 11, name: 'Page of Pentacles', nameVi: 'Hoàng Tử Tiền', emblem: '🧒', kw: ['học hỏi', 'kế hoạch', 'cơ hội mới', 'thực tế'], kwR: ['trì hoãn', 'thiếu tập trung', 'mơ mộng viển vông'], up: 'Tinh thần ham học và lên kế hoạch thực tế. Một cơ hội học tập hay khởi nghiệp đang đến.', rev: 'Sự trì hoãn hoặc thiếu cam kết với mục tiêu thực tế.', love: 'Một khởi đầu chậm mà chắc, đầy chân thành.', career: 'Cơ hội học hỏi, đặt nền cho mục tiêu dài hạn.' },
  { n: 12, name: 'Knight of Pentacles', nameVi: 'Hiệp Sĩ Tiền', emblem: '🐎', kw: ['cần cù', 'đáng tin', 'kiên trì', 'thực tế'], kwR: ['trì trệ', 'bảo thủ', 'nhàm chán'], up: 'Sự cần cù, đáng tin và kiên định. Tiến chậm mà chắc, hoàn thành mọi việc đến nơi đến chốn.', rev: 'Quá thận trọng dẫn đến trì trệ hoặc thiếu linh hoạt.', love: 'Một người đáng tin, chung thủy nhưng cần chút lãng mạn.', career: 'Bền bỉ, trách nhiệm; tiến bộ đều đặn.' },
  { n: 13, name: 'Queen of Pentacles', nameVi: 'Hoàng Hậu Tiền', emblem: '👸', kw: ['chu toàn', 'ấm áp', 'thực tế', 'nuôi dưỡng'], kwR: ['ôm đồm', 'bỏ bê bản thân', 'vật chất hóa'], up: 'Sự chu toàn, ấm áp và thực tế. Bạn chăm lo cho mọi người mà vẫn vững vàng về vật chất.', rev: 'Bạn đang ôm đồm quá nhiều và quên chăm sóc chính mình.', love: 'Yêu thương ấm áp, thiết thực và chu đáo.', career: 'Cân bằng tốt giữa sự nghiệp và chăm sóc gia đình.' },
  { n: 14, name: 'King of Pentacles', nameVi: 'Đức Vua Tiền', emblem: '🤴', kw: ['thịnh vượng', 'vững vàng', 'lãnh đạo', 'an toàn'], kwR: ['tham lam', 'cứng nhắc', 'ám ảnh vật chất'], up: 'Đỉnh cao của sự thịnh vượng và ổn định. Người lãnh đạo vững vàng, hào phóng và đáng tin về tài chính.', rev: 'Sự tham lam hoặc quá xem trọng vật chất làm lu mờ giá trị khác.', love: 'Một người chững chạc, mang lại sự an toàn.', career: 'Thành công tài chính lớn, lãnh đạo vững vàng.' },
]

function buildMinor(suit: Suit, seeds: MinorSeed[]): TarotCard[] {
  const meta = SUIT_META[suit]
  return seeds.map((s) => ({
    id: `${suit}-${s.n}`,
    name: s.name,
    nameVi: s.nameVi,
    arcana: 'minor' as const,
    suit,
    number: s.n,
    element: meta.element,
    emblem: s.emblem,
    keywords: s.kw,
    keywordsRev: s.kwR,
    upright: s.up,
    reversed: s.rev,
    love: s.love,
    career: s.career,
  }))
}

export const DECK: TarotCard[] = [
  ...major,
  ...buildMinor('wands', wandsSeed),
  ...buildMinor('cups', cupsSeed),
  ...buildMinor('swords', swordsSeed),
  ...buildMinor('pentacles', pentaclesSeed),
]

/** Nhãn hiển thị thứ hạng của lá Ẩn Phụ (Ách, 2..10, Hoàng Tử, ...) */
export function rankLabel(card: TarotCard): string {
  if (card.arcana === 'major') return roman(card.number)
  return RANK_VI[card.number] ?? String(card.number)
}
