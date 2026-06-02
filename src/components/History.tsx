import { useState } from 'react'
import { clearHistory, deleteReading, loadHistory, type ReadingRecord } from '../lib/storage'
import { DECK, SUIT_META } from '../data/cards'
import { getSpread } from '../data/spreads'
import { CardFace } from './Card'
import { CopyResult } from './CopyResult'
import { buildGeminiPrompt } from '../lib/share'

const cardById = new Map(DECK.map((c) => [c.id, c]))

export function History() {
  const [items, setItems] = useState<ReadingRecord[]>(() => loadHistory())
  const [active, setActive] = useState<ReadingRecord | null>(null)

  if (items.length === 0) {
    return (
      <div className="history empty">
        <h2 className="section-title">Lịch sử bói bài</h2>
        <p className="muted center-text">Chưa có lượt bói nào được lưu. Hãy thực hiện một lượt bói và nhấn “Lưu”.</p>
      </div>
    )
  }

  return (
    <div className="history">
      <div className="history-head">
        <h2 className="section-title">Lịch sử bói bài</h2>
        <button
          type="button"
          className="btn ghost sm"
          onClick={() => { clearHistory(); setItems([]) }}
        >
          Xóa tất cả
        </button>
      </div>

      <div className="history-list">
        {items.map((r) => {
          const spread = getSpread(r.spreadId)
          return (
            <article className="history-item" key={r.id}>
              <button type="button" className="history-open" onClick={() => setActive(r)}>
                <div className="history-meta">
                  <span className="history-spread">{spread?.icon} {r.spreadName}</span>
                  <time>{new Date(r.createdAt).toLocaleString('vi-VN')}</time>
                  {r.question && <p className="history-q">“{r.question}”</p>}
                </div>
                <div className="history-cards">
                  {r.draw.map((d, i) => {
                    const card = cardById.get(d.cardId)
                    if (!card) return null
                    return (
                      <div className="history-card" key={i} title={`${card.nameVi}${d.reversed ? ' (ngược)' : ''}`}>
                        <CardFace card={card} reversed={d.reversed} />
                      </div>
                    )
                  })}
                </div>
                <span className="history-hint">Bấm để xem luận giải →</span>
              </button>
              <button
                type="button"
                className="btn ghost sm history-del"
                onClick={() => setItems(deleteReading(r.id))}
              >
                Xóa
              </button>
            </article>
          )
        })}
      </div>

      {active && <ReadingDetail record={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function ReadingDetail({ record, onClose }: { record: ReadingRecord; onClose: () => void }) {
  const spread = getSpread(record.spreadId)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal reading-detail" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">×</button>
        <h2 className="section-title">{spread?.icon} {record.spreadName}</h2>
        <p className="detail-sub center-text">{new Date(record.createdAt).toLocaleString('vi-VN')}</p>
        {record.question && <p className="echo-question">“{record.question}”</p>}

        <CopyResult
          text={buildGeminiPrompt({
            spreadName: record.spreadName,
            question: record.question,
            items: record.draw
              .map((d, i) => {
                const card = cardById.get(d.cardId)
                if (!card) return null
                return {
                  posLabel: spread?.positions[i]?.label,
                  posMeaning: spread?.positions[i]?.meaning,
                  card,
                  reversed: d.reversed,
                }
              })
              .filter((x): x is NonNullable<typeof x> => x !== null),
          })}
        />

        <div className="interp-list">
          {record.draw.map((d, i) => {
            const card = cardById.get(d.cardId)
            if (!card) return null
            const pos = spread?.positions[i]
            const meaning = d.reversed ? card.reversed : card.upright
            const kws = d.reversed ? card.keywordsRev : card.keywords
            return (
              <article className="interp" key={i}>
                <div className="interp-mini">
                  <CardFace card={card} reversed={d.reversed} />
                </div>
                <div className="interp-body">
                  <div className="interp-head">
                    {pos && <span className="pos-tag">{pos.label}</span>}
                    <h3>
                      {card.nameVi} <span className="muted">· {card.name}</span>
                      <span className={`orient ${d.reversed ? 'rev' : 'up'}`}>{d.reversed ? 'Ngược' : 'Xuôi'}</span>
                    </h3>
                  </div>
                  {pos && <p className="pos-meaning">{pos.meaning}</p>}
                  <div className="kw-row">
                    {kws.map((k) => <span className="kw" key={k}>{k}</span>)}
                  </div>
                  <p className="interp-text">{meaning}</p>
                  {card.suit && (
                    <p className="suit-note muted">
                      {SUIT_META[card.suit].emblem} Chất {SUIT_META[card.suit].nameVi} · Nguyên tố {SUIT_META[card.suit].element}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
