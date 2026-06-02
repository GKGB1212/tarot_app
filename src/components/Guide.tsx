import { SPREADS } from '../data/spreads'

/** Cửa sổ kiến thức nền về Tarot: bộ bài, cách xào/rút, và các kiểu trải. */
export function Guide({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal guide" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">×</button>
        <h2 className="section-title">Tarot là gì & cách bói</h2>

        <h3>🃏 Bộ bài 78 lá</h3>
        <p>
          Một bộ Tarot chuẩn (Rider–Waite–Smith) gồm <b>78 lá</b>, chia hai nhóm:
        </p>
        <ul>
          <li>
            <b>22 lá Ẩn Chính (Major Arcana)</b> — từ Gã Khờ (0) đến Thế Giới (XXI),
            kể về “Hành trình của Gã Khờ”, ứng với những bài học và bước ngoặt lớn của đời người.
          </li>
          <li>
            <b>56 lá Ẩn Phụ (Minor Arcana)</b> — chia thành 4 chất, mỗi chất 14 lá
            (Ách → 10 và 4 lá hình: Hoàng Tử, Hiệp Sĩ, Hoàng Hậu, Đức Vua):
            <ul>
              <li><b>Gậy 🔥 (Wands)</b> — Lửa: đam mê, hành động, sự nghiệp, sáng tạo.</li>
              <li><b>Cốc 🍷 (Cups)</b> — Nước: cảm xúc, tình cảm, các mối quan hệ.</li>
              <li><b>Kiếm ⚔️ (Swords)</b> — Khí: lý trí, tư duy, giao tiếp, xung đột.</li>
              <li><b>Tiền 🪙 (Pentacles)</b> — Đất: vật chất, tài chính, công việc, sức khỏe.</li>
            </ul>
          </li>
        </ul>

        <h3>🔀 Cách xào & rút bài</h3>
        <ol>
          <li><b>Tĩnh tâm & đặt câu hỏi.</b> Hít thở sâu, giữ câu hỏi rõ ràng trong đầu.</li>
          <li><b>Xào bài (shuffle).</b> Trộn cho tới khi bạn cảm thấy “đủ”. App dùng thuật toán
            Fisher–Yates cùng nguồn ngẫu nhiên của trình duyệt để mô phỏng việc xào thật.</li>
          <li><b>Lá xuôi / ngược (reversed).</b> Khi xào, mỗi lá có xác suất ~30% bị lật ngược.
            Lá xuôi mang nghĩa thuận; lá ngược thường là phiên bản bị cản trở, nội tâm hóa hoặc thái quá của lá đó.</li>
          <li><b>Rút bài.</b> Chọn số lá cần thiết bằng trực giác — lá đầu tiên ứng với vị trí đầu tiên của kiểu trải.</li>
          <li><b>Lật & luận giải.</b> Đọc từng lá theo vị trí của nó, rồi ghép lại thành câu chuyện tổng thể.</li>
        </ol>

        <h3>🂠 Các kiểu trải bài trong app</h3>
        <div className="guide-spreads">
          {SPREADS.map((s) => (
            <div className="guide-spread" key={s.id}>
              <span className="spread-icon">{s.icon}</span>
              <div>
                <b>{s.name}</b> <span className="chip subtle">{s.positions.length} lá · {s.difficulty}</span>
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="muted small">
          Tarot là công cụ để suy ngẫm và soi chiếu bản thân, không phải lời tiên tri tuyệt đối.
          Hãy dùng nó như một tấm gương gợi mở góc nhìn, còn quyết định luôn nằm ở bạn.
        </p>
      </div>
    </div>
  )
}
