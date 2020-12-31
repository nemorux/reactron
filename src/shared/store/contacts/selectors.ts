import Contact from 'src/shared/types/Contact';

export const getContactsBranch = state => state.contacts;

export const getContactsEntities = state => getContactsBranch(state).entities;

export const getContactEntity = id => state => getContactsEntities(state)[id];

export const getContactsIds = state => getContactsBranch(state).ids;

export const getContacts = (state: any): Contact[] => {
  const entities = getContactsEntities(state);
  return getContactsIds(state).map(id => entities[id]);
};

export const getContactNextId = state =>
  getContactsIds(state).reduce((maxId, id) => Math.max(id, maxId), -1) + 1;

