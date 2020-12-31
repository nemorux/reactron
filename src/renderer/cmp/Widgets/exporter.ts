import WidgetType from "src/shared/types/WidgetType";
import {messagesWidgetType} from "./MessagesWidget";
import {callsWidgetType} from "./CallsWidget";
import {quickWidgetType} from "./QuickWidget";
import {meetingsWidgetType} from "./Meetings";

const widgetTypes: WidgetType[] = [messagesWidgetType, callsWidgetType, quickWidgetType, meetingsWidgetType];
const widgetTypesIds: string[] = widgetTypes.map(el => el.id);
const widgetTypesEntities = widgetTypes.reduce((acc, el) => {
  acc[el.id] = el;
  return acc;
}, {});

export {widgetTypes, widgetTypesIds, widgetTypesEntities};
