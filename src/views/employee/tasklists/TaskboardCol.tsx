import { gray } from '@ant-design/colors';
import { Button, Card } from 'antd';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { StrictModeDroppable } from './StrictModeDroppable';
import TaskboardItemCard, { TaskboardItemCardProps } from './TaskboardItemCard';
import { TaskboardItem, TaskboardItemStatus } from './TaskboardTypes';

const TaskboardColRoot = styled(Card)`
  background-color: white;
  border-width: 2px;
  user-select: none;
  flex: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  // To force each flex item to have equal width
  // even if they have long texts with no spaces etc.
  min-width: 0;
  > .ant-card-body {
    overflow: hidden;
    height: 100%;
    padding: 0;
  }
`;

interface DroppableRootProps {
  isDraggingOver: boolean;
}

const DroppableRoot = styled.div<DroppableRootProps>`
  height: 100%;
  overflow-y: auto;
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? gray.primary[2] : gray.primary[1])};
`;

export type TaskboardColProps = Pick<TaskboardItemCardProps, 'onEdit' | 'onDelete'> & {
  items: TaskboardItem[];
  status: TaskboardItemStatus;
  onClickAdd?: any;
};

function TaskboardCol({ items, status, onClickAdd, onEdit, onDelete }: TaskboardColProps) {
  return (
    <TaskboardColRoot
      title={`${status} (${items.length})`}
      extra={
        onClickAdd && (
          <Button
            type='primary'
            style={{ background: 'black', color: 'white' }}
            onClick={onClickAdd}
          >
            Add
          </Button>
        )
      }
    >
      <StrictModeDroppable droppableId={status}>
        {(provided, snapshot) => (
          <DroppableRoot
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      key={item.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskboardItemCard
                        item={item}
                        status={status}
                        isDragging={snapshot.isDragging}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </DroppableRoot>
        )}
      </StrictModeDroppable>
    </TaskboardColRoot>
  );
}

export default TaskboardCol;
