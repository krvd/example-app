import { StackActions, CommonActions } from '@react-navigation/native'
import { navRef } from './nav-ref'

type NavigatePayload = {
  routeName: string;
  params?: object;
}

export const navigate = ({ routeName, params }: NavigatePayload) => {
  navRef.current?.navigate(routeName, params)
}
export const goBack = () => {
  if (navRef.current) {
    const state = navRef.current.getRootState()
    if (state.index) {
      navRef.current?.dispatch(CommonActions.goBack())
      return true
    }
  }
  return false
}
export const push = ({ routeName, params }: NavigatePayload) => {
  navRef.current?.dispatch(StackActions.push(routeName, params))
}
export const replace = ({ routeName, params }: NavigatePayload) => {
  navRef.current?.dispatch(StackActions.replace(routeName, params))
}
