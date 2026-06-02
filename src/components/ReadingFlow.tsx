import { useState } from 'react'
import { SPREADS, type Spread } from '../data/spreads'
import { freshDeck, makeRng, randomSeed, riffleShuffle, yesNoVerdict, type DrawnCard } from '../lib/shuffle'
import { saveReading, type ReadingRecord } from '../lib/storage'
import { SUIT_META } from '../data/cards'
import { FlipCard } from './FlipCard'
import { CardFace } from './Card'
import { CopyResult } from './CopyResult'
import { buildGeminiPrompt } from '../lib/share'

type Stage = 'select' | 'shuffle' | 'pick' | 'result'

/** Số lượt xào tối thiểu trước khi được rút (một riffle chưa trộn đều). */
const MIN_SHUFFLES = 3

export function ReadingFlow() {
  const [stage, setStage] = useState<Stage>('select')
  const [spread, setSpread] = useState<Spread>(SPREADS[0])
  const [question, setQuestion] = useState('')
  const [seed, setSeed] = useState(() => randomSeed())
  const [deck, setDeck] = useState<DrawnCard[]>(() => freshDeck(makeRng(randomSeed())))
  const [shuffleCount, setShuffleCount] = useState(0)
  const [shuffleNonce, setShuffleNonce] = useState(0)
  const [isShuffling, setIsShuffling] = useState(false)
  const [picked, setPicked] = useState<number[]>([])
  const [revealed, setRevealed] = useState<boolean[]>([])
  const [saved, setSaved] = useState(false)

  const need = spread.positions.length
  // các lá đã rút, theo đúng thứ tự vị trí của kiểu trải
  const drawn: DrawnCard[] = picked.map((i) => deck[i])

  function reset(toStage: Stage = 'select') {
    setPicked([])
    setRevealed([])
    setSaved(false)
    setStage(toStage)
  }

  function startShuffle() {
    const s = randomSeed()
    setSeed(s)
    setDeck(freshDeck(makeRng(s))) // bộ bài nguyên cây, sẽ được xào dần
    setShuffleCount(0)
    reset('shuffle')
  }

  function doShuffle() {
    // mỗi lần bấm = một lượt riffle, trộn tiếp lên thứ tự hiện tại (xào tích luỹ)
    setIsShuffling(true)
    const s = randomSeed()
    setSeed(s)
    setDeck((d) => riffleShuffle(d, makeRng(s)))
    setShuffleCount((c) => c + 1)
    setShuffleNonce((n) => n + 1)
    window.setTimeout(() => setIsShuffling(false), 1150)
  }

  function pickCard(i: number) {
    if (picked.includes(i) || picked.length >= need) return
    setPicked((p) => [...p, i])
  }

  function goResult() {
    setRevealed(new Array(need).fill(false))
    setStage('result')
  }

  function reveal(idx: number) {
    setRevealed((r) => r.map((v, i) => (i === idx ? true : v)))
  }

  function revealAll() {
    setRevealed(new Array(need).fill(true))
  }

  const allRevealed = revealed.length > 0 && revealed.every(Boolean)

  function persist() {
    if (saved) return
    const record: ReadingRecord = {
      id: `${Date.now()}-${seed}`,
      spreadId: spread.id,
      spreadName: spread.name,
      question: question.trim(),
      seed,
      draw: drawn.map((d) => ({ cardId: d.card.id, reversed: d.reversed })),
      createdAt: Date.now(),
    }
    saveReading(record)
    setSaved(true)
  }

  return (
    <div className="reading-flow">
      <Stepper stage={stage} />

      {stage === 'select' && (
        <section className="panel">
          <h2 className="section-title">Chọn kiểu trải bài</h2>
          <div className="spread-grid">
            {SPREADS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`spread-card ${spread.id === s.id ? 'selected' : ''}`}
                onClick={() => setSpread(s)}
              >
                <span className="spread-icon">{s.icon}</span>
                <span className="spread-name">{s.name}</span>
                <span className="spread-tag">{s.tagline}</span>
                <span className="spread-meta">
                  <span className="chip">{s.positions.length} lá</span>
                  <span className="chip subtle">{s.difficulty}</span>
                </span>
                <span className="spread-desc">{s.description}</span>
              </button>
            ))}
          </div>

          <div className="question-box">
            <label htmlFor="q">Câu hỏi của bạn <span className="muted">(không bắt buộc)</span></label>
            <input
              id="q"
              type="text"
              placeholder="Vd: Mình nên tập trung vào điều gì trong tháng này?"
              value={question}
              maxLength={140}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <p className="hint">
              Hãy hít thở sâu, giữ tâm trí tĩnh lặng và tập trung vào câu hỏi trong khi xào bài.
            </p>
          </div>

          <div className="actions center">
            <button type="button" className="btn primary lg" onClick={startShuffle}>
              Bắt đầu xào bài →
            </button>
          </div>
        </section>
      )}

      {stage === 'shuffle' && (
        <section className="panel center-col">
          <h2 className="section-title">Tập trung & xào bài</h2>
          {question.trim() && <p className="echo-question">“{question.trim()}”</p>}
          <p className="muted">
            Giữ câu hỏi trong tâm trí. Mỗi lần nhấn <b>Xào bài</b> là một lượt xóc thật, trộn tiếp lên lần trước —
            nên xào ít nhất 5–7 lần cho bài được trộn đều, rồi mới rút.
          </p>

          <div className="shuffle-counter">
            <span className="counter-pill">Đã xào: {shuffleCount} lần</span>
            <div className="shuffle-bar" aria-hidden="true">
              <span style={{ width: `${Math.min(100, (shuffleCount / 7) * 100)}%` }} />
            </div>
            <span className="muted small">
              {shuffleCount === 0
                ? 'Chưa xào'
                : shuffleCount < MIN_SHUFFLES
                  ? 'Cần xào thêm…'
                  : shuffleCount < 7
                    ? 'Đã ổn — xào thêm nếu muốn'
                    : 'Đã trộn rất kỹ ✓'}
            </span>
          </div>

          <div className={`shuffle-stage ${isShuffling ? 'is-shuffling' : ''}`}>
            <span className="magic-aura" aria-hidden="true" />
            <div className="deck-stack" key={shuffleNonce}>
              {Array.from({ length: 16 }, (_, i) => (
                <span
                  className="deck-card"
                  key={i}
                  style={{ ['--i' as string]: i, ['--half' as string]: i % 2 === 0 ? -1 : 1 }}
                />
              ))}
            </div>
            <span className="shuffle-sparks" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} style={{ ['--a' as string]: `${i * 30}deg`, ['--d' as string]: `${i * 0.05}s` }}>
                  ✦
                </span>
              ))}
            </span>
          </div>

          <div className="actions center">
            <button type="button" className="btn ghost" onClick={doShuffle}>
              🔀 Xào bài
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => setStage('pick')}
              disabled={shuffleCount < MIN_SHUFFLES}
              title={shuffleCount < MIN_SHUFFLES ? `Hãy xào ít nhất ${MIN_SHUFFLES} lần` : undefined}
            >
              Rút bài →
            </button>
          </div>
          <button type="button" className="link-back" onClick={() => reset('select')}>← Đổi kiểu trải</button>
        </section>
      )}

      {stage === 'pick' && (
        <section className="panel center-col">
          <h2 className="section-title">Chọn {need} lá bằng trực giác</h2>
          <p className="counter-pill">{picked.length}/{need} lá đã chọn</p>
          <div className="fan" style={{ ['--n' as string]: deck.length }}>
            {deck.map((d, i) => {
              const order = picked.indexOf(i)
              const isPicked = order !== -1
              return (
                <button
                  type="button"
                  key={d.card.id}
                  className={`fan-card ${isPicked ? 'picked' : ''}`}
                  style={{ ['--idx' as string]: i }}
                  onClick={() => pickCard(i)}
                  disabled={isPicked || picked.length >= need}
                  aria-label={`Lá thứ ${i + 1}`}
                >
                  <CardBackMini />
                  {isPicked && <span className="pick-order">{order + 1}</span>}
                </button>
              )
            })}
          </div>
          <div className="actions center">
            <button type="button" className="btn ghost" onClick={() => setPicked([])} disabled={!picked.length}>
              Chọn lại
            </button>
            <button type="button" className="btn primary" onClick={goResult} disabled={picked.length < need}>
              Lật & luận giải →
            </button>
          </div>
        </section>
      )}

      {stage === 'result' && (
        <ResultView
          spread={spread}
          drawn={drawn}
          revealed={revealed}
          question={question}
          allRevealed={allRevealed}
          saved={saved}
          onReveal={reveal}
          onRevealAll={revealAll}
          onSave={persist}
          onRestart={() => reset('select')}
        />
      )}
    </div>
  )
}

