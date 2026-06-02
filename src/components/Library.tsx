import { useMemo, useState } from 'react'
import { DECK, SUIT_META, rankLabel, type Suit, type TarotCard } from '../data/cards'
import { CardFace } from './Card'

type Filter = 'all' | 'major' | Suit

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'major', label: 'Ẩn Chính' },
  { id: 'wands', label: 'Gậy 🔥' },
  { id: 'cups', label: 'Cốc 🍷' },
  { id: 'swords', label: 'Kiếm ⚔️' },
  { id: 'pentacles', label: 'Tiền 🪙' },
]

export function Library() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<TarotCard | null>(null)

  const cards = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DECK.filter((c) => {
      const okFilter =
        filter === 'all' ||
        (filter === 'major' && c.arcana === 'major') ||
        c.suit === filter
      const okQuery =
        !q ||
        c.nameVi.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
      return okFilter && okQuery
    })
  }, [filter, query])

  return (
    <div className="library">
      <h2 className="section-title">Thư viện 78 lá bài</h2>
      <p className="muted center-text">Tra cứu ý nghĩa từng lá ở cả hai chiều xuôi và ngược.</p>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`filter-chip ${filter === f.id ? 'on' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        className="search"
        type="search"
        placeholder="Tìm theo tên hoặc từ khóa…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="lib-grid">
        {cards.map((c) => (
          <button key={c.id} type="button" className="lib-card" onClick={() => setActive(c)}>
            <CardFace card={c} />
          </button>
        ))}
        {cards.length === 0 && <p className="muted">Không tìm thấy lá nào phù hợp.</p>}
      </div>

      {active && <CardDetail card={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function CardDetail({ card, onClose }: { card: TarotCard; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card-detail" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">×</button>
        <div className="detail-art">
          <CardFace card={card} />
        </div>
        <div className="detail-body">
          <h3>{card.nameVi}</h3>
          <p className="detail-sub">
            {card.name} · {card.arcana === 'major' ? `Ẩn Chính ${rankLabel(card)}` : `${rankLabel(card)} bộ ${SUIT_META[card.suit!].nameVi}`}
            {card.element ? ` · ${card.element}` : ''}
          </p>

          <h4 className="up-h">▲ Xuôi</h4>
          <div className="kw-row">{card.keywords.map((k) => <span className="kw" key={k}>{k}</span>)}</div>
          <p>{card.upright}</p>

          <h4 className="rev-h">▼ Ngược</h4>
          <div className="kw-row">{card.keywordsRev.map((k) => <span className="kw rev" key={k}>{k}</span>)}</div>
          <p>{card.reversed}</p>

          <div className="detail-cols">
            <div>
              <h4>💞 Tình cảm</h4>
              <p>{card.love}</p>
            </div>
            <div>
              <h4>💼 Sự nghiệp</h4>
              <p>{card.career}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
