import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'
import BadgeCard from '../components/BadgeCard'
import AchievementGrid from '../components/AchievementGrid'
import PurchaseSimulator from '../components/PurchaseSimulator'

export default function DashboardPage({ user, onLogout }) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  const fetchData = useCallback(async () => {
    try {
      const summary = await api.getAchievements(user.id)
      setData(summary)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user.id])

  useEffect(() => { fetchData() }, [fetchData])

  function handlePurchase(newSummary) {
    setData(newSummary)
  }

  return (
    <div className="page">
      {/* Top nav */}
      <nav className="navbar">
        <div className="navbar__brand">🏪 Bumpa Loyalty</div>
        <div className="navbar__right">
          <span className="navbar__user">👤 {user.name}</span>
          <button className="btn btn--ghost btn--sm" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="main__inner">
          <header className="page-header">
            <h1 className="page-header__title">Your Rewards</h1>
            <p className="page-header__sub">
              Keep shopping to unlock achievements and earn badges.
            </p>
          </header>

          {error && <div className="alert alert--error">{error}</div>}

          {loading && (
            <div className="skeleton-wrap">
              <div className="skeleton skeleton--tall" />
              <div className="skeleton" />
              <div className="skeleton" />
            </div>
          )}

          {data && !loading && (
            <div className="dashboard-layout">
              {/* Left column */}
              <div className="dashboard-layout__left">
                <BadgeCard
                  currentBadge={data.current_badge}
                  nextBadge={data.next_badge}
                  remaining={data.remaining_to_unlock_next_badge}
                  totalUnlocked={data.unlocked_achievements.length}
                />
                <PurchaseSimulator
                  userId={user.id}
                  onPurchase={handlePurchase}
                />
              </div>

              {/* Right column */}
              <div className="dashboard-layout__right">
                <AchievementGrid
                  unlocked={data.unlocked_achievements}
                  nextAvailable={data.next_available_achievements}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
