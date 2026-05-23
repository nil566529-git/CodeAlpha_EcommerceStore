import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';
    const body = isLogin ? { email, password } : { name, email, password };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.name);
      onLogin(data.name);
    } else {
      setMessage(data.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px', marginTop: '6px',
    border: '2px solid #e8ecf4', borderRadius: '12px',
    fontSize: '15px', boxSizing: 'border-box', outline: 'none',
    transition: 'border 0.3s', background: '#f8f9ff', color: '#333'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '80px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)', color: 'white',
            padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600'
          }}>NEW ARRIVALS EVERY WEEK</span>
        </div>
        <h1 style={{ color: 'white', fontSize: '52px', fontWeight: '800', lineHeight: 1.2, marginBottom: '20px' }}>
          Shop the<br />
          <span style={{ color: '#ffd700' }}>Latest Trends</span><br />
          Online
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.7 }}>
          Discover thousands of products at unbeatable prices. Fast delivery, easy returns, secure payments.
        </p>
        <div style={{ display: 'flex', gap: '30px' }}>
          {[['10K+', 'Products'], ['50K+', 'Customers'], ['99%', 'Satisfaction']].map(([num, label]) => (
            <div key={label}>
              <div style={{ color: '#ffd700', fontSize: '28px', fontWeight: '800' }}>{num}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {['Free shipping on orders above Rs.999', 'Easy 30-day returns', '100% secure payments', '24/7 customer support'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.9)' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#333', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={{
        width: '480px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px',
        background: 'white'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ textAlign: 'center', marginBottom: '35px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '28px', color: 'white', fontWeight: 'bold'
            }}>S</div>
            <h2 style={{ color: '#1a1a2e', fontSize: '28px', fontWeight: '700' }}>
              {isLogin ? 'Welcome back!' : 'Create account'}
            </h2>
            <p style={{ color: '#8896ab', marginTop: '8px', fontSize: '15px' }}>
              {isLogin ? 'Sign in to your ShopEasy account' : 'Join thousands of happy shoppers'}
            </p>
          </div>

          {/* Toggle */}
          <div style={{
            display: 'flex', background: '#f0f2f8', borderRadius: '12px',
            padding: '4px', marginBottom: '28px'
          }}>
            {['Login', 'Register'].map(tab => (
              <button key={tab} onClick={() => { setIsLogin(tab === 'Login'); setMessage(''); }} style={{
                flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer',
                fontWeight: '600', fontSize: '14px', transition: 'all 0.3s',
                background: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? 'white' : 'transparent',
                color: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? '#667eea' : '#8896ab',
                boxShadow: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register') ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
              }}>{tab}</button>
            ))}
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '600' }}>Full Name</label>
              <input placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '600' }}>Email Address</label>
            <input placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: '#4a5568', fontSize: '14px', fontWeight: '600' }}>Password</label>
            <input placeholder="Min. 6 characters" type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
          </div>

          {message && (
            <div style={{
              background: '#fff5f5', color: '#e53e3e', padding: '12px 16px',
              borderRadius: '10px', marginBottom: '20px', fontSize: '14px',
              border: '1px solid #fed7d7'
            }}>
              {message}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
            transition: 'all 0.3s'
          }}>
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '24px', color: '#8896ab', fontSize: '14px' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => { setIsLogin(!isLogin); setMessage(''); }} style={{
              color: '#667eea', cursor: 'pointer', fontWeight: '700'
            }}>
              {isLogin ? 'Sign up free' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;