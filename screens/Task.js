import React from 'react';

import { View, StyleSheet, FlatList, Text, ToastAndroid } from 'react-native';
import { Title, Checkbox, FAB, TextInput, Button } from 'react-native-paper';

class Task extends React.Component {
  state = {
    _id: 3,
    tarefas: [
      {_id: 1, descricao: 'Tomar café'}, 
      {_id: 2,descricao: 'Fazer caminhada'}
    ],
    texto: '',
    checked: false,
  }

  _addtask =() => {
    this.setState({_id: this.state._id + 1});
    this.setState({tarefas: [...this.state.tarefas, 
      {_id: this.state._id, descricao: this.state.texto}
    ]});

    this.setState({texto: ''});
    ToastAndroid.show('Tarefa adicionada com sucesso!', ToastAndroid.SHORT);
  }

  render() {
    const { checked } = this.state;
    return (
      <View style={styles.container}>    
        <Title style={styles.titleText}>Tarefas</Title>
        
        <View style={styles.lista}>
          <FlatList 
            data={this.state.tarefas}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Text>{item._id}) {item.descricao}</Text>
            )}
          />
        </View>
        

        <TextInput style={styles.inputText}
					placeholder="Digite uma Tarefa" 
					value={this.state.texto}
					onChangeText={texto => this.setState({texto})}
				/>

        <Button
          icon='add' 
          mode='contained'
          onPress={() => this._addtask()}>
          Adicionar
        </Button>

        <FAB
          style={styles.fab}
          icon='add'
          onPress={() => this.props.navigation.navigate('AuthScreen')}
        />
      </View>
    );
  }
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});