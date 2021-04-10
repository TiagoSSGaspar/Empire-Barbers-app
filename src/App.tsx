import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, View} from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle={'light-content'} backgroundColor={'#000000'}/>
    <AppProvider>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <Routes/>
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
