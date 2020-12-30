import React, {useCallback} from "react";
import WidgetType from "src/shared/types/WidgetType";
import {Button, Card} from 'react-bootstrap';
import {widgetTypesEntities} from 'src/renderer/cmp/Widgets/exporter'

const Cmp = ({isEditMode, onRemove, widgetId, ...props}) => {
  const widget: WidgetType = widgetTypesEntities[widgetId];
  const WidgetComponent = widget.component;
  // const IconComponent = widget.icon?;

  const onCloseClick = useCallback(() => onRemove(widgetId), [onRemove]);

  return (
    <Card className={props.className}>
      <Card.Header className='d-flex align-items-center'>
        {/*<IconComponent/>*/}
        {widget.title.toUpperCase()}
        {(widget.actions && !isEditMode) &&
        <div className='ml-auto d-inline'>
          {widget.actions.map((el, idx) => (
              <Button key={idx} className='border-secondary' variant='light' size='sm'>
                {el}
              </Button>
            )
          )}
        </div>}

        {isEditMode &&
        <Button onClick={onCloseClick} variant='light' className='ml-auto close'>
          <span>&times;</span>
        </Button>}
      </Card.Header>
      <Card.Body className='py-0'><WidgetComponent/></Card.Body>
    </Card>
  )
};

export default Cmp;
