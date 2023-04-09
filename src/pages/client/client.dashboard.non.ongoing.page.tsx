import { message } from 'antd';
import CheckPendingRequestModal from 'components/CheckPendingRequestModal/CheckPendingRequestModal';
import DashboardHeader from 'components/Header/dashboardHeader';
import SendRequestModal from 'components/SendRequestModal/SendRequestModal';
import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import './client.dashboard.ongoing.page.css';

const ClientDashboardNonOnGoingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckPendingRequestModalOpen, setIsCheckPendingRequestModalOpen] = useState(false);
  const [scopes, setScopes] = useState([
    {
      id: 1,
      name: 'Login Page with Google Signin',
    },
    {
      id: 2,
      name: 'Products page',
    },
    {
      id: 3,
      name: 'User profile page',
    },
    {
      id: 4,
      name: 'Shopping cart page',
    },
  ]);

  const handleOk = () => {
    setIsModalOpen(false);
    message.success('Request sent successfully');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCheckPendingRequestOk = () => {
    setIsCheckPendingRequestModalOpen(false);
  };

  const handleCheckPendingRequestCancel = () => {
    setIsCheckPendingRequestModalOpen(false);
  };

  const scopeChangeHandler = (values: any) => {
    setScopes(values);
  };

  return (
    <div>
      <SendRequestModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        onChangeScopes={scopeChangeHandler}
        scopes={scopes}
      />
      <CheckPendingRequestModal
        isModalOpen={isCheckPendingRequestModalOpen}
        handleOk={handleCheckPendingRequestOk}
        handleCancel={handleCheckPendingRequestCancel}
      />
      <DashboardHeader />
      <div className='dashboard-ctn'>
        <h1>Dashboard</h1>
        <div className='grid-ctn'>
          <div>
            <h2>Current Project</h2>
            <div className='project-ctn'>
              <h3>Project 1</h3>
              <p>Start Date: April 1st, 2023</p>
              <p>Contract End Date: Decemeber 1st, 2023</p>
            </div>
          </div>
          <div>
            <h2>Scopes</h2>
            <div className='project-ctn scope'>
              {scopes.map((scope, index) => (
                <p key={index}>{scope.name}</p>
              ))}
            </div>
          </div>
          <div>
            <div className='btn__ctn'>
              <button className='secondary__btn' onClick={() => setIsModalOpen(true)}>
                Send Request
              </button>
              <button
                className='secondary__btn'
                onClick={() => setIsCheckPendingRequestModalOpen(true)}
              >
                Check Pending Requests
              </button>
            </div>
            <div>
              <button className='primary__btn'>View Repository</button>
            </div>
          </div>
          <div>
            <h2>Past Project</h2>
            <div className='project-ctn projects'>
              <div className='project-ctn-item'>
                <h3>Project 4</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 5</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 4</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
              <div className='project-ctn-item'>
                <h3>Project 5</h3>
                <p>Start Date: April 1st, 2023</p>
                <p>Contract End Date: Decemeber 1st, 2023</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Project Completion</h2>
            <div className='progress-ctn'>
              <h2>Project 1</h2>
              <div style={{ width: 170, height: 170 }}>
                <CircularProgressbar value={33} text={`${33}%`} />
              </div>
            </div>
          </div>
          <div>
            <h2>Training/Offboarding videos</h2>
            <div className='training-ctn'>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 1 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 2 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 3 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 4 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 1 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 2 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 1 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 2 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 3 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 4 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 1 for the clients
              </a>
              <a
                href='https://youtube.com/#1'
                target='_blank'
                rel='noreferrer'
              >
                Training Video 2 for the clients
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardNonOnGoingPage;
