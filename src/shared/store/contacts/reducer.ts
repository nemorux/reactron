// import { contacts } from 'mocks/datas.mock';
const initState = {entities: {}, ids: []};

// const initState = {
//   entities: contacts.reduce((acc, el) => {
//     acc[el.num] = el;
//     return acc;
//   }, {}),
//   ids: contacts.map(el => el.num)
// }

const reducer = (state = initState, action) => {
  const pl = action.payload;
  switch (action.type) {
    case 'contacts/ADD': {
      if ((state.ids.indexOf as any)(pl?.num) !== -1)
        return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          [pl.num]: {
            ...pl
          }
        },
        ids: [...state.ids, pl.num]
      }
    }
    case 'contacts/ADD_MANY': {
      // const newIds = pl.map(el => el.num);
      // const newEntities = pl.reduce((acc, el) => {
      //   acc[el.num] = el;
      //   return acc;
      // }, {});

      const newIds = [];
      const newEntities = {};

      pl.forEach(el => {
        if ((state.ids.indexOf as any)(el.num) !== -1) return;
        (newIds.push as any)(el.num);
        newEntities[el.num] = el;
      })
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
          [pl.num]: {
            ...state.entities[pl.num],
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
