/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

function App(): React.JSX.Element {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.glassCard}>
        <Text style={styles.title}>Glassmorphic Todo</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add a new todo..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.todoList}>
          {todos.map(todo => (
            <TouchableOpacity
              key={todo.id}
              style={[styles.todoItem, todo.completed && styles.todoCompleted]}
              onPress={() => toggleTodo(todo.id)}>
              <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4158D0',
    backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
  },
  glassCard: {
    flex: 1,
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'white',
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  todoCompleted: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  todoText: {
    color: 'white',
    fontSize: 16,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
});

export default App;
