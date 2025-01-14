import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home.screen';
import { ProductProvider } from './src/contexts/product.context';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
}

export default App;
