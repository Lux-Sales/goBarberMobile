import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon size={20} color="#666360" name={icon}/>
    <TextInput
      placeholder={name}
      keyboardAppearance='dark'
      placeholderTextColor="#666360"
      {...rest  }
      />
  </Container>
)

export default Input