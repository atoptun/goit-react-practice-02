import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';

const Form = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const searchEl = event.target.elements.search;
    const value = searchEl.value.trim();
    if (!value) {
      alert('Write something!');
      searchEl.focus();
      return;
    }
    if (!onSubmit(value)) {
      setTimeout(() => {
        searchEl.focus();
      }, 0);
      return;
    }
    event.target.reset();
    searchEl.focus();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </form>
  );
};

export default Form;
