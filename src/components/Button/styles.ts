import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  height: 60px;
  background: #ff9000;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 8px;
`

export const ButtonText = styled.Text`
  font-family: "RobotoSlab-Medium";
  font-size: 18px;
  color: #312e38;
`
