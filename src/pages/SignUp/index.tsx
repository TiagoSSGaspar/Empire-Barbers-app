import React, { useRef } from 'react'
import { FormHandles } from '@unform/core';
import { Image, KeyboardAvoidingView, Platform, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {BackToSignIn, BackToSignInText, Container, Title} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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

            <Form ref={formRef} onSubmit={(data)=>{console.log(data)}}>

              <Input
                name="name" icon="user"
                placeholder="Nome" autoCapitalize="words"
                returnKeyType="next" onSubmitEditing={() => {emailInputRef.current?.focus()}}
              />
              <Input
                ref={emailInputRef}
                name="e-mail" icon="mail"
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
