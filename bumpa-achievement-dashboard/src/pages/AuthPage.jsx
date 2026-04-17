import { useState } from 'react'

export default function AuthPage({ onLogin, onRegister }) {
  const [mode, setMode]       = useState('login') // 'login' | 'register'
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await onLogin(form.email, form.password)
      } else {
        await onRegister(form.name, form.email, form.password)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Brand */}
        <div className="auth-brand">
          <span className="auth-logo">🏪</span>
          <h1 className="auth-title">Bumpa Loyalty</h1>
          <p className="auth-sub">Earn rewards with every purchase</p>
        </div>

        {/* Tab switcher */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => { setMode('login'); setError('') }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'auth-tab--active' : ''}`}
            onClick={() => { setMode('register'); setError('') }}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label className="field__label">Full Name</label>
              <input
                className="field__input"
                type="text"
                placeholder="Ada Okafor"
                value={form.name}
                onChange={set('name')}
                required
              />
            </div>
          )}

          <div className="field">
            <label className="field__label">Email Address</label>
            <input
              className="field__input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              required
            />
          </div>

          <div className="field">
            <label className="field__label">Password</label>
            <input
              className="field__input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              required
              minLength={8}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn--primary btn--full" type="submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-hint">
          {mode === 'login' ? (
            <>No account? <button className="link-btn" onClick={() => setMode('register')}>Sign up free</button></>
          ) : (
            <>Already a member? <button className="link-btn" onClick={() => setMode('login')}>Sign in</button></>
          )}
        </p>

        {/* Demo shortcut */}
        <div className="auth-demo">
          <p className="auth-demo__label">Demo credentials</p>
          <code className="auth-demo__creds">demo@bumpa.com / password</code>
        </div>
      </div>
    </div>
  )
}
