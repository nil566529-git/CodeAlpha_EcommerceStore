import React, { useState } from 'react';
import Auth from './Auth';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('name'));

  React.useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!user) return <Auth onLogin={(name) => setUser(name)} />;

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1 style={{ background: '#333', color: 'white', padding: '15px', margin: 0 }}>
        🛒 My E-Commerce Store
        <span style={{ float: 'right', fontSize: '16px' }}>
          👋 {user} |
          <span onClick={logout} style={{ cursor: 'pointer', marginLeft: '8px' }}>Logout</span>
          | Cart: {cart.length} items
        </span>
      </h1>

      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product._id} style={{
            border: '1px solid #ddd', borderRadius: '8px',
            padding: '15px', width: '200px',
            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
          }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ color: 'green', fontWeight: 'bold' }}>₹{product.price}</p>
            <button onClick={() => addToCart(product)} style={{
              background: '#333', color: 'white', border: 'none',
              padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%'
            }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;