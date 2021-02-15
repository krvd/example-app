import {
  forward, sample,
} from 'effector'
import {
  $isAuth,
  authStateReady,
  initAuthState,
  fetchFaqRequestFx,
  fetchToursListFx,
} from '@/dal'
import { getUserFx } from '@/features/auth'
import { appMounted, getInitialDataFx } from './units'

forward({
  from: appMounted,
  to: initAuthState,
})

forward({
  from: sample($isAuth, authStateReady),
  to: getInitialDataFx,
})

forward({
  from: getInitialDataFx.doneData,
  to: fetchToursListFx,
})

getInitialDataFx.use(async (isAuth) => {
  const initialEffects: Promise<any>[] = [
    fetchFaqRequestFx(),
  ]

  if (isAuth) {
    initialEffects.push(getUserFx())
  }

  await Promise.all(initialEffects)
})
