# 🌙 Huyền Bài — Ứng dụng bói bài Tarot

Một ứng dụng Tarot tiếng Việt được chăm chút tỉ mỉ: đủ **78 lá** chuẩn Rider–Waite–Smith,
nhiều kiểu trải bài, xào & rút bài đúng nghi thức, luận giải xuôi/ngược chi tiết, giao diện huyền bí.

## ✨ Tính năng

- **78 lá bài** đầy đủ: 22 Ẩn Chính + 56 Ẩn Phụ (4 chất Gậy/Cốc/Kiếm/Tiền), kèm ý nghĩa
  xuôi & ngược, từ khóa, gợi ý tình cảm và sự nghiệp.
- **5 kiểu trải bài**: Một Lá (hôm nay), Ba Lá (Quá khứ–Hiện tại–Tương lai), Tình Yêu (5 lá),
  Có/Không (3 lá), và Thập Tự Celtic (10 lá).
- **Nghi thức bói thật**: xào bài bằng thuật toán Fisher–Yates với nguồn ngẫu nhiên của trình duyệt,
  xác suất ~30% mỗi lá bị lật **ngược**, và bước **tự chọn lá** từ quạt bài bằng trực giác.
- **Mặt bài tự sinh bằng SVG** — không phụ thuộc ảnh ngoài, tải tức thì, có hiệu ứng lật 3D.
- **Thư viện tra cứu** 78 lá với bộ lọc theo chất và tìm kiếm theo tên/từ khóa.
- **Lịch sử** các lượt bói lưu trong trình duyệt (localStorage).
- **Trang Tìm hiểu** giải thích bộ bài, cách xào/rút và từng kiểu trải.
- Giao diện tối huyền bí, nền trời sao, responsive cho cả điện thoại.

## 🚀 Chạy thử

```bash
npm install
npm run dev      # chạy môi trường phát triển
npm run build    # build bản production vào dist/
npm run preview  # xem thử bản đã build
```

Mở deep-link nhanh tới từng tab: `#library`, `#history`.

## 🗂 Cấu trúc

```
src/
  data/cards.ts      # 78 lá bài + ý nghĩa (nguồn dữ liệu chính)
  data/spreads.ts    # định nghĩa các kiểu trải bài + toạ độ vị trí
  lib/shuffle.ts     # xào bài Fisher–Yates, gán xuôi/ngược, suy luận Có/Không
  lib/storage.ts     # lưu/đọc lịch sử bằng localStorage
  components/        # Card (SVG), FlipCard, ReadingFlow, Library, History, Guide, Starfield
  App.tsx            # khung điều hướng các tab
```

> Tarot là tấm gương soi chiếu nội tâm để gợi mở góc nhìn, không phải lời tiên tri tuyệt đối.
> Quyết định luôn nằm ở bạn. 🔮
