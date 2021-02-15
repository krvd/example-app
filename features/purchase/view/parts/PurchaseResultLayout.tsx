import * as React from 'react'
import styled from 'styled-components/native'
import {
  Icon,
  ScreenLayout,
  BaseContainer,
  IconName,
} from '@/ui'

type Props = {
  icon: IconName;
  children: React.ReactNode;
}

export const PurchaseResultLayout = ({ icon, children }: Props) => {
  return (
    <ScreenLayout>
      <Wrap>
        <Icon icon={icon} />
        <Content>
          {children}
        </Content>
      </Wrap>
    </ScreenLayout>
  )
}

const Wrap = styled(BaseContainer)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  width: 100%;
  margin-top: 84px;
`
