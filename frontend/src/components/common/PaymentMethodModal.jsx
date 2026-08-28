import { CreditCard, Truck, X } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function PaymentMethodModal({ amount, onSelectCard, onSelectCod, onClose, isSubmitting }) {
  const { t } = useLanguage()

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel payment-modal">
        <button className="modal-close" type="button" onClick={onClose} aria-label={t.profile.closeModal}>
          <X size={18} />
        </button>

        <h2>{t.profile.choosePaymentMethod}</h2>
        {amount && <p className="payment-modal-amount">{t.profile.amountDueLabel}: EUR {amount}</p>}

        <div className="payment-method-options">
          <button
            className="payment-method-option"
            type="button"
            disabled={isSubmitting}
            onClick={onSelectCard}
          >
            <CreditCard size={22} />
            <span>
              <strong>{t.profile.payWithCard}</strong>
              <small>{t.profile.payWithCardDescription}</small>
            </span>
          </button>

          <button
            className="payment-method-option"
            type="button"
            disabled={isSubmitting}
            onClick={onSelectCod}
          >
            <Truck size={22} />
            <span>
              <strong>{t.profile.payCod}</strong>
              <small>{t.profile.payCodDescription}</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
