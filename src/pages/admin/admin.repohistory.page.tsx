import AdminHeader from 'components/Header/adminHeader';
import React from 'react';
import { Link } from 'react-router-dom';

import AdminNavbar from './admin.navbar';
import './admin.repohistory.page.css';

const AdminRepoHistory = () => {
  // bring Database of projects with projects' names
  const projects = [
    { projectId: 1, pName: 'Project1' },
    { projectId: 2, pName: 'Project2' },
    { projectId: 3, pName: 'Project3' },
  ];
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
      </div>
    </div>
  );
};

export default AdminRepoHistory;
