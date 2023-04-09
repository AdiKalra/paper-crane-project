import { EditOutlined } from '@ant-design/icons';
import React from 'react';
import { TaskRowItem } from 'types/projectDetails/adminModatTypes';

import './taskrow.css';

export default function TaskRow({ task, status, assigned, openTaskItemModal }: TaskRowItem) {
  function getProgress() {
    if (status === -1) return '#f45c2e';
    else if (status === 1) return '#30f558';
    else if (status === 0) return '#f4c331';
  }
  return (
    <div className='task'>
      <div className={`status-box`} style={{ backgroundColor: getProgress() }}></div>
      <div className='task-title'>{task}</div>
      <div className='assigned'>{assigned}</div>
      <div className='edit ' onClick={openTaskItemModal}>
        <EditOutlined className='edit' style={{ fontSize: '16px', color: '#000' }} />
      </div>
    </div>
  );
}
