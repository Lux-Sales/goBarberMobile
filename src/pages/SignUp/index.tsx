import React from 'react'
import { Image, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import logoImg from '../../assets/logo.png'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Title, GoBackButton, GoBackText } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'

const SignUp: React.FC = () => {
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
        contentContainerStyle={{flex:1}}
        >
          <Container>

            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="Nome" icon="user" />
            <Input name="Email" icon="mail" />
            <Input name="Senha" icon="lock" />

            <Button onPress={() => { }}>
              Cadastrar
            </Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoBackButton onPress={() => { navigation.goBack()}}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <GoBackText>
          Voltar para o login
        </GoBackText>
      </GoBackButton>
    </>
  )

}

export default SignUp;
