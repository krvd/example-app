import * as React from 'react'
import styled from 'styled-components/native'
import {
  Heading,
  ThemedStyledProps,
  themeVar,
  useTheme,
  Button,
} from '@/ui'

import { errorScreenBtnPressed, errorScreenBackBtnPressed } from '../../model'

import { PurchaseResultLayout } from '../parts/PurchaseResultLayout'
import { ResultScreenBtn } from '../parts/ResultScreenBtn'
import { ResultScreenText } from '../parts/ResultScreenText'

export const PurchaseError = () => {
  const theme = useTheme()

  return (
    <PurchaseResultLayout icon="purchaseFail">
      <WarnHeading size="h1" center>Фейл</WarnHeading>
      <ResultScreenText>
        Что-то пошло не так, попробуйте ещё раз
      </ResultScreenText>
      <ResultScreenBtn onPress={() => errorScreenBtnPressed()}>
        Повторить
      </ResultScreenBtn>
      <BtnWrap>
        <Button color={theme.tourBuyButtonColor} onPress={errorScreenBackBtnPressed}>
          Вернуться к квесту
        </Button>
      </BtnWrap>
    </PurchaseResultLayout>
  )
}

const WarnHeading = styled(Heading)<ThemedStyledProps>`
  color: ${themeVar('dangerColor')};
`

const BtnWrap = styled.View`
  margin-top: 16px;
  width: 100%;
`
