import React from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccountButton, CreateAccountText } from './styles'
import Icon from 'react-native-vector-icons/Feather'

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{flex:1}}
        >
          <Container>

            <Image source={logoImg} />
            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Input name="Email" icon="mail" />

            <Input name="Senha" icon="lock" />

            <Button onPress={() => { }}>
              Entrar
            </Button>

            <ForgotPasswordButton onPress={() => { }}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => { }}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>
          Criar conta
        </CreateAccountText>
      </CreateAccountButton>
    </>
  )

}

export default SignIn;
