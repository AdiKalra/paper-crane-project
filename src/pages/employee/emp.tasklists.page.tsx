import { gray } from '@ant-design/colors';
import { Select } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import EmpHeader from 'components/Header/empHeader';
import React, { useState } from 'react';
import styled from 'styled-components';

import { projects } from '../../dummyData/projectsData';
import Taskboard from '../../views/employee/tasklists/Taskboard';
import EmpNavbar from './emp.navbar';

const StyledLayout = styled(Layout)`
  background-color: white;
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc, 
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledContent = styled(Content)`
  background-color: ${gray.primary[1]};
`;

function EmpTaskLists() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <StyledLayout>
        <StyledContent>
          <Select
            defaultValue={projects[0].id}
            onChange={(value: number) => {
              setSelectedProject(projects.find((project) => project.id === value));
            }}
            options={projects.map((project) => {
              return { value: project.id, label: project.pName };
            })}
          />
          <Taskboard tasks={selectedProject.tasks} />
        </StyledContent>
      </StyledLayout>
    </div>
  );
}

export default EmpTaskLists;
