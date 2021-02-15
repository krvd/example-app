import { createDomain, combine } from 'effector'
import { $isAuthReady } from '@/dal'

export const appInit = createDomain('app-init')

export const appMounted = appInit.event<void>()
export const getInitialDataFx = appInit.effect<boolean, void, Error>()

export const $appLoadEnd = combine(
  $isAuthReady,
  getInitialDataFx.pending,
  (isAuthReady, pending) => isAuthReady && !pending,
)
