import { SUIT_META, rankLabel, type TarotCard } from '../data/cards'

const SUIT_COLORS: Record<string, { from: string; to: string; ink: string; glow: string }> = {
  fire: { from: '#3a1410', to: '#7c2d12', ink: '#fbbf24', glow: '#fb923c' },
  water: { from: '#0c1f3a', to: '#1e3a8a', ink: '#7dd3fc', glow: '#38bdf8' },
  air: { from: '#0f1c24', to: '#155e75', ink: '#a5f3fc', glow: '#22d3ee' },
  earth: { from: '#10240f', to: '#166534', ink: '#bbf7d0', glow: '#4ade80' },
  major: { from: '#1a1033', to: '#4c1d95', ink: '#fde68a', glow: '#c4b5fd' },
}

function palette(card: TarotCard) {
  if (card.arcana === 'major') return SUIT_COLORS.major
  return SUIT_COLORS[SUIT_META[card.suit!].theme]
}

/** Mặt trước của lá bài, vẽ hoàn toàn bằng SVG để không phụ thuộc ảnh ngoài. */
export function CardFace({ card, reversed = false }: { card: TarotCard; reversed?: boolean }) {
  const c = palette(card)
  const rank = rankLabel(card)
  const gid = `g-${card.id}`
  const suitName = card.arcana === 'major' ? 'Ẩn Chính' : SUIT_META[card.suit!].nameVi
  return (
    <svg className="card-art" viewBox="0 0 200 320" role="img" aria-label={card.nameVi}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </linearGradient>
        <radialGradient id={`${gid}-r`} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor={c.glow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={c.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="200" height="320" rx="14" fill={`url(#${gid})`} />
      <rect x="0" y="0" width="200" height="320" rx="14" fill={`url(#${gid}-r)`} />

      {/* khung viền trang trí */}
      <rect x="8" y="8" width="184" height="304" rx="10" fill="none" stroke={c.ink} strokeOpacity="0.55" strokeWidth="1.5" />
      <rect x="13" y="13" width="174" height="294" rx="8" fill="none" stroke={c.ink} strokeOpacity="0.25" strokeWidth="1" />

      {/* số/hạng ở hai góc */}
      <text x="22" y="34" fill={c.ink} fontSize="17" fontFamily="Cormorant Garamond, serif" fontWeight="700">{rank}</text>
      <text x="178" y="300" fill={c.ink} fontSize="17" fontFamily="Cormorant Garamond, serif" fontWeight="700" textAnchor="end" transform="rotate(180 178 295)">{rank}</text>

      {/* hoa văn các góc */}
      {[[24, 24], [176, 24], [24, 296], [176, 296]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={c.ink} fillOpacity="0.7" />
      ))}

      {/* biểu tượng trung tâm (xoay 180° nếu lá ngược) */}
      <g transform={reversed ? 'rotate(180 100 150)' : undefined}>
        <circle cx="100" cy="150" r="62" fill={c.glow} fillOpacity="0.08" stroke={c.ink} strokeOpacity="0.3" strokeWidth="1" />
        <text x="100" y="150" fontSize="62" textAnchor="middle" dominantBaseline="central">{card.emblem}</text>
      </g>

      {/* dải tên ở chân lá */}
      <text x="100" y="252" fill={c.ink} fontSize="16" fontFamily="Playfair Display, serif" fontWeight="600" textAnchor="middle" letterSpacing="0.5">{card.nameVi}</text>
      <text x="100" y="270" fill={c.ink} fillOpacity="0.6" fontSize="9.5" fontFamily="Cormorant Garamond, serif" textAnchor="middle" letterSpacing="1.5" style={{ textTransform: 'uppercase' }}>{card.name}</text>
      <text x="100" y="286" fill={c.ink} fillOpacity="0.45" fontSize="8" fontFamily="Cormorant Garamond, serif" textAnchor="middle" letterSpacing="2">{suitName}</text>
    </svg>
  )
}

/** Mặt lưng huyền bí, dùng chung cho mọi lá. */
export function CardBack() {
  return (
    <svg className="card-art" viewBox="0 0 200 320" role="img" aria-label="Mặt sau lá bài">
      <defs>
        <linearGradient id="back-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <radialGradient id="back-r" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="200" height="320" rx="14" fill="url(#back-g)" />
      <rect x="8" y="8" width="184" height="304" rx="10" fill="none" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="0" y="0" width="200" height="320" rx="14" fill="url(#back-r)" />
      {/* mạng lưới sao */}
      <g stroke="#ddd6fe" strokeOpacity="0.18" strokeWidth="0.6">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={20 + i * 20} y1="20" x2={20 + i * 20} y2="300" />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <line key={`h${i}`} x1="20" y1={20 + i * 20} x2="180" y2={20 + i * 20} />
        ))}
      </g>
      {/* mặt trăng & sao trung tâm */}
      <circle cx="100" cy="150" r="46" fill="none" stroke="#e9d5ff" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="100" cy="150" r="38" fill="none" stroke="#e9d5ff" strokeOpacity="0.3" strokeWidth="0.8" />
      <text x="100" y="152" fontSize="44" textAnchor="middle" dominantBaseline="central">🌙</text>
      {[ [100, 64], [100, 236], [40, 150], [160, 150] ].map(([x, y], i) => (
        <text key={i} x={x} y={y} fontSize="14" textAnchor="middle" dominantBaseline="central" opacity="0.7">✦</text>
      ))}
    </svg>
  )
}
