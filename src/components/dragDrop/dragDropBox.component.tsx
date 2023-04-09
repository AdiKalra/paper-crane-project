import { Upload, message } from 'antd';
import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

const { Dragger } = Upload;

const DragDropBox = ({ folderPath, updateFolderTree }) => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:8080/uploadFile',
    data: { folderPath },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        updateFolderTree();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className='ant-upload-text'>
        Click or drag file to this area to upload to {folderPath}
      </p>
    </Dragger>
  );
};

DragDropBox.propTypes = {
  folderPath: PropTypes.string.isRequired,
  updateFolderTree: PropTypes.func.isRequired,
};

export default DragDropBox;
