import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

export default function ProductCard({ item, onOpen }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      className="card"
      onClick={() => onOpen(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' ? onOpen(item) : null)}
    >
      <div className="card-img">
        <img src={item.image} alt={item.title} />
        <div className="pill">{item.category}</div>
      </div>
      <div className="card-body">
        <div className="card-title">{item.title}</div>
        <div className="rating"><FaStar /> {item.rating}</div>
        <div className="price">₹{item.price.toLocaleString('en-IN')}</div>
        <div className="cta">View details</div>
      </div>
    </motion.div>
  )
}
