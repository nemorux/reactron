import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {remote} from 'electron';
import {Button, Image, Container, Row, Col, Card} from "react-bootstrap";
import {getQuickContacts} from 'src/shared/store/quickContacts/selectors';
import {getContacts} from 'src/shared/store/contacts/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {Form} from 'react-bootstrap';
import {IoSearchOutline} from 'react-icons/io5';
import {updateQuickContacts} from 'src/shared/store/quickContacts/actions';

const Cmp = () => {

  const dispatch = useDispatch();
  const quickContacts = useSelector(getQuickContacts);
  const contacts = useSelector(getContacts);

  const [filter, setFilter] = useState('');
  const [selectedContacts, setSelectedContacts] = useState(quickContacts);
  useEffect(() => {
    remote.getCurrentWindow().on('show', () => {
      if (selectedContacts !== quickContacts)
        setSelectedContacts(quickContacts)
    });

    return (() =>
        remote.getCurrentWindow().removeAllListeners('show' as any)
    ) as any;
  }, []);


  const filteredContacts = useMemo(() => contacts.filter(
    (el) =>
      (el.firstname?.toLowerCase().indexOf(filter.toLowerCase()) !== -1) ||
      (el.lastname?.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  ), [filter, contacts]);

  const onInputChange = useCallback(ev => {
    setFilter(ev.target.value);
  }, []);

  const onContactClick = useCallback(contactNum => () => {
    if ((selectedContacts.indexOf as any)(contactNum) === -1)
      setSelectedContacts([...selectedContacts, contactNum] as any);
    else
      setSelectedContacts(selectedContacts.filter(el => el !== contactNum));
  }, [selectedContacts])

  const onAddClick = useCallback(() => {
    dispatch(updateQuickContacts(selectedContacts));
    remote.getCurrentWindow().close();
  }, [selectedContacts]);

  return (
    <Container className='py-5' style={{overflowX: 'hidden'}}>
      <div className="px-3 shadow-sm bg-white fixed-top border-bottom d-flex align-items-center">
        <IoSearchOutline className='h2 mt-2 ml-1'/>
        <Form.Control size='lg' className='border-0 shadow-none ml-2' onChange={onInputChange} type="text"
                      placeholder="Search..."/>
      </div>
      {filteredContacts.map((contact, idx) => {
        return <React.Fragment key={idx}>
          {!!idx && <hr className='mx-n3'/>}
          <Row onClick={onContactClick(contact.num)} className='align-items-center py-3'>
            <Col xs={1}><Form.Check readOnly checked={(selectedContacts.indexOf as any)(contact.num) !== -1}
                                    style={{transform: 'scale(1.5)'}}/></Col>
            <Col xs={2}><Image className='w-75 px-0' roundedCircle src={contact.photo}/></Col>
            <Col xs={8} className='px-0'>
              {contact.firstname + ' ' + contact.lastname}
              <div className='text-muted'>
                {contact.title}
              </div>
            </Col>
          </Row>
        </React.Fragment>
      })
      }
      <div className="p-2 shadow bg-white fixed-bottom border-top">
        <Button onClick={onAddClick} className='float-right px-3 mr-3'>Add</Button>
      </div>
    </Container>
  )
}

export default Cmp;
