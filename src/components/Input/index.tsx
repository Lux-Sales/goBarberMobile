import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { TextInputProps } from 'react-native'
import { useField, } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null)
  const { fieldName, registerField, error, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleFocus = useCallback(()=>{
    setIsFocused(true)
  },[])

  const handleBlur = useCallback(()=>{
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  },[])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    }
  }))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon size={20} color={isFocused || isFilled ? "#ff9000":"#666360"} name={icon} />
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholder={name}
        keyboardAppearance='dark'
        placeholderTextColor="#666360"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
