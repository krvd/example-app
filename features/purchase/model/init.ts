import {
  guard, attach, combine, sample,
} from 'effector'
import { navigate } from '@/lib/navigation'
import {
  checkPurchaseFx, createCheckoutFormFx, $isAuth, Tour,
} from '@/dal'
import { openPrivateScreen } from '@/features/auth'
import {
  $purchaseStatus,
  $tour,
  $stripeSessionId,
  $tourId,
  checkPurchase,
  startPurchaseFlow,
  purchaseSuccess,
  purchaseError,
  purchaseScreenFocused,
} from './units'

$tour
  .on([checkPurchase, startPurchaseFlow], (_, tour) => tour)

$stripeSessionId
  .on(createCheckoutFormFx.doneData, (_, { stripe_session_id }) => stripe_session_id)
  .reset(startPurchaseFlow, purchaseScreenFocused)

$purchaseStatus
  .on(checkPurchaseFx.doneData, (_, { tour_purchased }) => tour_purchased)
  .on(purchaseSuccess, () => true)
  .reset(checkPurchase)

guard({
  source: checkPurchase,
  filter: $isAuth,
  target: attach({
    effect: checkPurchaseFx,
    mapParams: (tour: Tour) => tour.id,
  }),
})

guard({
  source: sample($tourId, purchaseScreenFocused),
  filter: combine([$isAuth, $tourId]).map(
    ([isAuth, tourId]) => isAuth && Boolean(tourId),
  ),
  target: createCheckoutFormFx,
})

createCheckoutFormFx.fail.watch(() => {
  navigate({ routeName: 'ToursList' })
})

startPurchaseFlow.watch(() => {
  openPrivateScreen({ routeName: 'Purchase' })
})

purchaseSuccess.watch(() => {
  openPrivateScreen({ routeName: 'PurchaseSuccess' })
})

purchaseError.watch(() => {
  openPrivateScreen({ routeName: 'PurchaseError' })
})
