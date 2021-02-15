import { attachWrapper } from '@/lib/effector-extra'
import { Method, requestFx, authRequestFx } from '@/dal/rest-api'

export type PurchaseStatus = {
  tour_purchased: boolean;
}

export const checkPurchaseFx = attachWrapper({
  effect: authRequestFx,
  mapParams: (tourId: Tour['id']) => ({
    method: Method.get,
    url: `/tours/${tourId}/check-purchase`,
  }),
  mapResult: ({ result }): PurchaseStatus => result.data,
})

export type CreateCheckoutFormResult = {
  stripe_session_id: string;
}

export const createCheckoutFormFx = attachWrapper({
  effect: authRequestFx,
  mapParams: (tourId: Tour['id']) => ({
    method: Method.post,
    url: `/tours/${tourId}/payment/stripe/checkout`,
  }),
  mapResult: ({ result }): CreateCheckoutFormResult => result.data,
})
