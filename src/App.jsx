import { useEffect, useMemo, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductModal from './components/ProductModal.jsx'
import Cart from './components/Cart.jsx'
import { PRODUCTS, CATEGORIES } from './data/products.js'
import { FaSearch } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('relevance')
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  })

  // 🔑 Track recently added items to prevent duplicate toasts in StrictMode
  const addedRef = useRef(new Set())

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const filtered = useMemo(() => {
    let items = PRODUCTS.slice()
    if (category !== 'All') items = items.filter(p => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      items = items.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') items.sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') items.sort((a,b) => b.price - a.price)
    if (sort === 'rating-desc') items.sort((a,b) => b.rating - a.rating)
    return items
  }, [query, category, sort])

  const openProduct = (p) => { setSelected(p); setModalOpen(true) }

  const addToCart = (p) => {
    setCart(prev => {
      const exists = prev.some(x => x.id === p.id)
      if (exists) {
        // increase qty
        return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x)
      } else {
        // prevent duplicate toast in StrictMode
        if (!addedRef.current.has(p.id)) {
          toast.success(`🛒 Added ${p.title} to cart`, { autoClose: 2000 })
          addedRef.current.add(p.id)
          setTimeout(() => addedRef.current.delete(p.id), 1000) // reset after 1s
        }
        return [...prev, { ...p, qty: 1 }]
      }
    })
  }

  const inc = (id) => {
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x))
  }

  const dec = (id) => {
    setCart(prev => prev.flatMap(x => {
      if (x.id === id) {
        return x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []
      }
      return [x]
    }))
  }

  const remove = (id) => {
    setCart(prev => prev.filter(x => x.id !== id))
  }

  const clear = () => {
    setCart([])
  }

  const checkout = () => {
    if (cart.length === 0) {
      toast.warn("⚠️ Your cart is empty")
      return
    }
    toast.success("✅ Checkout successful! Thank you for shopping with us.")
    setCart([])
    setCartOpen(false)
  }

  const heroVariants = { 
    hidden:{opacity:0,y:20}, 
    show:{opacity:1,y:0,transition:{type:'spring',stiffness:80,damping:14}} 
  }

  return (
    <div className="app">
      <Navbar cartCount={cart.reduce((n,i)=>n+i.qty,0)} onCartOpen={() => setCartOpen(true)} />

      {/* Hero / Banner */}
      <motion.section
        className="hero"
        initial="hidden"
        animate="show"
        variants={heroVariants}
      >
        <div className="hero-content">
          <h1>Big Deals. <span>Bold Colors.</span></h1>
          <p>Discover the latest gadgets with dazzling designs and delightful prices.</p>
        </div>
        <div className="hero-cta">
          <div className="search">
            <FaSearch />
            <input
              placeholder="Search for phones, laptops, audio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            <div className="pills">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`pill-btn ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >{c}</button>
              ))}
            </div>
            <select className="sort" value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Top Rated</option>
            </select>
          </div>
        </div>
      </motion.section>

      {/* Product Grid */}
      <section className="grid">
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onOpen={openProduct}
          />
        ))}
        {filtered.length === 0 && (
          <div className="empty-results">No products found. Try a different search or category.</div>
        )}
      </section>

      <ProductModal
        open={modalOpen}
        product={selected}
        onClose={() => setModalOpen(false)}
        onAdd={addToCart}
      />

      <Cart
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onClear={clear}
        onCheckout={checkout}
      />

      <footer className="footer">
        Built with ❤️ using React & Framer Motion.
      </footer>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  )
}
