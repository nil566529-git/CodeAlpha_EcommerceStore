import React, { useState } from 'react';
import Auth from './Auth';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('name'));
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState('');

  React.useEffect(() => {
    fetch('https://shopeasy-backend-2o41.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const logout = () => { localStorage.clear(); setUser(null); };
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const emojis = { 'Laptop': '💻', 'Headphones': '🎧', 'Smartphone': '📱' };

  if (!user) return <Auth onLogin={(name) => setUser(name)} />;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: '100vh', background: '#f0f2f8' }}>

      {/* Navbar */}
      <nav style={{
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        padding: '0 40px', height: '65px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ color: 'white', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Shop<span style={{ color: '#ffd700' }}>Easy</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)', borderRadius: '25px',
          padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>Search</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'white', fontSize: '14px', width: '200px'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Hi, {user}!</span>
          <button onClick={() => setShowCart(!showCart)} style={{
            background: '#ffd700', color: '#1a1a2e', border: 'none',
            padding: '9px 20px', borderRadius: '25px', cursor: 'pointer',
            fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            Cart
            {cart.length > 0 && (
              <span style={{
                background: '#e53e3e', color: 'white', borderRadius: '50%',
                width: '20px', height: '20px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '12px'
              }}>{cart.length}</span>
            )}
          </button>
          <button onClick={logout} style={{
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.3)', padding: '9px 18px',
            borderRadius: '25px', cursor: 'pointer', fontSize: '14px'
          }}>Logout</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 40px', textAlign: 'center', color: 'white'
      }}>
        <span style={{
          background: 'rgba(255,255,255,0.2)', padding: '6px 16px',
          borderRadius: '20px', fontSize: '13px', fontWeight: '600'
        }}>FREE SHIPPING ON ORDERS ABOVE RS.999</span>
        <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '20px 0 10px', lineHeight: 1.2 }}>
          Discover Amazing<br />
          <span style={{ color: '#ffd700' }}>Products</span>
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.85, marginBottom: '30px' }}>
          Shop the latest trends at unbeatable prices
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {[['10K+', 'Products'], ['50K+', 'Happy Customers'], ['99%', 'Satisfaction Rate']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#ffd700' }}>{n}</div>
              <div style={{ fontSize: '13px', opacity: 0.8 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

        {/* Cart */}
        {showCart && (
          <div style={{
            background: 'white', borderRadius: '20px', padding: '25px',
            marginBottom: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#1a1a2e', marginTop: 0, fontSize: '22px', fontWeight: '700' }}>
              Your Cart ({cart.length} items)
            </h2>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: '#8896ab' }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🛒</div>
                <p>Your cart is empty! Start shopping.</p>
              </div>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '15px 0', borderBottom: '1px solid #f0f2f8'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{
                        width: '45px', height: '45px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
                      }}>{emojis[item.name] || '📦'}</div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1a1a2e' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', color: '#8896ab' }}>{item.description}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontWeight: '700', color: '#667eea', fontSize: '18px' }}>Rs.{item.price}</span>
                      <button onClick={() => removeFromCart(index)} style={{
                        background: '#fff5f5', color: '#e53e3e', border: 'none',
                        borderRadius: '8px', width: '32px', height: '32px', cursor: 'pointer',
                        fontWeight: '700', fontSize: '16px'
                      }}>x</button>
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: '20px', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
                  borderRadius: '16px', padding: '20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Total Amount</div>
                    <div style={{ color: '#ffd700', fontSize: '28px', fontWeight: '800' }}>Rs.{totalPrice}</div>
                  </div>
                  <button style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white', border: 'none', padding: '14px 30px',
                    borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '16px'
                  }}>Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Products */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#1a1a2e', fontSize: '24px', fontWeight: '700' }}>
            Featured Products
            <span style={{ color: '#8896ab', fontSize: '15px', fontWeight: '400', marginLeft: '10px' }}>
              ({filtered.length} items)
            </span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
          {filtered.map(product => (
            <div key={product._id} style={{
              background: 'white', borderRadius: '20px', overflow: 'hidden',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)', transition: 'all 0.3s', cursor: 'pointer'
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'; }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '35px', textAlign: 'center', fontSize: '60px', position: 'relative'
              }}>
                {emojis[product.name] || '📦'}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  background: '#ffd700', color: '#1a1a2e', fontSize: '11px',
                  fontWeight: '700', padding: '4px 10px', borderRadius: '20px'
                }}>IN STOCK</div>
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 8px', color: '#1a1a2e', fontSize: '18px', fontWeight: '700' }}>{product.name}</h3>
                <p style={{ color: '#8896ab', fontSize: '14px', margin: '0 0 15px', lineHeight: 1.5 }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#8896ab', fontSize: '12px' }}>Price</div>
                    <div style={{ color: '#667eea', fontWeight: '800', fontSize: '22px' }}>Rs.{product.price}</div>
                  </div>
                  <button onClick={() => addToCart(product)} style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white', border: 'none', padding: '10px 20px',
                    borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px'
                  }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        color: 'white', textAlign: 'center', padding: '30px', marginTop: '60px'
      }}>
        <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
          Shop<span style={{ color: '#ffd700' }}>Easy</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>
          2026 ShopEasy. Built with love by Nilesh
        </p>
      </footer>
    </div>
  );
}

export default App;