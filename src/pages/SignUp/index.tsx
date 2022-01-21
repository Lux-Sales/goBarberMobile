import React, { useCallback, useRef } from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, GoBackButton, GoBackText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { Form } from '@unform/mobile'
import { useNavigation } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { TextInput } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

interface SignUpFormData{
  name: string,
  email: string,
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const inputRef = useRef(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string(). required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite email válido')
            .required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log('chegou no post')
        const resp = await api.post('/users', data)
        console.log('passou do post ', resp)

        Alert.alert('Cadastro realizado com sucesso','Você já pode fazer login')
        navigation.goBack()

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, cheque as credenciais'
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
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
              autoCapitalize='words'
              name="name"
              icon="user"
              placeholder='Nome'
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
              placeholder='Email'
              name="email"
              icon="mail"
              returnKeyType='next'
              onSubmitEditing={()=>{
                passwordInputRef.current?.focus()
              }}
              />


              <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder='Senha'
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



