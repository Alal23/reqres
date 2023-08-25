import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider, QueryClient} from 'react-query';
import {PaperProvider} from 'react-native-paper';
import Navigation from './src/navigation';
import {store} from './src/configs/store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
