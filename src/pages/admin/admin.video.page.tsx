import { Button, Modal, Select, message } from 'antd';
import AdminHeader from 'components/Header/adminHeader';
import UploadVideo from 'components/uploadVideo/selectFile.component';
import VideoCard from 'components/videoCard/videoCard';
import React from 'react';
import { useState } from 'react';

import trainingImg from '../../assets/training.jpeg';
import { empVideoData } from '../../dummyData/empVideoData';
import { projectsVideoData } from '../../dummyData/projectsVideoData';
import AdminNavbar from './admin.navbar';
import './admin.video.page.css';

const AdminVideo = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  // choose an option from a dropbox of employee types or projects
  // employees mean all employees can see the video list
  // projects mean videos for the people who are related to that project
  const [data, setData] = useState([...empVideoData, ...projectsVideoData]);

  const handleChange = (value) => {
    setSelectedProjectId('Select Project');
    setSelectedProjectAudience('Select');
    if (value === 'developer') {
      setData(empVideoData.filter((devVideoData) => devVideoData.type.includes('developer')));
    } else if (value === 'designer') {
      setData(
        empVideoData.filter((designerVideoData) => designerVideoData.type.includes('designer')),
      );
    } else if (value === 'employees') {
      setData(
        empVideoData.filter(
          (empVideoData) =>
            empVideoData.type.includes('developer') && empVideoData.type.includes('designer'),
        ),
      );
    }
  };

  // handleProjectChange is for the project dropdown (first displayed one)
  const [selectedProjectId, setSelectedProjectId] = useState<any>('Select Project');
  const [selectedProjectAudience, setSelectedProjectAudience] = useState('Select');
  const handleProjectChange = (value) => {
    setSelectedProjectId(value);
    setSelectedProjectAudience('Select');
    setData(
      projectsVideoData.filter((projectsEmpVideoData) => projectsEmpVideoData.projectId === value),
    );
  };

  // handleClientVideo is for the project-client dropdown
  // after choosing one project from first dropdown
  const handleProjectVideo = (value: string) => {
    setData(
      projectsVideoData.filter(
        (clientVideoData) =>
          clientVideoData.projectId === selectedProjectId && clientVideoData.type.includes(value),
      ),
    );
    setSelectedProjectAudience(value);
  };

  const [clickedData, setClickedData] = useState<any>();
  const [clickedI, setClickedI] = useState<any>();
  const videoList = data.map((videoData, i) => {
    return (
      <VideoCard
        isAdmin={true}
        onEdit={() => {
          setClickedData(videoData);
          setClickedI(i);
          showEditModal();
        }}
        onDelete={() => {
          setClickedData(videoData);
          setClickedI(i);
          showDeleteModal();
        }}
        key={videoData.link}
        title={videoData.title}
        description={videoData.description}
        type={videoData.type}
        link={videoData.link}
        cover={videoData.cover}
        visible={videoData.visible}
        toggleVisibility={() => {
          const newVideoData = { ...videoData };

          if (newVideoData.visible === true) {
            newVideoData.visible = false;
          } else {
            newVideoData.visible = true;
          }

          const newData = [...data];

          newData[i] = newVideoData;

          setData(newData);
        }}
      />
    );
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const [uploading, setUploading] = useState(false);

  const handleUpload = (values) => {
    const formData = new FormData();
    values.fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    values.thumbnailList.forEach((file) => {
      formData.append('files[]', file);
    });
    // setUploading(true);
    fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        // setUploading(false);
        setIsModalOpen(false);
        // uploading the new video here
        const newData = [...data];
        newData.push({ ...values, cover: trainingImg });
        setData(newData);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEdit = (values) => {
    setIsEditModalOpen(false);
    // editing a video here
    const newData = [...data];

    newData[clickedI] = { ...newData[clickedI], ...values };

    setData(newData);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    // deleting a video here
    const newData = [...data];

    newData.splice(clickedI, 1);

    setData(newData);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='buttonBar'>
        {/* Dropdown options for projects */}
        <Select
          value={selectedProjectId}
          defaultValue='Select Project'
          options={projects.map((project) => ({ value: project.projectId, label: project.pName }))}
          style={{ width: 200, marginRight: 15 }}
          onChange={handleProjectChange}
        ></Select>
        {/* Dropdown options for a selected project */}
        {selectedProjectId !== 'Select Project' && (
          <Select
            value={selectedProjectAudience}
            defaultValue='Select'
            options={[
              { value: 'client', label: 'Client' },
              { value: 'emp', label: 'Employee' },
            ]}
            style={{ width: 200, marginRight: 15 }}
            onChange={handleProjectVideo}
          ></Select>
        )}
        /{/* Dropdown options for employees */}
        <Select
          defaultValue='Select Role'
          options={[
            { value: 'developer', label: 'Developers' },
            { value: 'designer', label: 'Designers' },
            { value: 'employees', label: 'Employees' },
          ]}
          style={{ width: 200, marginLeft: 15 }}
          onChange={handleChange}
        ></Select>
        {/* add button for uploading a video */}
        <Button
          style={{ backgroundColor: 'black', color: 'white', float: 'right' }}
          onClick={showModal}
        >
          Add
        </Button>
        {/* a popup after clicking Add button */}
        <Modal
          title='Upload a training video'
          open={isModalOpen}
          onOk={handleUpload}
          onCancel={handleCancel}
          footer={[]}
          width={600}
        >
          <UploadVideo handleFinish={handleUpload} handleCancel={handleCancel} />
        </Modal>
        {/* a popup after clicking Edit button on a video card */}
        <Modal
          title='Edit a training video'
          open={isEditModalOpen}
          onOk={handleEdit}
          onCancel={handleEditCancel}
          footer={[]}
          width={600}
        >
          <UploadVideo
            data={clickedData}
            handleFinish={handleEdit}
            handleCancel={handleEditCancel}
          />
        </Modal>
        {/* a popup after clicking Delete button on a video card */}
        <Modal
          title='Delete a training video'
          open={isDeleteModalOpen}
          onOk={handleDelete}
          onCancel={handleDeleteCancel}
          footer={[
            <Button key='cancel' onClick={handleDeleteCancel}>
              Cancel
            </Button>,
            <Button
              key='delete'
              onClick={handleDelete}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              Delete
            </Button>,
          ]}
        >
          Are you sure?
        </Modal>
      </div>
      <div className='videoList'>{videoList}</div>
      <div className='container'>
        <div className='uploadVideo'></div>
      </div>
    </div>
  );
};

export default AdminVideo;
