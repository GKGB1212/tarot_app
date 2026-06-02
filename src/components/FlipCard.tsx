import { CardFace, CardBack } from './Card'
import type { DrawnCard } from '../lib/shuffle'

/** Lá bài có thể lật 3D giữa mặt sau và mặt trước. */
export function FlipCard({
  drawn,
  revealed,
  reversedHint = true,
  onClick,
  className = '',
}: {
  drawn: DrawnCard
  revealed: boolean
  reversedHint?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      className={`flip-card ${revealed ? 'is-revealed' : ''} ${className}`}
      onClick={onClick}
      aria-label={revealed ? drawn.card.nameVi : 'Lá bài úp — nhấn để lật'}
    >
      <span className="flip-inner">
        <span className="flip-face flip-back">
          <CardBack />
        </span>
        <span className="flip-face flip-front">
          <CardFace card={drawn.card} reversed={reversedHint && drawn.reversed} />
          {revealed && drawn.reversed && <span className="rev-badge">ngược</span>}
        </span>
      </span>
    </button>
  )
}
