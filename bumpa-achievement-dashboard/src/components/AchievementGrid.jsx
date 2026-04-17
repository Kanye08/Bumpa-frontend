function AchievementChip({ name, unlocked }) {
  return (
    <div className={`ach-chip ${unlocked ? 'ach-chip--unlocked' : 'ach-chip--locked'}`}>
      <span className="ach-chip__icon">{unlocked ? '✓' : '🔒'}</span>
      <span className="ach-chip__name">{name}</span>
    </div>
  )
}

export default function AchievementGrid({ unlocked, nextAvailable }) {
  return (
    <div className="ach-grid-wrap">
      {/* Unlocked */}
      <section className="ach-section">
        <h3 className="ach-section__title">
          <span className="ach-section__badge ach-section__badge--green">
            {unlocked.length}
          </span>
          Unlocked Achievements
        </h3>

        {unlocked.length === 0 ? (
          <p className="ach-empty">
            No achievements yet — make your first purchase to get started! 🛒
          </p>
        ) : (
          <div className="ach-chips">
            {unlocked.map((name) => (
              <AchievementChip key={name} name={name} unlocked />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming */}
      {nextAvailable.length > 0 && (
        <section className="ach-section">
          <h3 className="ach-section__title">
            <span className="ach-section__badge ach-section__badge--grey">
              {nextAvailable.length}
            </span>
            Still to Unlock
          </h3>
          <div className="ach-chips">
            {nextAvailable.map((name) => (
              <AchievementChip key={name} name={name} unlocked={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
