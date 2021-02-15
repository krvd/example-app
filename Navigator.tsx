import * as React from 'react'
import { useStore } from 'effector-react'
import { NavigationContainer, DefaultTheme, LinkingOptions } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

import { navRef } from '@/lib/navigation'
import { $isAuth, $isGuest } from '@/dal'
import { $appLoadEnd, Splash } from '@/features/app-init'
import { LoginMethods } from '@/features/auth'
import { Purchase, PurchaseSuccess, PurchaseError } from '@/features/purchase'

enableScreens()

const { Navigator, Screen } = createNativeStackNavigator()

const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fafafa',
  },
}

function renderScreen(name: string, component: React.ComponentType, options?: object) {
  return (
    <Screen
      name={name}
      component={component}
      options={options}
    />
  )
}

const linking: LinkingOptions = {
  prefixes: ['/'],
  config: {
    screens: {
      PasswordResetSetNew: {
        path: 'resetpassword/:token/:email',
      },
    },
  },
}

export const AppNavigator = () => {
  const appLoadEnd = useStore($appLoadEnd)
  const isAuth = useStore($isAuth)
  const isGuest = useStore($isGuest)

  return (
    <NavigationContainer ref={navRef} theme={NavigatorTheme} linking={linking}>
      <Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          ...{
            gestureDirection: 'horizontal',
          },
        }}
      >
        {!appLoadEnd && renderScreen('Splash', Splash)}

        {appLoadEnd && (
          <>
            {renderScreen('Policy', Policy)}
            {renderScreen('TermsOfUsage', TermsOfUsage)}
          </>
        )}

        {appLoadEnd && isGuest && (
          <>
            {renderScreen('LoginMethods', LoginMethods)}
          </>
        )}

        {appLoadEnd && isAuth && (
          <>
            {renderScreen('Purchase', Purchase)}
            {renderScreen('PurchaseSuccess', PurchaseSuccess)}
            {renderScreen('PurchaseError', PurchaseError)}
          </>
        )}
      </Navigator>
    </NavigationContainer>
  )
}
