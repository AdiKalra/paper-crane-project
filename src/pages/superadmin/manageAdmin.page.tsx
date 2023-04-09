import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space } from 'antd';
import { DataContext } from 'app';
import Header from 'components/Header/Header';
import SuperAdminNavbar from 'components/superAdminNavbar/SuperAdminNavbar';
import React, { useContext, useState } from 'react';

import './manageAdmin.page.css';

function SuperAdmin() {
  const { admins, setAdmins } = useContext(DataContext);
  const [visible, setVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{
    readonly userId: number;
    name: string;
    email: string;
    type: string;
  } | null>();
  const handleEditButton = (admin) => {
    setSelectedAdmin(admin);
    setVisible(true);
  };
  const handleFormSubmit = (values) => {
    setAdmins((prevState) => {
      return prevState.map((admin) => {
        if (admin.userId === selectedAdmin.userId) {
          return {
            ...admin,
            userId: values.userId,
            name: values.name,
            type: values.type,
          };
        }
        return admin;
      });
    });
    setVisible(false);
  };

  const handleDeleteButton = (id: number) => {
    setAdmins((prevState) => {
      return prevState.filter((admin) => admin.userId !== id);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const allAdmins = admins.map((admin, index) => {
    return (
      <div className='admin-row align-center' key={index}>
        <div className='userId align-center'>{admin.userId}</div>
        <div className='name align-center'>{admin.name}</div>
        <div className='details align-center'>{admin.type}</div>

        <div className='button-row'>
          <div className='delete-btn' onClick={() => handleEditButton(admin)}>
            <EditOutlined />
          </div>
          <div className='delete-btn' onClick={() => handleDeleteButton(admin.userId)}>
            <MinusCircleOutlined />
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <Header />
      <SuperAdminNavbar />
      <div className='admin-details-container'>
        <div className='admin-row'>
          <div className='userId heading align-center'>User Id</div>
          <div className='name heading align-center'>Name</div>
          <div className='details heading align-center'>Description</div>
          {/* <button className='delete-btn align-center' onClick={handleDeleteButton}>
            Delete
          </button> */}
        </div>
        <div className='admin-list'>{allAdmins}</div>
        <Modal open={visible} footer={null} onCancel={handleCancel}>
          <div>
            <h2 className='mb-4'>Edit Admin</h2>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout='horizontal'
              onFinish={handleFormSubmit}
              initialValues={selectedAdmin}
            >
              <Form.Item
                label='User Id'
                name='userId'
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Description'
                name='type'
                rules={[{ required: true, message: 'Please enter the name' }]}
              >
                <Input />
              </Form.Item>

              <Space className='space'>
                <Button type='default' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button htmlType='submit' type='primary'>
                  Save
                </Button>
              </Space>
            </Form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default SuperAdmin;
