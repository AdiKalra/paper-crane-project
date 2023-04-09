import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import React from 'react';

const { Option } = Select;

// UploadVideo for uploading or editing video cards
const UploadVideo = ({ data, handleCancel, handleFinish, handleFinishFailed }: any) => {
  const [fileList, setFileList] = useState([]);
  const [thumbnailList, setThumbnailList] = useState([]);

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
    fileList: fileList,
  };
  const thumbnailProps = {
    onRemove: (file) => {
      const index = thumbnailList.indexOf(file);
      const newThumbnailList = thumbnailList.slice();
      newThumbnailList.splice(index, 1);
      setThumbnailList(newThumbnailList);
    },
    beforeUpload: (file) => {
      setThumbnailList([...thumbnailList, file]);
      return false;
    },
    fileList: thumbnailList,
  };
  const onCancel = () => {
    setThumbnailList([]);
    setFileList([]);
    handleCancel();
  };
  const onFinish = (values) => {
    form.resetFields();
    setThumbnailList([]);
    setFileList([]);
    handleFinish({ ...values, fileList, thumbnailList });
  };
  const onFinishFailed = (errorInfo) => {
    setThumbnailList([]);
    setFileList([]);
    alert('Failed');
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data, form]);

  return (
    <>
      <Form
        form={form}
        name='form'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please fill up the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Type' name='type' rules={[{ required: true }]}>
          <Select placeholder='Select a type'>
            <Option value='project-client'>Project - Client </Option>
            <Option value='project-employee'>Project - Employee </Option>
            <Option value='employees'>Employees</Option>
            <Option value='developers'>Developers</Option>
            <Option value='designers'>Designers</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please fill up the description!' }]}
        >
          <TextArea rows={7} />
        </Form.Item>
        <Form.Item label='Video Link' name='link'>
          <Input />
        </Form.Item>
        <Form.Item label='Upload a file' name='file'>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item label='Upload a thumbnail' name='thumbnail'>
          <Upload {...thumbnailProps}>
            <Button icon={<UploadOutlined />}>Select Photo</Button>
          </Upload>
        </Form.Item>
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>
        {data ? (
          <Button key='edit' htmlType='submit' style={{ backgroundColor: 'black', color: 'white' }}>
            Edit
          </Button>
        ) : (
          <Button
            key='upload'
            htmlType='submit'
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Upload
          </Button>
        )}
      </Form>
    </>
  );
};
export default UploadVideo;
