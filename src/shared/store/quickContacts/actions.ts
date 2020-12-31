const branchName = 'quickContacts';

export const deleteQuickContact = (quickContactNum: number) => {
  return {
    type: branchName + '/DELETE',
    payload: quickContactNum
  };
};

export const updateQuickContacts = (quickContactsNums: number[]) => {
  return {
    type: branchName + '/UPDATE',
    payload: quickContactsNums
  }
};

export const addQuickContacts = (quickContactsNums: number[]) => {
  return {
    type: branchName + '/ADD',
    payload: quickContactsNums
  }
}
