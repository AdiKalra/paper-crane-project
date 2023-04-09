import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Button, Modal } from 'antd';
import AdminHeader from 'components/Header/adminHeader';
import React, { useState } from 'react';

import { timeoffRequests } from '../../dummyData/timeoffRequests';
import './admin.cal.page.css';
import AdminNavbar from './admin.navbar';

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const AdminCalendar = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(timeoffRequests);
  const events = data
    .filter((request) => request.status !== 'rejected')
    .map((request) => ({
      // request.type means displaying a role
      title:
        request.status === 'pending'
          ? `Pending ${request.name} ${request.type}`
          : `Time-off ${request.name} ${request.type}`,
      start: request.startDate,
      end: request.endDate,
      backgroundColor: request.status === 'pending' ? 'gray' : '#00CED1',
    }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequest = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //  remember which request was to be rejected
  const [areYouSureData, setAreYouSureData] = useState<any>();

  const requestList = data
    .filter((request) => 'pending' === request.status)
    .map((request) => {
      return (
        <div key={request.userId}>
          <span>
            {request.name}({request.type})
          </span>
          <span>
            {request.startDate}
            {request.endDate}
          </span>
          {/* Approve button */}
          <Button
            key='approve'
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => {
              setData((previousData) => {
                const newData = previousData.slice();

                for (let i = 0; i < newData.length; i++) {
                  // Checking userId and startDate due to one employee can have several time-off requests
                  // which have different period times.
                  if (
                    newData[i].userId === request.userId &&
                    newData[i].startDate === request.startDate
                  ) {
                    newData[i].status = 'approved';
                  }
                }
                return newData;
              });
            }}
          >
            Approve
          </Button>
          {/* Reject button */}
          <Button
            key='reject'
            onClick={() => {
              if (areYouSureData === request) {
                setData((previousData) => {
                  const newData = previousData.slice();
                  for (let i = 0; i < newData.length; i++) {
                    // Checking userId and startDate due to one employee can have several time-off requests
                    // which have different period times.
                    if (
                      newData[i].userId === request.userId &&
                      newData[i].startDate === request.startDate
                    ) {
                      newData[i].status = 'rejected';
                    }
                  }
                  return newData;
                });
              } else {
                setAreYouSureData(request);
              }
            }}
          >
            {/* when a user click 'Reject' button, then it changes to 'Are you sure?' */}
            {areYouSureData === request ? `Are you sure?` : `Reject`}
          </Button>
        </div>
      );
    });

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='calendar'>
        <Modal
          title='Pending Time-Off Requests'
          open={isModalOpen}
          onOk={handleRequest}
          onCancel={handleCancel}
          width={1000}
          footer={[
            <Button key='done' onClick={handleCancel}>
              Done
            </Button>,
          ]}
        >
          <div>{requestList}</div>
        </Modal>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          customButtons={{
            Request: {
              text: `New Requests (${
                data.filter((request) => 'pending' === request.status).length
              })`,
              click: () => {
                setIsModalOpen(true);
              },
            },
          }}
          headerToolbar={{
            right: 'Request today prev,next',
          }}
        />
      </div>
    </div>
  );
};

export default AdminCalendar;
