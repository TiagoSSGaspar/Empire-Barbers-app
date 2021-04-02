import React from 'react'
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {BackToSignIn, BackToSignInText, Container, Title} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const SignUp: React.FC = () => {
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
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome"/>
            <Input name="e-mail" icon="mail" placeholder="E-mail"/>
            <Input name="password" icon="lock" placeholder="Senha"/>

            <Button onPress={() => {}}>Entrar</Button>

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