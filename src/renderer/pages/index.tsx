import React, {useCallback, useEffect, useRef, useState} from 'react';
import {remote} from 'electron';
import {Button, Image, Container} from "react-bootstrap";
import {IoGrid, IoSettingsSharp} from "react-icons/io5";
import WidgetFrame from 'src/renderer/cmp/WidgetFrame';
import styles from './style.module.scss';
import icon from 'src/shared/assets/icon256.png';

const Cmp = () => {
  const [widgetsIds, setWidgetsIds] = useState(['meetings', 'quick', 'calls', 'messages']);
  const [isEditMode, setIsEditMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenSize = remote.screen.getPrimaryDisplay().workAreaSize;
    const windowWidth = ref.current?.offsetWidth ?? 500;
    remote.getCurrentWindow().setSize(
      windowWidth,
      screenSize.height,
      true
    );
  }, [ref.current?.offsetWidth]);

  const onEditClick = useCallback(() => setIsEditMode(!isEditMode), [isEditMode]);
  const onCloseClick = useCallback(widgetId => {
    setWidgetsIds(widgetsIds.filter(el => el !== widgetId));
  }, [widgetsIds.length]);

  return (
    <Container fluid className={styles.container + ' d-flex flex-column'} ref={ref}>

      <div className={styles.topSticky}>
        <div className={styles.topDiv}>
          <Image className={styles.logo} src={icon}/>
          <Button size="sm" className='mr-2'><IoGrid/></Button>
          <Button size="sm"><IoSettingsSharp/></Button>
        </div>
        <hr className='mx-n3'/>
      </div>

      <div className='py-3'>
        {widgetsIds.map((el, idx) => {
          return <WidgetFrame key={idx} className='mb-3' onRemove={onCloseClick} isEditMode={isEditMode} widgetId={el}/>
        })}
      </div>

      <hr className='mt-auto mx-n3'/>
      <div className={styles.bottomDiv}>
        <Button onClick={onEditClick}>Edit</Button>
      </div>
    </Container>
  );
}

export default Cmp;
