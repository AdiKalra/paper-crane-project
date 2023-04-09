import { Select } from 'antd';
import EmpHeader from 'components/Header/empHeader';
import VideoCard from 'components/videoCard/videoCard';
import React from 'react';
import { useState } from 'react';

import { EmpData } from '../../dummyData/empData';
import { empVideoData } from '../../dummyData/empVideoData';
import { projectsVideoData } from '../../dummyData/projectsVideoData';
import EmpNavbar from './emp.navbar';
import './emp.video.page.css';

const EmpVideo = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  // axios: const [empData, setEmpData] = useState({});
  // useEffect(async () => { const result = await axios(URL); setData(result.)}

  // choose an option from a dropbox of employee or projects
  // employee means that a logged in user has at least two roles: 'employee' and 'dev' or 'designer'
  const [data, setData] = useState(
    empVideoData
      .filter((empVideoData) => empVideoData.type.includes(EmpData[0].role))
      .concat(projectsVideoData),
  );
  // handleProjectChange is for the project dropdown (first displayed one)
  const [selectedProjectId, setSelectedProjectId] = useState<any>('Select Project');
  const handleProjectChange = (value) => {
    setSelectedProjectId(value);
    if (value === `employee.${EmpData[0].role}`) {
      setData(empVideoData.filter((empVideoData) => empVideoData.type.includes(EmpData[0].role)));
    } else if (value === 'all') {
      setData(
        empVideoData
          .filter((empVideoData) => empVideoData.type.includes(EmpData[0].role))
          .concat(projectsVideoData),
      );
    } else {
      setData(
        projectsVideoData.filter(
          (projectsEmpVideoData) => projectsEmpVideoData.projectId === value,
        ),
      );
    }
  };

  const videoList = data.map((videoData) => {
    return (
      <VideoCard
        key={videoData.link}
        title={videoData.title}
        description={videoData.description}
        type={videoData.type}
        link={videoData.link}
        cover={videoData.cover}
        visible={videoData.visible}
      />
    );
  });

  const projectOptions: {
    value: any;
    label: string;
  }[] = projects.map((project) => ({ value: project.projectId, label: project.pName }));

  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <div className='buttonBar'>
        {/* Dropdown options for projects */}
        <Select
          value={selectedProjectId}
          defaultValue='Select'
          // from line 20-21 added axios in this file
          //   AdminEmpData is temporary
          options={[
            {
              value: 'all',
              label: 'See All',
            },
            {
              value: `employee.${EmpData[0].role}`,
              label: `Employee / ${EmpData[0].role}`,
            },
          ].concat(projectOptions)}
          style={{ width: 200, marginRight: 15 }}
          onChange={handleProjectChange}
        ></Select>
      </div>
      <div className='videoList'>{videoList}</div>
      <div className='container'>
        <div className='uploadVideo'></div>
      </div>
    </div>
  );
};

export default EmpVideo;
