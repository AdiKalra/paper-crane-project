import AdminHeader from 'components/Header/adminHeader';
// import DragDropBox from 'components/dragDrop/dragDropBox.component';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import AdminNavbar from './admin.navbar';
import './admin.repo.page.css';

const AdminRepository = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
  // dropdown for selecting a specific project
  const [selectedProject, setSelectedProject] = useState(projects[0].projectId);
  const dropdownList = projects.map((project) => {
    return (
      <option key={project.projectId} value={project.projectId}>
        {project.pName}
      </option>
    );
  });

  // read the project list
  const projectList = projects.map((project) => {
    return (
      <div key={project.projectId}>
        <Link to={`/admin/repository/repohistory/${project.projectId}`}>{project.pName}</Link>
      </div>
    );
  });
  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='container'>
        <div className='repoProjectList'>{projectList}</div>
        <div className='uploadVideo'>
          <select
            className='dropdown'
            value={selectedProject}
            onChange={(e) => setSelectedProject(Number(e.target.value))}
          >
            {dropdownList}
          </select>
          {/* <DragDropBox /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminRepository;
