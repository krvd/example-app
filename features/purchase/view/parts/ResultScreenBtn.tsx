import * as React from 'react'
import styled from 'styled-components/native'
import {
  Button,
} from '@/ui'

type Props = {
  onPress: () => void;
  children: string;
}

export const ResultScreenBtn = ({ onPress, children }: Props) => (
  <Btn onPress={onPress}>
    {children}
  </Btn>
)

const Btn = styled(Button)`
  margin-top: 45px;
`
