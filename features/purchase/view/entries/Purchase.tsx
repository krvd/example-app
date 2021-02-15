import * as React from 'react'
import { useStore } from 'effector-react'
import { useFocusEffect } from '@react-navigation/native'
import { WebView } from 'react-native-webview'
import joinUrl from 'url-join'
import { FullScreenSpinner, ScreenLayout } from '@/ui'

import {
  $paymentFormAvailable,
  $stripeSessionId,
  purchaseScreenFocused,
  purchaseSuccess,
  purchaseError,
} from '../../model'

const baseUrl = process.env.PAYMENT_WEBVIEW_BASE_URL

export const Purchase = () => {
  const paymentFormAvailable = useStore($paymentFormAvailable)
  const stripeSessionId = useStore($stripeSessionId)
  const [stripeFormLoaded, setStripeFormLoaded] = React.useState(false)

  useFocusEffect(
    React.useCallback(() => {
      purchaseScreenFocused()
    }, []),
  )

  const webviewShown = Boolean(paymentFormAvailable && stripeSessionId)
  const spinnerShown = (!webviewShown || !stripeFormLoaded)

  if (!baseUrl) return null

  const redirectPageUrl = joinUrl(baseUrl, '/stripe/redirect/', stripeSessionId || '')

  const onLoadEnd = (url: string) => {
    if (url.includes('stripe.com')) {
      setStripeFormLoaded(true)
      return
    }

    if (url.includes('/stripe/success/')) {
      purchaseSuccess()
      return
    }

    if (url.includes('/stripe/error/')) {
      purchaseError()
    }
  }

  return (
    <ScreenLayout>
      <FullScreenSpinner transparent shown={spinnerShown} />
      {webviewShown && (
        <WebView
          source={{ uri: redirectPageUrl }}
          onLoadEnd={(data) => onLoadEnd(data.nativeEvent.url)}
        />
      )}
    </ScreenLayout>
  )
}
