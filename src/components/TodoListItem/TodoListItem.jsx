import style from './TodoListItem.module.css';
import Text from '../Text/Text';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

const TodoListItem = ({
  id,
  text,
  index,
  onDeleteTodo,
  onEditTodo,
  isEditing,
}) => {
  return (
    <div className={style.box}>
      <Text textAlign="center" marginBottom="20">
        TODO #{index}
      </Text>
      <Text>{text}</Text>
      <button
        onClick={() => onDeleteTodo(id)}
        className={style.deleteButton}
        type="button"
        disabled={isEditing}
      >
        <RiDeleteBinLine size={24} />
      </button>

      <button
        onClick={() => onEditTodo(id)}
        className={style.editButton}
        type="button"
        disabled={isEditing}
      >
        <RiEdit2Line size={24} />
      </button>
    </div>
  );
};

export default TodoListItem;
