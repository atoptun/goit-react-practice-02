import { useState } from 'react';
import { nanoid } from 'nanoid';
import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import EditForm from '../components/EditForm/EditForm';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Todos = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const addNewTodo = text => {
    if (findTodo(text)) {
      alert(`Todo "${text}" already exist!`);
      return false;
    }
    setTodos([...todos, { id: nanoid(), text }]);
    return true;
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = id => {
    const editTodo = todos.find(t => t.id === id);
    if (!editTodo) {
      alert('Something went wrong!');
      return;
    }
    setCurrentTodo(editTodo);
    setIsEditing(true);
  };

  const cancelUpdate = () => {
    setCurrentTodo({});
    setIsEditing(false);
  };

  const updateTodo = text => {
    if (findTodo(text)) {
      alert(`Todo "${text}" already exist!`);
      return;
    }
    setTodos(
      todos.map(todo =>
        todo.id === currentTodo.id ? { ...currentTodo, text } : todo,
      ),
    );
    cancelUpdate();
  };

  const findTodo = (text) => {
    return todos.find(todo =>
      todo.text?.localeCompare(text, undefined, { sensitivity: 'base' }) === 0
    );
  }

  return (
    <>
      {isEditing ? (
        <EditForm
          defaultValue={currentTodo.text}
          onCancel={cancelUpdate}
          onUpdate={updateTodo}
        />
      ) : (
        <Form onSubmit={addNewTodo} />
      )}

      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
          isEditing={isEditing}
        />
      ) : (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
    </>
  );
};

export default Todos;
