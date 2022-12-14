import s from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { selectFilteredContacts, selectIsLoading } from 'store/selectors';
import {
  getContactsThunk,
  deleteContactThunk,
} from 'store/contacts/thunk.contacts';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const elements = filteredContacts.map(({ id, name, phone }) => (
    <ContactItem
      key={id}
      id={id}
      name={name}
      phone={phone}
      handleDelete={() => dispatch(deleteContactThunk(id))}
    />
  ));

  return (
    <>
      {isLoading && <Loader />}
      <ul className={classNames(s.list, { [s.disabled]: isLoading })}>
        {elements}
      </ul>
    </>
  );
};

export default ContactList;
