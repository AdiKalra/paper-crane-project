import { DataContext } from 'app';
import AdminHeader from 'components/Header/adminHeader';
import ProjectRow from 'components/projectrow/ProjectRow';
import { useContext } from 'react';
import React from 'react';

import '../../components/progressbar/style.css';
import AdminNavbar from './admin.navbar';
import './admin.projects.page.css';

export default function AdminProjects(props) {
  const { projects } = useContext(DataContext);

  const listRows = projects.map((project) => {
    return (
      <ProjectRow
        id={project.id}
        title={project.pName}
        description={project.description}
        estimatedHours={project.estimatedHours}
        currentWorkedHours={project.currentWorkedHours}
        key={project.id}
      />
    );
  });
  return (
    <>
      <AdminHeader />
      <AdminNavbar />
      <div className='justify-center'>
        <ul className='content--container'>{listRows}</ul>
      </div>
    </>
  );
}
