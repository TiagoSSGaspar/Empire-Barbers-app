import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Image, KeyboardAvoidingView, Platform, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {BackToSignIn, BackToSignInText, Container, Title} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const shema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'mínimo de 6 digitos')
      });

      await shema.validate(data,{
        abortEarly: false,
      });

      await api.post('/users', data);

      navigation.goBack();

      Alert.alert('Cadastro realizado!','Agora você pode fazer logon na Empire Barbers');

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }
      Alert.alert('Erro no cadastro','Erro ao fazer cadastro, tente novamente!')

    }
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={Platform.OS === 'ios' ? 'padding': undefined} enabled >
        <ScrollView contentContainerStyle={{flex: 1}} keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={logoImg}/>

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>

              <Input
                name="name" icon="user"
                placeholder="Nome" autoCapitalize="words"
                returnKeyType="next" onSubmitEditing={() => {emailInputRef.current?.focus()}}
              />
              <Input
                ref={emailInputRef}
                name="email" icon="mail"
                placeholder="E-mail" keyboardType="email-address"
                autoCorrect={false} textContentType="newPassword"
                autoCapitalize="none" returnKeyType="next"
                onSubmitEditing={() => {passwordInputRef.current?.focus()}}
              />
              <Input
                ref={passwordInputRef}
                name="password" icon="lock"
                placeholder="Senha" secureTextEntry
                returnKeyType="send" onSubmitEditing={() => {formRef.current?.submitForm()}}
              />

              <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>

            </Form>


          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff"/>
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>

    </>
  );
}

export default SignUp;
