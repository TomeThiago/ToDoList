import React from 'react';

import { View, Image, StyleSheet, Alert, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

class AuthScreen extends React.Component {
  state = {
    user: '',
    password: '',
    userstorage: '',
    passwordstorage: '',
  }

  async componentDidMount() {
    userstorage = await AsyncStorage.getItem('@user');
    passwordstorage = await AsyncStorage.getItem('@password');
  }

  async _inAutheticated() {
    if (userstorage) {
      if ((this.state.user == userstorage) && (this.state.password == passwordstorage)) {
        this.props.navigation.navigate('Task');
      } else {
        Alert.alert('Atenção', 'Usuário ou senha inválido!');
      }
    } else {
      await AsyncStorage.setItem('@user', this.state.user);
      await AsyncStorage.setItem('@password', this.state.password);
      this.props.navigation.navigate('Task');
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
        </View>
        <TextInput style={styles.inputText}
          label='Usuário'
          returnKeyType='next'
          onSubmitEditing={() => this.passwordInput.focus()}
          value={this.state.user}
          onChangeText={user => this.setState({ user })}
        />
        <TextInput style={styles.inputText}
          label='Senha'
          returnKeyType='go'
          secureTextEntry={true}
          ref={(input) => this.passwordInput = input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this._inAutheticated()}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button style={styles.button}
          icon='person'
          mode='contained'
          onPress={() => this._inAutheticated()}>
          Logar
				</Button>
      </KeyboardAvoidingView>
    );
  }
}

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },

  logoContainer: {
    flexGrow: 2,
  },

  logo: {
    flex: 1,
    height: 25,
    width: '100%',
  },

  inputText: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },

  button: {
    marginHorizontal: 10,
    borderRadius: 5,
    height: 50,
    fontSize: 25,
    justifyContent: 'center'
  }
});