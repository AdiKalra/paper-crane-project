import { DeleteFilled, EditOutlined, EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import React from 'react';

import avatarImg from '../../assets/avatar.jpeg';

const { Meta } = Card;

const VideoCard = ({
  title,
  description,
  type,
  cover,
  link,
  visible,
  toggleVisibility,
  onEdit,
  onDelete,
  isAdmin,
}: {
  title: string;
  description: string;
  type: string[];
  cover: string;
  link: string;
  visible: boolean;
  toggleVisibility?: any;
  onEdit?: any;
  onDelete?: any;
  isAdmin?: boolean;
}) => (
  <Card
    style={{ width: 300 }}
    cover={
      <a href={link}>
        <img alt='example' src={cover} style={{ width: 300 }} />
      </a>
    }
    actions={
      isAdmin === true
        ? [
            visible === true ? (
              <EyeFilled key='shown' onClick={toggleVisibility} />
            ) : (
              <EyeInvisibleFilled onClick={toggleVisibility} key='hidden' />
            ),
            <EditOutlined key='edit' onClick={onEdit} />,
            <DeleteFilled key='delete' onClick={onDelete} />,
          ]
        : // to emp and client pages buttons aren't displayed
          undefined
    }
  >
    <Meta avatar={<Avatar src={avatarImg} />} title={title} description={description} />
  </Card>
);

export default VideoCard;
