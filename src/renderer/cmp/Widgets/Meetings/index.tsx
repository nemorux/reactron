import React from "react";
import dayjs from "dayjs";
import WidgetType from "src/shared/types/WidgetType";
import {meetings} from 'mocks/datas.mock';
import {Button} from "react-bootstrap";
import {FiClock} from "react-icons/fi";

const Cmp = () => {
  return (<>
    {meetings.map((el, idx) => {
      return <React.Fragment key={idx}>
        {!!idx && <hr/>}
        <div className='d-flex align-items-center py-3'>
          <div className='d-flex flex-column'>
            <span className='text-truncate'>{el.caption}</span>
            <small className='text-black-50'>
              <FiClock className='mr-2'/>
              {dayjs(el.from).format('h:m A') + ' - ' + dayjs(el.to).format('h:m A')}
            </small>
          </div>
          {!!idx ?
            <Button size='sm' variant='light' className='shadow-sm ml-auto text-primary'>Join</Button> :
            <>
              <Button size='sm' variant='light' className='shadow-sm ml-auto text-danger'>Reject</Button>
              <Button size='sm' variant='light' className='shadow-sm ml-2 text-success'>Accept</Button>
            </>
          }
        </div>
      </React.Fragment>
    })
    }
  </>)
};

export default Cmp;

const meetingsWidgetType: WidgetType = {
  id: 'meetings',
  component: Cmp,
  title: 'Venu Meetings Today'
}

export {meetingsWidgetType}
