import React, { useCallback, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/Auth';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.jpeg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, CreateAccountButton, CreateAccountButtonText, ForgotPassword, ForgotPasswordText, Title} from './styles';

interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const {signIn} = useAuth();

  const handleSignIn = useCallback(async (data: SignFormData) => {
    try {
      formRef.current?.setErrors({});
      const shema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        password: Yup.string().required('Senha obrigatória')
      });

      await shema.validate(data,{
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (error) {

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return
      }

      Alert.alert('Erro na autenticação', 'Error ao efetuar login, cheque as credenciais.')

    }
  }, [signIn]);

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

            <Form ref={formRef} onSubmit={handleSignIn}>

              <Input
                name="email" icon="mail" placeholder="E-mail"
                autoCorrect={true} autoCapitalize={'none'}
                keyboardType={'email-address'} returnKeyType={'next'}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password" icon="lock"
                placeholder="Senha" secureTextEntry
                returnKeyType={'send' } onSubmitEditing={() => {formRef.current?.submitForm()}}
              />

              <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>

            </Form>

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
