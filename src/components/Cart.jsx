import { AnimatePresence, motion } from "framer-motion"
import { FaTimes, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"

export default function Cart({
  open,
  items,
  onClose,
  onInc,
  onDec,
  onRemove,
  onClear,
}) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0)

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.warn("🛒 Your cart is empty!")
      return
    }
    toast.success("✅ Checkout successful! Thank you for shopping with us.")
    onClear()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart Drawer */}
          <motion.aside
            className="drawer"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
          >
            {/* Header */}
            <div className="drawer-head">
              <h3>Your Cart</h3>
              <button className="icon" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            {/* Items */}
            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="empty">Your cart is empty.</div>
              ) : (
                items.map((it) => (
                  <div className="cart-item" key={it.id}>
                    <img src={it.image} alt={it.title} />
                    <div className="ci-main">
                      <div className="ci-title">{it.title}</div>
                      <div className="ci-price">
                        ₹{(it.price * it.qty).toLocaleString("en-IN")}
                      </div>
                      <div className="qty">
                        <button onClick={() => onDec(it.id)}>-</button>
                        <span>{it.qty}</span>
                        <button onClick={() => onInc(it.id)}>+</button>
                      </div>
                    </div>
                    <button className="trash" onClick={() => onRemove(it.id)}>
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="drawer-foot">
              <div className="total">
                Total: <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>
              <div className="foot-actions">
                <button className="btn-ghost" onClick={onClear}>
                  Clear
                </button>
                <button className="btn-primary" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
