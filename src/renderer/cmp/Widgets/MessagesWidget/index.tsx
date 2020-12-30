import React from "react";
import dayjs from "dayjs";
import WidgetType from "src/shared/types/WidgetType";
import {messages, contacts} from 'mocks/datas.mock';
import {Button, Col, Image, Row} from "react-bootstrap";
import {IoArrowRedo} from "react-icons/io5";

// function formatText(text) {
//   return text.substring(0, 55) + (text.length > 55 ? '...' : '');
// }

function getContact(num) {
  return contacts.find(el => el.num === num);
}

const Cmp = () => {
  return (<>
    {messages.map((el, idx) => {
      const contact = (getContact(el.num) as any);
      return <React.Fragment key={idx}>
        {!!idx && <hr/>}
        <Row className='align-items-center py-3'>
          <Col xs={3}><Image className='w-75' roundedCircle src={contact.photo}/></Col>
          <Col xs={7} className='px-0'>
            {contact.firstname + ' ' + contact.lastname}
            <small className='ml-2 text-black-50'>
              {dayjs(el.date).format('h:m A')}
            </small>
            <br/>
            <span className='w-100 d-inline-block text-muted text-truncate'>
              {el.text}
            </span>
          </Col>
          <Col xs={2}><Button className='rounded-circle' variant="light"><IoArrowRedo/></Button></Col>
        </Row>
      </React.Fragment>
    })
    }
  </>)
};

export default Cmp;

const messagesWidgetType: WidgetType = {
  id: 'messages',
  component: Cmp,
  title: 'New Messages'
}

export {messagesWidgetType}
