import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

export default function ProductModal({ open, product, onClose, onAdd }) {
  return (
    <AnimatePresence>
      {open && product && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
          >
            <button className="modal-close" onClick={onClose}><FaTimes /></button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="modal-info">
                <h3>{product.title}</h3>
                <p className="modal-desc">{product.desc}</p>
                <div className="modal-price">₹{product.price.toLocaleString('en-IN')}</div>
                <div className="modal-actions">
                  <button className="btn-primary" onClick={() => { onAdd(product); onClose(); }}>
                    Add to Cart
                  </button>
                  <button className="btn-ghost" onClick={onClose}>Close</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
