import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'

export default function Navbar({ cartCount, onCartOpen }) {
  const date = useMemo(() => new Date().toLocaleDateString(), [])
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="nav"
    >
      <div className="brand">
        <span className="brand-badge">Shoply</span>
        <span className="brand-sub">Deals of the day • {date}</span>
      </div>

      <div className="actions">
        <button className="cart-btn" onClick={onCartOpen}>
          <FaShoppingCart size={18} />
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </motion.nav>
  )
}
