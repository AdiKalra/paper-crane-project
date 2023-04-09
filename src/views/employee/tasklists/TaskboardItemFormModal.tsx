import { Button, Form, Input, Modal, ModalProps } from 'antd';
import React, { useEffect, useRef } from 'react';

import { TaskboardItem } from './TaskboardTypes';

export type TaskboardItemFormValues = Pick<TaskboardItem, 'title' | 'description'>;

type TaskboardItemFormModalProps = Pick<ModalProps, 'visible'> & {
  initialValues: TaskboardItemFormValues;
  onCancel: any;
  onOk: (values: TaskboardItemFormValues) => void;
};

function TaskboardItemFormModal({
  visible,
  initialValues,
  onCancel,
  onOk,
}: TaskboardItemFormModalProps) {
  const [form] = Form.useForm<TaskboardItemFormValues>();

  //@ts-ignore
  const inputRef = useRef<Input>(null);

  useEffect(() => {
    if (visible) {
      // Focus on the first input when the modal is opened
      inputRef.current?.focus();
      form.resetFields();
    }
  }, [form, visible]);

  return (
    <Modal
      title='Add Task'
      visible={visible}
      destroyOnClose
      // To make dynamically changing initialValues work with Form
      forceRender
      onCancel={onCancel}
      onOk={() => form.submit()}
      footer={[
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='ok'
          type='primary'
          onClick={() => form.submit()}
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          Ok
        </Button>,
      ]}
    >
      <Form
        autoComplete='off'
        form={form}
        layout='vertical'
        initialValues={initialValues}
        onFinish={(values) => {
          onOk(values);
          form.resetFields();
          onCancel();
        }}
      >
        <Form.Item
          name='title'
          label='Title'
          rules={[
            { required: true, message: "'Title' is required" },
            {
              max: 100,
              message: "'Title' can not be longer than 100 characters",
            },
          ]}
        >
          <Input ref={inputRef} autoFocus />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[
            { required: true, message: "'Description' is required" },
            {
              max: 400,
              message: "'Description' can not be longer than 400 characters",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TaskboardItemFormModal;
