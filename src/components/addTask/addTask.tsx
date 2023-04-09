import { PlusOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';
import { task } from 'types/projectDetails/projectDataTypes';

type AddTaskPropType = {
  openTaskItemModal: (itemToEdit: task, id: number) => void;
  id: number;
};
function AddTask({ openTaskItemModal, id }: AddTaskPropType) {
  return (
    <>
      <Form
        name='dynamic_form_nest_item'
        // onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete='off'
      >
        <Form.Item>
          <Button
            type='dashed'
            onClick={() => openTaskItemModal(null, id)}
            block
            icon={<PlusOutlined />}
          >
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddTask;
