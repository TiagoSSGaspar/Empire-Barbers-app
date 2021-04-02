import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, CreateAccountButton, CreateAccountButtonText, ForgotPassword, ForgotPasswordText, Title} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === 'ios' ? 'padding': undefined} enabled >
        <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg}/>

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Input name="e-mail" icon="mail" placeholder="E-mail"/>
            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={() => {}}>Entrar</Button>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000"/>
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>

    </>
  );
}

export default SignIn;
