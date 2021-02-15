import * as React from 'react'
import { Heading } from '@/ui'

import { successScreenBtnPressed } from '../../model'

import { PurchaseResultLayout } from '../parts/PurchaseResultLayout'
import { ResultScreenBtn } from '../parts/ResultScreenBtn'
import { ResultScreenText } from '../parts/ResultScreenText'

export const PurchaseSuccess = () => {
  return (
    <PurchaseResultLayout icon="purchaseSuccess">
      <Heading size="h1" center>Успех</Heading>
      <ResultScreenText>
        Оплата прошла успешно
      </ResultScreenText>
      <ResultScreenBtn onPress={() => successScreenBtnPressed()}>
        Вернуться к квесту
      </ResultScreenBtn>
    </PurchaseResultLayout>
  )
}
