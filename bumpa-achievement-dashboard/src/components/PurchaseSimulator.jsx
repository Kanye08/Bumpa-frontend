import { useState } from 'react'
import { api } from '../api/client'

export default function PurchaseSimulator({ userId, onPurchase }) {
  const [amount, setAmount]   = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg]         = useState(null)

  const PRESETS = [500, 1000, 5000, 10000]

  async function submit(e) {
    e.preventDefault()
    if (!amount || isNaN(amount)) return
    setLoading(true)
    setMsg(null)
    try {
      const data = await api.makePurchase(Number(amount))
      setMsg({
        type: 'success',
        text: `✓ Purchase of ₦${Number(amount).toLocaleString()} recorded!`,
      })
      setAmount('')
      onPurchase(data.summary)
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="simulator">
      <h3 className="simulator__title">Simulate a Purchase</h3>
      <p className="simulator__sub">
        Test the loyalty engine by recording a purchase against your account.
      </p>

      <div className="simulator__presets">
        {PRESETS.map((p) => (
          <button
            key={p}
            className="preset-btn"
            onClick={() => setAmount(String(p))}
            type="button"
          >
            ₦{p.toLocaleString()}
          </button>
        ))}
      </div>

      <form className="simulator__form" onSubmit={submit}>
        <div className="simulator__input-wrap">
          <span className="simulator__currency">₦</span>
          <input
            className="simulator__input"
            type="number"
            min="1"
            placeholder="Custom amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="btn btn--primary"
          type="submit"
          disabled={loading || !amount}
        >
          {loading ? 'Processing…' : 'Record Purchase'}
        </button>
      </form>

      {msg && (
        <p className={`simulator__msg simulator__msg--${msg.type}`}>
          {msg.text}
        </p>
      )}
    </div>
  )
}
