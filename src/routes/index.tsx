import React from 'react';

import { useAuth } from '../hooks/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { ActivityIndicator, View } from 'react-native';
import { ceil } from 'react-native-reanimated';


const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if(loading) {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return user ? <AppRoutes/> : <AuthRoutes/>
};

export default Routes;
