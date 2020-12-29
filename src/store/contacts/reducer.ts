const initState = {entities: {}, ids: []};

const reducer = (state = initState, action) => {
  const pl = action.payload;
  switch (action.type) {
    case 'contacts/ADD': {
      return {
        ...state,
        entities: {
          ...state.entities,
          [pl.id]: {
            ...pl
          }
        },
        ids: [...state.ids, pl.id]
      }
    }
    case 'contacts/ADD_MANY': {
      const newIds = pl.map(el => el.id);
      const newEntities = pl.reduce((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {});
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newEntities
        },
        ids: [...state.ids, ...newIds]
      }
    }
    case 'contacts/UPDATE': {
      return {
        ...state,
        entities: {
          ...state.entities,
          [pl.id]: {
            ...state.entities[pl.id],
            ...pl
          }
        }
      }
    }
    case 'contacts/DELETE': {
      const newEntities = {...state.entities};
      delete newEntities[pl];
      return {
        ...state,
        entities: newEntities,
        ids: state.ids.filter(el => el !== pl)
      }
    }

    default:
      return state;
  }
};
export default reducer;
