import React, {useCallback, useEffect, useRef, useState, useReducer} from 'react';
import {ipcRenderer} from 'electron';
import {Button, Image, Container, Row, Col, Card} from "react-bootstrap";
import {IoGrid, IoSettingsSharp, IoAddCircleSharp} from "react-icons/io5";
import WidgetFrame from 'src/renderer/cmp/WidgetFrame';
import styles from './style.module.scss';
import logo from 'src/renderer/core/assets/logo.svg';
import {widgetTypesIds, widgetTypesEntities} from "src/renderer/cmp/Widgets/exporter";
import AddQuickContacts from './AddQuickContacts';
import {useDispatch} from 'react-redux';
import {contacts} from 'mocks/datas.mock';
import {addContacts} from 'src/shared/store/contacts/actions';


const page = (new URLSearchParams(window.location.search)).get("p") || '';

const Cmp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addContacts(contacts));
  }, [])

  if (page === 'add_quick_contacts')
    return <AddQuickContacts/>

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const [widgetsIds, setWidgetsIds] = useState(['meetings']);
  const [isEditMode, setIsEditMode] = useState(false);
  const [topDivExpanded, setTopDivExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ipcRenderer.send('resize', [
      ref.current?.offsetWidth,
      null
    ])
  }, [ref.current?.offsetWidth]);

  const onEditClick = useCallback(() => {
    setIsEditMode(!isEditMode);
    setTimeout(forceUpdate, 0);
  }, [isEditMode]);

  const onCloseClick = useCallback(widgetId => {
    setWidgetsIds(widgetsIds.filter(el => el !== widgetId));
  }, [widgetsIds.length]);

  const onMenuClicked = useCallback(() => {
    setTopDivExpanded(!topDivExpanded);
  }, [topDivExpanded]);

  const onAddNewWidget = useCallback(widgetId => {
    setWidgetsIds([...widgetsIds, widgetId]);
  }, [widgetsIds]);

  return (
    <div ref={ref} style={{width: (isEditMode ? '48rem' : '24rem')}} className={styles.whole}>
      <Container className={styles.container + ' d-flex flex-column'}>

        <div className={styles.topSticky}>
          <div className={styles.topDiv + ' drag'}>
            <Image className={styles.logo} src={logo}/>
            <Button
              onClick={onMenuClicked}
              variant={topDivExpanded ? 'light' : 'secondary'}
              size="sm"
              className='mr-2 no-drag'
            >
              <IoGrid/>
            </Button>
            <Button className='no-drag' variant='secondary' size="sm"><IoSettingsSharp/></Button>
          </div>
          <div hidden={!topDivExpanded} className='mb-3'>
            <Row style={{rowGap: '0.75rem'}}>
              {['Workspace', 'Collaboration', 'Venue', 'Planner'].map((el, idx) => {
                return <Col key={idx} xs={6}>
                  <Card>
                    <Card.Body>
                      <strong>{el}</strong>
                    </Card.Body>
                  </Card>
                </Col>
              })}
            </Row>

          </div>
          <hr className='mx-n3'/>
        </div>

        <div className='py-3'>
          {widgetsIds.map((el, idx) => {
            return <WidgetFrame
              key={idx}
              className='mb-3'
              onRemove={onCloseClick}
              isEditMode={isEditMode}
              widgetId={el}
            />
          })}
        </div>

        <hr className='mt-auto mx-n3'/>
        <div className={styles.bottomDiv}>
          <Button variant='secondary' onClick={onEditClick}>{isEditMode ? 'Done' : 'Edit'}</Button>
        </div>
      </Container>

      {isEditMode &&
      <Container fluid className={styles.container + ' d-flex flex-column shadow'}>
        {
          widgetTypesIds.map((el, idx) => {
            if (widgetsIds.indexOf(el) === -1)
              return <Card key={idx} className='mt-3'>
                <Card.Body className='d-flex py-2 shadow-sm align-items-center'>
                  {widgetTypesEntities[el].title}
                  <Button
                    onClick={() => {
                      onAddNewWidget(el)
                    }}
                    className='p-0 rounded-circle ml-auto'
                    variant='link'
                  >
                    <IoAddCircleSharp className='h3 text-success'/>
                  </Button>
                </Card.Body>
              </Card>;
          })
        }
      </Container>
      }
    </div>
  );
}

export default Cmp;