function CardBackMini() {
  return <span className="fan-back" aria-hidden="true">✦</span>
}

function Stepper({ stage }: { stage: Stage }) {
  const steps: { id: Stage; label: string }[] = [
    { id: 'select', label: 'Chọn trải bài' },
    { id: 'shuffle', label: 'Xào bài' },
    { id: 'pick', label: 'Rút bài' },
    { id: 'result', label: 'Luận giải' },
  ]
  const idx = steps.findIndex((s) => s.id === stage)
  return (
    <ol className="stepper">
      {steps.map((s, i) => (
        <li key={s.id} className={i === idx ? 'active' : i < idx ? 'done' : ''}>
          <span className="dot">{i < idx ? '✓' : i + 1}</span>
          <span className="step-label">{s.label}</span>
        </li>
      ))}
    </ol>
  )
}

function ResultView({
  spread, drawn, revealed, question, allRevealed, saved,
  onReveal, onRevealAll, onSave, onRestart,
}: {
  spread: Spread
  drawn: DrawnCard[]
  revealed: boolean[]
  question: string
  allRevealed: boolean
  saved: boolean
  onReveal: (i: number) => void
  onRevealAll: () => void
  onSave: () => void
  onRestart: () => void
}) {
  const yn = spread.id === 'yesno' && allRevealed ? yesNoVerdict(drawn) : null
  // chiều cao bàn trải co giãn theo số "hàng" của kiểu trải
  const ySpan = Math.max(...spread.positions.map((p) => p.y)) - Math.min(...spread.positions.map((p) => p.y))
  const boardHeight = ySpan < 10 ? 250 : ySpan < 50 ? 430 : 540
  return (
    <section className="panel">
      <h2 className="section-title">{spread.name}</h2>
      {question.trim() && <p className="echo-question">“{question.trim()}”</p>}

      <div className="board" style={{ height: boardHeight }}>
        {spread.positions.map((pos, i) => (
          <div
            key={i}
            className="board-slot"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: `translate(-50%,-50%) rotate(${pos.rotate ?? 0}deg)` }}
          >
            <FlipCard drawn={drawn[i]} revealed={revealed[i]} onClick={() => onReveal(i)} />
            <span className="slot-label">{pos.label}</span>
          </div>
        ))}
      </div>

      <div className="actions center">
        {!allRevealed && (
          <button type="button" className="btn ghost" onClick={onRevealAll}>Lật tất cả</button>
        )}
      </div>

      {yn && (
        <div className={`verdict verdict-${yn.verdict === 'Có' ? 'yes' : yn.verdict === 'Không' ? 'no' : 'maybe'}`}>
          <span className="verdict-word">{yn.verdict}</span>
          <span className="verdict-detail">{yn.upright} lá xuôi · {yn.reversed} lá ngược</span>
        </div>
      )}

      <div className="interp-list">
        {spread.positions.map((pos, i) => {
          if (!revealed[i]) return null
          const d = drawn[i]
          const meaning = d.reversed ? d.card.reversed : d.card.upright
          const kws = d.reversed ? d.card.keywordsRev : d.card.keywords
          return (
            <article className="interp" key={i}>
              <div className="interp-mini">
                <CardFace card={d.card} reversed={d.reversed} />
              </div>
              <div className="interp-body">
                <div className="interp-head">
                  <span className="pos-tag">{pos.label}</span>
                  <h3>
                    {d.card.nameVi} <span className="muted">· {d.card.name}</span>
                    <span className={`orient ${d.reversed ? 'rev' : 'up'}`}>{d.reversed ? 'Ngược' : 'Xuôi'}</span>
                  </h3>
                </div>
                <p className="pos-meaning">{pos.meaning}</p>
                <div className="kw-row">
                  {kws.map((k) => <span className="kw" key={k}>{k}</span>)}
                </div>
                <p className="interp-text">{meaning}</p>
                {d.card.suit && (
                  <p className="suit-note muted">
                    {SUIT_META[d.card.suit].emblem} Chất {SUIT_META[d.card.suit].nameVi} · Nguyên tố {SUIT_META[d.card.suit].element}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {allRevealed && (
        <>
          <CopyResult
            text={buildGeminiPrompt({
              spreadName: spread.name,
              question,
              items: spread.positions.map((pos, i) => ({
                posLabel: pos.label,
                posMeaning: pos.meaning,
                card: drawn[i].card,
                reversed: drawn[i].reversed,
              })),
            })}
          />
          <div className="actions center wrap">
            <button type="button" className="btn primary" onClick={onSave} disabled={saved}>
              {saved ? '✓ Đã lưu vào lịch sử' : '💾 Lưu lượt bói'}
            </button>
            <button type="button" className="btn ghost" onClick={onRestart}>Bói lại từ đầu</button>
          </div>
        </>
      )}
    </section>
  )
}
