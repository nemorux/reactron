import React from "react";
import dayjs from "dayjs";
import WidgetType from "src/shared/types/WidgetType";
import {calls, contacts} from 'mocks/datas.mock';
import {Button, Col, Image, Row} from "react-bootstrap";
import cal from 'dayjs/plugin/calendar';
import {IoCall} from "react-icons/io5";
import {FiArrowUpRight, FiArrowDownLeft} from "react-icons/fi";

dayjs.extend(cal);

function getContact(num) {
  return contacts.find(el => el.num === num);
}

const Cmp = () => {
  return (<>
    {calls.map((el, idx) => {
      const contact = (getContact(el.num) as any);
      const t = dayjs(el.date);
      return <React.Fragment key={idx}>
        {!!idx && <hr/>}
        <Row className='align-items-center py-3'>
          <Col xs={3}><Image className='w-75' roundedCircle src={contact.photo}/></Col>
          <Col xs={7} className='px-0'>
            {contact.firstname + ' ' + contact.lastname}
            <br/>
            <small className={el.type === 2 ? 'text-danger' : 'text-success'}>
              {[<FiArrowDownLeft/>, <FiArrowUpRight/>, <FiArrowDownLeft/>][el.type]}</small>
            <small className='ml-1 text-black-50'>
              {t.calendar()}
            </small>
          </Col>
          <Col xs={2}>
            <Button size='sm' className='shadow-sm text-primary' variant="light">
              <IoCall/>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    })
    }
  </>)
};

export default Cmp;

const callsWidgetType: WidgetType = {
  id: 'calls',
  component: Cmp,
  title: 'Recent Calls'
}

export {callsWidgetType}
