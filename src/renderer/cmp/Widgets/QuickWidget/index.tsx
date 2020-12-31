import React, {useEffect, useState} from "react";
import WidgetType from "src/shared/types/WidgetType";
import {contacts} from 'mocks/datas.mock';
import {Col, Image, Row} from "react-bootstrap";
import Contact from "src/shared/types/Contact";
import {useSelector} from "react-redux";
import {getQuickContacts} from 'src/shared/store/quickContacts/selectors'
import {ipcRenderer} from 'electron';

function getContact(num: number): Contact | undefined {
  return contacts.find(el => el.num === num);
}

const Cmp = () => {
  useEffect(() => ipcRenderer.send('open-quick-contacts-window'), []);

  const quickContacts = useSelector(getQuickContacts);
  return (<Row className='py-2'>
    {quickContacts.map((el, idx) => {
      const contact = getContact(el);
      return <React.Fragment key={idx}>
        {!!idx && <hr/>}
        <Col xs={4} className='text-center py-2'>
          <Image className='w-75 mb-1' roundedCircle src={contact?.photo}/>
          <br/>
          {contact?.firstname + " " + contact?.lastname}
          <br/>
          <span className='my-2 text-muted'>{contact?.title}</span>
        </Col>
      </React.Fragment>
    })
    }
  </Row>)
};

export default Cmp;

const quickWidgetType: WidgetType = {
  id: 'quick',
  component: Cmp,
  title: 'Quick Call',
  actions: ['Add']
}

export {quickWidgetType}
