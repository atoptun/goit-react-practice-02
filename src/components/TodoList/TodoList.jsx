import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem'

const TodoList = ({ todos, onDeleteTodo, onEditTodo, isEditing }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <GridItem key={todo.id}>
          <TodoListItem
            id={todo.id}
            text={todo.text}
            index={index + 1}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
            isEditing={isEditing}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
