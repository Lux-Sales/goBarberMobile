import React, { useCallback, useRef } from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccountButton, CreateAccountText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'


const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const handleSignIn = useCallback((data: object)=>{
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
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="Email" icon="mail" />

              <Input name="Senha" icon="lock" />

              <Button onPress={() => {
                formRef.current?.submitForm()
               }} >
                Entrar
              </Button>
            </Form>

            <ForgotPasswordButton onPress={() => { }}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp' as never)}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>
          Criar conta
        </CreateAccountText>
      </CreateAccountButton>
    </>
  )

}

export default SignIn;
