/* eslint-disable react/prop-types */
import produce from 'immer';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Status } from 'types/projectDetails/projectDataTypes';

import TaskboardCol, { TaskboardColProps } from './TaskboardCol';
import TaskboardItemFormModal, { TaskboardItemFormValues } from './TaskboardItemFormModal';
import { TaskboardItem, TaskboardItemStatus } from './TaskboardTypes';

const generateId = () => Date.now().toString();

const TaskboardRoot = styled.div`
  min-height: 0;
  height: 100%;
  min-width: 800px;
  max-width: 1400px;
  margin: auto;
`;

const TaskboardContent = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

const defaultItems = {
  [TaskboardItemStatus.TO_DO]: [],
  [TaskboardItemStatus.IN_PROGRESS]: [],
  [TaskboardItemStatus.DONE]: [],
};

type TaskboardData = Record<TaskboardItemStatus, TaskboardItem[]>;

function Taskboard({ tasks }) {
  const [itemsByStatus, setItemsByStatus] = useState<TaskboardData>(defaultItems);

  useEffect(() => {
    setItemsByStatus({
      [TaskboardItemStatus.TO_DO]: tasks.filter((task) => task.status === Status.TO_DO),
      [TaskboardItemStatus.IN_PROGRESS]: tasks.filter((task) => task.status === Status.IN_PROGRESS),
      [TaskboardItemStatus.DONE]: tasks.filter((task) => task.status === Status.DONE),
    });
  }, [setItemsByStatus, tasks]);

  const handleDragEnd: DragDropContextProps['onDragEnd'] = ({ source, destination }) => {
    setItemsByStatus((current) =>
      produce(current, (draft) => {
        // dropped outside the list
        if (!destination) {
          return;
        }
        const [removed] = draft[source.droppableId as TaskboardItemStatus].splice(source.index, 1);
        draft[destination.droppableId as TaskboardItemStatus].splice(destination.index, 0, removed);
      }),
    );
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [itemToEdit, setItemToEdit] = useState<TaskboardItem | null>(null);

  const openTaskItemModal = (itemToEdit: TaskboardItem | null) => {
    setItemToEdit(itemToEdit);
    setIsModalVisible(true);
  };

  const closeTaskItemModal = () => {
    setItemToEdit(null);
    setIsModalVisible(false);
  };

  const handleDelete: TaskboardColProps['onDelete'] = ({ status, itemToDelete }) =>
    setItemsByStatus((current) =>
      produce(current, (draft) => {
        draft[status] = draft[status].filter((item) => item.id !== itemToDelete.id);
      }),
    );

  const initialValues = useMemo<TaskboardItemFormValues>(
    () => ({
      title: itemToEdit?.title ?? '',
      description: itemToEdit?.description ?? '',
    }),
    [itemToEdit],
  );

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskboardRoot>
          <TaskboardContent>
            {Object.values(TaskboardItemStatus).map((status) => (
              <TaskboardCol
                key={status}
                status={status}
                items={itemsByStatus[status]}
                onClickAdd={
                  status === TaskboardItemStatus.TO_DO ? () => openTaskItemModal(null) : undefined
                }
                onEdit={openTaskItemModal}
                onDelete={handleDelete}
              />
            ))}
          </TaskboardContent>
        </TaskboardRoot>
      </DragDropContext>
      <TaskboardItemFormModal
        visible={isModalVisible}
        onCancel={closeTaskItemModal}
        onOk={(values) => {
          setItemsByStatus((current) =>
            produce(current, (draft) => {
              if (itemToEdit) {
                // Editing existing item
                const draftItem = Object.values(draft)
                  .flatMap((items) => items)
                  .find((item) => item.id === itemToEdit.id);
                if (draftItem) {
                  draftItem.title = values.title;
                  draftItem.description = values.description;
                }
              } else {
                // Adding new item as "to do"
                draft[TaskboardItemStatus.TO_DO].push({
                  ...values,
                  id: generateId(),
                  assignedEmpIds: [],
                });
              }
            }),
          );
        }}
        initialValues={initialValues}
      />
    </>
  );
}

export default Taskboard;
