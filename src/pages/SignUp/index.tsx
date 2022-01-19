import React, { useCallback, useRef } from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, GoBackButton, GoBackText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { useNavigation } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { TextInput } from 'react-native-gesture-handler'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const inputRef = useRef(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback((data: object)=>{
    console.log(data)
  },[])

  const navigation = useNavigation()
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>

            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
              autoCapitalize='words'
              name="Nome"
              icon="user"
              returnKeyType='next'
              onSubmitEditing={()=>{
                emailInputRef.current?.focus()
              }}
              />
              <Input
              ref={emailInputRef}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              name="Email"
              icon="mail"
              returnKeyType='next'
              onSubmitEditing={()=>{
                passwordInputRef.current?.focus()
              }}
              />


              <Input
              ref={passwordInputRef}
              name="Senha"
              icon="lock"
              secureTextEntry
              returnKeyType='send'
              onSubmitEditing={()=>{
                formRef.current?.submitForm()
              }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm()
              }}>
                Cadastrar
              </Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoBackButton onPress={() => { navigation.goBack() }}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <GoBackText>
          Voltar para o login
        </GoBackText>
      </GoBackButton>
    </>
  )

}

export default SignUp;
