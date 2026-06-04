import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import style from './EditForm.module.css';

const EditForm = ({ defaultValue, onUpdate, onCancel }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const textEl = event.target.elements.text;
    const value = textEl.value.trim();
    if (!value) {
      alert('Write something!');
      textEl.focus();
      return;
    }
    if (!onUpdate(value)) {
      setTimeout(() => {
        textEl.focus();
      }, 0);
    }
    event.target.reset();
    textEl.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button
        onClick={() => {
          onCancel();
        }}
        className={style.editButton}
        type="button"
      >
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="text"
        required
        defaultValue={defaultValue}
        autoFocus
      />
    </form>
  );
};
export default EditForm;
