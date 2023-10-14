import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation';
import {persistor, store} from './src/configs/store';
import {PersistGate} from 'redux-persist/integration/react';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
