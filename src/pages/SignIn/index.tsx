import React, { useCallback, useRef } from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, ForgotPasswordButton, ForgotPasswordText, CreateAccountButton, CreateAccountText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

interface SignInFormData {
  email: string,
  password: string
}
const SignIn: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null)
  const formRef = useRef<FormHandles>(null)


  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });

        // history.push('/dashboard');

        console.log(data)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais'
        )
      }
    },
    [],
  );


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
              <Input
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                placeholder='Email'
                name="email"
                icon="mail"
                returnKeyType='next'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                placeholder='Senha'
                icon="lock"
                secureTextEntry
                returnKeyType='send'
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />

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
