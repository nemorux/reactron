const initState = [];

const branchName = 'quickContacts';

const reducer = (state = initState, action) => {
  const pl = action.payload;
  switch (action.type) {
    case branchName + '/ADD': {
      return [...state, ...pl];
    }
    case branchName + '/UPDATE': {
      return [...pl];
    }
    case branchName + '/DELETE': {
      return [state.filter(el => el !== pl)];
    }
    default:
      return state;
  }
};
export default reducer;
