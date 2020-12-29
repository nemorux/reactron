export const deleteContact = contactId => {
  return {
    type: 'contacts/DELETE',
    payload: contactId
  };
};

export const updateContact = contact => {
  return {
    type: 'contacts/UPDATE',
    payload: contact
  }
};

export const addContact = contact => {
  return {
    type: 'contacts/ADD',
    payload: contact
  }
}

export const addContacts = contacts => {
  return {
    type: 'contacts/ADD_MANY',
    payload: contacts
  }
}
