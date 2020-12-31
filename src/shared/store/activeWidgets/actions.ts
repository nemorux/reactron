const branchName = 'quickContacts';

export const deleteActiveWidget = (activeWidgetId: number) => {
  return {
    type: branchName + '/DELETE',
    payload: activeWidgetId
  };
};

export const updateActiveWidget = (activeWidgetsIds: number[]) => {
  return {
    type: branchName + '/UPDATE',
    payload: activeWidgetsIds
  }
};

export const addActiveWidget = (activeWidgetsIds: string[]) => {
  return {
    type: branchName + '/ADD',
    payload: activeWidgetsIds
  }
}
