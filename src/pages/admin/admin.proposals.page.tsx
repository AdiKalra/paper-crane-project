import { FileTextOutlined, LinkOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Tabs, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import TabPane from 'antd/es/tabs/TabPane';
import AdminHeader from 'components/Header/adminHeader';
import { proposalsHistoryData } from 'dummyData/proposalsHistoryData';
import React, { useState } from 'react';

import AdminNavbar from './admin.navbar';
import './admin.proposals.page.css';

const AdminProposals = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true);
    // we can edit fetch part later when we implement API
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onFinish = (values) => {
    // contach to back-end to send an email here
  };
  const onFinishFailed = (errorInfo) => {
    alert('Failed');
  };

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <Tabs defaultActiveKey='1' id='tabs' tabBarStyle={{ marginBottom: 40 }}>
        <TabPane tab='Send a Proposal' key='1'>
          <div className='proposalForm'>
            <Form
              name='form'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ width: '60%' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label='Subject'
                name='subject'
                rules={[{ required: true, message: 'Please fill up the subject!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label='From' name='from'>
                {/* This input is holding Paper Crane customer service email */}
                <Input disabled defaultValue='papercrane@google.com' />
              </Form.Item>
              <Form.Item
                label='Client Email'
                name='cemail'
                rules={[{ required: true, message: `Enter the client's email` }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Message'
                name='message'
                rules={[{ required: true, message: 'Enter your message' }]}
              >
                <TextArea rows={15} />
              </Form.Item>
              <Form.Item label='Proposal Link' name='proposallink'>
                <Input />
              </Form.Item>
              <Form.Item label='Upload a file' name='file'>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                  <Button
                    type='primary'
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                      backgroundColor: 'black',
                      color: 'white',
                      marginTop: 16,
                    }}
                  >
                    {uploading ? 'Uploading' : 'Start Upload'}
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item noStyle>
                <div className='buttonContainer'>
                  <Button htmlType='submit' style={{ backgroundColor: 'black', color: 'white' }}>
                    Send
                  </Button>
                  <Button htmlType='button'>Cancel</Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab='Proposals History' key='2'>
          {proposalsHistoryData.map((proposal) => (
            <div className='historyContainer' key={proposal.id}>
              {proposal.subject}, {proposal.sentDate}, {proposal.clientEmail}{' '}
              {proposal.file ? (
                <a href={proposal.file}>
                  <Button icon={<FileTextOutlined />}></Button>
                </a>
              ) : proposal.link ? (
                <a href={proposal.link}>
                  <Button icon={<LinkOutlined />}></Button>
                </a>
              ) : null}
            </div>
          ))}
        </TabPane>
      </Tabs>
    </div>
  );
};
export default AdminProposals;
