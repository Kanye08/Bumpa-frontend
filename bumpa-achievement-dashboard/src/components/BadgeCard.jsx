export default function BadgeCard({ currentBadge, nextBadge, remaining, totalUnlocked }) {
  const maxForNext  = remaining + totalUnlocked
  const progress    = maxForNext > 0 ? Math.round((totalUnlocked / maxForNext) * 100) : 100
  const isMaxLevel  = nextBadge === 'None — max level reached!'

  const BADGE_ICONS = {
    Beginner : '🥉',
    Bronze   : '🥈',
    Silver   : '🥇',
    Gold     : '🏆',
    None     : '—',
  }

  return (
    <div className="badge-card">
      <div className="badge-card__header">
        <span className="badge-card__eyebrow">Current Badge</span>
      </div>

      <div className="badge-card__display">
        <span className="badge-card__icon">
          {BADGE_ICONS[currentBadge] ?? '🎖️'}
        </span>
        <div className="badge-card__info">
          <h2 className="badge-card__name">{currentBadge}</h2>
          {!isMaxLevel && (
            <p className="badge-card__next">
              Next: <strong>{nextBadge}</strong>
            </p>
          )}
          {isMaxLevel && (
            <p className="badge-card__maxed">🎉 Maximum level reached!</p>
          )}
        </div>
      </div>

      {!isMaxLevel && (
        <div className="badge-card__progress">
          <div className="progress-meta">
            <span>{totalUnlocked} achievements unlocked</span>
            <span>{remaining} more to next badge</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="progress-pct">{progress}%</div>
        </div>
      )}
    </div>
  )
}
