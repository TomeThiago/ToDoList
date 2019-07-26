import React from 'react';
import { createAppContainer } from 'react-navigation';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppNavigator from './navigation/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: '#2196f3',
      secondary: '#575756',
      background: '#ffffff',
  }
}

export default class App extends React.Component {
    render() {
      return (
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      );
    }
}
