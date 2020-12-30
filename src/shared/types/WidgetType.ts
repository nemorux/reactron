enum WIDGET_TYPE {
  CALLS = 1,
  MESSAGES,
  MEETINGS,
  QUICK
}

interface WidgetType {
  id: string;
  component: Function;
  title: string;
  actions?: string[];
  icon?: Function;
}

export {WIDGET_TYPE};
export default WidgetType;
