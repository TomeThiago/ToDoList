import React from 'react';

import { View, StyleSheet, FlatList, Text, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Checkbox, FAB, TextInput, Button } from 'react-native-paper';

class Task extends React.Component {
  state = {
    _id: 3,
    tarefas: [
      {_id: 1, descricao: 'Tomar café', checked: false}, 
      {_id: 2,descricao: 'Fazer caminhada', checked: true}
    ],
    texto: '',
  }

  _addtask = () => {
    this.setState({_id: this.state._id + 1});
    this.setState({tarefas: [...this.state.tarefas, 
      {_id: this.state._id, descricao: this.state.texto, checked: false}
    ]});

    this.setState({texto: ''});
    ToastAndroid.show('Tarefa adicionada com sucesso!', ToastAndroid.SHORT);
  }

  _deletetask = (item) => {
    let tarefaAux = this.state.tarefas;

    this.setState({tarefas: tarefaAux.filter(task => {
        return task._id != item._id; 
      })
    });

    ToastAndroid.show('Tarefa deletada com sucesso!', ToastAndroid.SHORT);
  }

  _clickCheckBox = (item) => {
    let tarefaAux = this.state.tarefas;
    
    tarefaAux.map(task => {
      if (task._id == item._id) {
        task.checked = !task.checked;
      }
    })

    this.setState({tarefas: this.tarefaAux});
  }

  _renderItem = ({item}) => (
    <View style={styles.taskContainer}>
      <Checkbox
        status={item.checked ? 'checked' : 'unchecked'}
        onPress={() => this._clickCheckBox(item)}
      />
      <Text style={{textDecorationLine: item.checked ? 'line-through' : 'none'}}>{item._id}) {item.descricao}</Text>
      <Button 
          style={{justifyContent: 'space-between'}}
          icon='delete' 
          mode='text'
          color='#666'
          compact={true}
          onPress={() => this._deletetask(item)}>
      </Button>
    </View>
  );

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.titleText}>Tarefas</Text>
        
        <View style={styles.lista}>
          <FlatList 
            data={this.state.tarefas}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={true}
            onEndReachedThreshold={0}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={this._renderItem}
          />
        </View>
        

        <TextInput style={styles.inputText}
          placeholder="Digite uma Tarefa" 
          returnKeyType="send"
          onSubmitEditing={() => this._addtask()}
					value={this.state.texto}
					onChangeText={texto => this.setState({texto})}
				/>

        <Button 
          style={styles.button}
          icon='add' 
          mode='contained'
          onPress={() => this._addtask()}>
          Adicionar
        </Button>

        <FAB
          style={styles.fab}
          icon='keyboard-arrow-left'
          onPress={() => this.props.navigation.navigate('AuthScreen')}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },

  titleText: {
    fontSize: 55,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  separator: {
    height: 1,
    backgroundColor: '#111'
  },

  inputText: {
    marginTop: 10,
    marginBottom: 10,
		borderRadius: 5,	
  },
  
  button: {
    height: 50,
    borderRadius: 5,
    fontSize: 25,
		justifyContent: 'center'
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});