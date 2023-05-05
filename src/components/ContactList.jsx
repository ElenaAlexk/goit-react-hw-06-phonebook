import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deletContact } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  //фільтруємо контакти//
  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const onDeleteContact = id => {
    dispatch(deletContact(id));
  };

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li className={css.contactItem} key={id}>
          <span className={css.spanName}>{name}: </span>
          <span className={css.spanNumber}>{number}</span>
          <button
            className={css.button}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};
