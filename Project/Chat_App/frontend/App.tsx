import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import { store, persistor } from './src/store';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import { useAppSelector } from './src/store/hooks';
import LoadingScreen from './src/screens/LoadingScreen';
import { initializeSocket } from './src/services/socketService';
import { initializeEncryption } from './src/services/encryptionService';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      initializeSocket();
      initializeEncryption();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
