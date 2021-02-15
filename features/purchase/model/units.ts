import { createDomain, combine } from 'effector'
import { Tour, checkPurchaseFx, createCheckoutFormFx } from '@/dal'

export const purchaseDomain = createDomain('purchase')

export const $tour = purchaseDomain.store<Tour | null>(null)
export const $stripeSessionId = purchaseDomain.store<string | null>(null)
export const $purchaseStatus = purchaseDomain.store(false)
export const $purchaseStatusPending = checkPurchaseFx.pending
export const $createPurchasePending = createCheckoutFormFx.pending

export const $tourId = $tour.map((tour) => (tour ? tour.id : null))
export const $paymentFormAvailable = combine(
  $tourId,
  $stripeSessionId,
  $purchaseStatusPending,
  $createPurchasePending,
  (tourId, stripeSessionId, statusPending, createPending) => Boolean(
    tourId && stripeSessionId && !statusPending && !createPending,
  ),
)

export const checkPurchase = purchaseDomain.event<Tour>()
export const purchaseScreenFocused = purchaseDomain.event<void>()
export const startPurchaseFlow = purchaseDomain.event<Tour>()
export const purchaseSuccess = purchaseDomain.event<void>()
export const purchaseError = purchaseDomain.event<void>()
export const successScreenBtnPressed = purchaseDomain.event<void>()
export const errorScreenBtnPressed = purchaseDomain.event<void>()
export const errorScreenBackBtnPressed = purchaseDomain.event<void>()
