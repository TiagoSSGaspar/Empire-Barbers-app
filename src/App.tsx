import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, View} from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle={'light-content'} backgroundColor={'#312e38'}/>
    <View style={{flex: 1, backgroundColor: '#312e38'}}>
      <Routes/>
    </View>
  </NavigationContainer>
);

export default App;