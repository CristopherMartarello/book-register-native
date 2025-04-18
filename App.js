import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { TemaProvider } from './context/TemaContext';
import { store } from './redux/store';

import CadastroLivros from './screens/CadastroLivros';
import Configuracoes from './screens/Configuracoes';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <TemaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomeScreen">
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'MyLibrary' }} />
            <Stack.Screen name="CadastroLivros" component={CadastroLivros} options={{ title: 'Cadastro de Livros' }} />
            <Stack.Screen name="Configuracoes" component={Configuracoes} options={{ title: 'Configurações' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </TemaProvider>
    </Provider>
  );
}
