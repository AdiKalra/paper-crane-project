import { Button, Modal } from 'antd';
import React from 'react';

const CheckPendingRequestModal = ({ isModalOpen, handleOk, handleCancel }: any) => {
  return (
    <Modal
      title='Pending Requests'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Return
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <div style={{ margin: '14px 0' }}>
        <h2>Request 1</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>Scopes:</span> Login Page with Google Signin,
          Products page, User profile page, Shopping cart page
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Contract End Date:</span> Decemeber 1st, 2023
        </p>
      </div>
      <div style={{ margin: '14px 0' }}>
        <h2>Request 2</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>Scopes:</span> Login Page with Google Signin,
          Shopping cart page
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Contract End Date:</span> Decemeber 1st, 2023
        </p>
      </div>
      <div style={{ margin: '14px 0' }}>
        <h2>Request 3</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>Scopes:</span> Products page, User profile page,
          Shopping cart page
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Contract End Date:</span> Decemeber 1st, 2023
        </p>
      </div>
    </Modal>
  );
};

export default CheckPendingRequestModal;
