import { Button, Select, Switch, Tabs, TabsProps } from 'antd';
import AdminHeader from 'components/Header/adminHeader';
import { AdminClientData } from 'dummyData/adminClientData';
import { ClientDashboards } from 'dummyData/clientDashboards';
import { projects } from 'dummyData/projectsData';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateClientAccount from 'views/admin/createAccount/admin.clients.createAccount';
import EditClientAccount from 'views/admin/editAccount/admin.client.editAccount';
import { useTheme } from 'views/client/ThemeContext';

import './admin.clients.page.css';
import AdminNavbar from './admin.navbar';

const AdminClients = () => {
  const { theme, setTheme } = useTheme();

  const [clients, setClients] = useState(AdminClientData);
  const [dashboards, setDashboards] = useState(ClientDashboards);

  const [selectedClient, setSelectedClient] = useState<{
    cId: number;
    type: number;
    name: string;
    company: string;
    email: string;
  }>();

  const [selectedProjectId, setSelectedProjectId] = useState<Number>();

  const selectedDashboard = dashboards.find(
    (dashboard) => dashboard.cId === selectedClient?.cId && dashboard.pId === selectedProjectId,
  );

  // column headers for employees list
  const columnHeaders = [
    <div key='headers' className='clientRows'>
      <p className='buttonColumn'>ID</p>
      <p className='columnHeader'>Type</p>
      <p className='columnHeader'>Name</p>
      <p className='columnHeader'>Company</p>
      <p className='columnHeader'>Email</p>
      {/* this empty p is for 'View' buttons' column header */}
      <p className='buttonColumn'></p>
      {/* this empty p is for 'Edit' buttons' column header */}
      <p className='buttonColumn'></p>
    </div>,
  ];

  // empRows will contain the employee arrays below
  const clientRows = [];
  // add employee rows to the empRows
  for (let i = 0; i < clients.length; i++) {
    clientRows.push(
      <div className='clientRows'>
        <p className='buttonColumn'>{clients[i].cId}</p>

        <p className='column'>
          {clients[i].type === 1 ? 'Ongoing' : clients[i].type === 2 ? 'Non-ongoing' : 'undefined'}
        </p>

        <p className='column'>{clients[i].name}</p>

        <p className='column'>{clients[i].company} </p>

        <p className='column'>{clients[i].email}</p>
        {/* edit and delete buttons */}
        <p className='buttonColumn'>
          <button type='button' onClick={() => setSelectedClient(clients[i])}>
            Edit
          </button>
        </p>
        <p className='buttonColumn'>
          <button
            type='button'
            onClick={() =>
              setClients((prevState) => prevState.filter((client) => client.cId !== clients[i].cId))
            }
          >
            Delete
          </button>
        </p>
      </div>,
    );
  }
  const chooseProject = (value: string) => {
    setSelectedClient(clients.find((client) => client.cId === Number(value)));
    setSelectedProjectId(undefined);
  };
  const onProjectChange = (value: number) => {
    setSelectedProjectId(value);
  };

  const onPastProjectChange = (value: boolean) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      showPastProjects: value,
    };
    setDashboards(newDashboards);
  };

  const onProjectCompletionChange = (value: boolean) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      showProjectCompletion: value,
    };
    setDashboards(newDashboards);
  };

  const onToggleThemeChange = (value: boolean) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      theme: value ? 'light' : 'dark',
    };
    setTheme(value ? 'light' : 'dark');
    setDashboards(newDashboards);
  };

  const onProjectRepoChange = (value: number) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      projectRepository: value,
    };
    setDashboards(newDashboards);
  };

  const onClientRepoChange = (value: number) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      clientRepository: value,
    };
    setDashboards(newDashboards);
  };

  const onFontSizeChange = (value: string) => {
    const newDashboards = [...dashboards];

    newDashboards[dashboards.indexOf(selectedDashboard)] = {
      ...selectedDashboard,
      fontSize: value,
    };
    setDashboards(newDashboards);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Accounts',
      children: (
        <div className='container'>
          <ul>
            {columnHeaders} {clientRows}
          </ul>
          {selectedClient ? (
            <EditClientAccount
              firstName={selectedClient.name}
              companyName={selectedClient.company}
              type={selectedClient.type}
              email={selectedClient.email}
              onCancel={() => setSelectedClient(undefined)}
            />
          ) : (
            <CreateClientAccount />
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Edit Dashboard',
      children: (
        <div
          className='dashboardContainer'
          style={{
            backgroundColor: theme === 'light' ? 'white' : 'black',
            color: theme === 'dark' ? 'white' : 'black',
            fontSize:
              selectedDashboard?.fontSize === 'small'
                ? '13px'
                : selectedDashboard?.fontSize === 'medium'
                ? '15px'
                : '20px',
          }}
        >
          <Select
            placeholder='Select Client'
            options={clients.map((client) => {
              return {
                value: client.cId,
                label: client.company,
              };
            })}
            onChange={chooseProject}
          />
          {selectedClient && (
            <Select
              placeholder='Select Project'
              options={projects
                .filter((project) => project.cId === selectedClient.cId)
                .map((project) => {
                  return {
                    value: project.id,
                    label: project.pName,
                  };
                })}
              onChange={onProjectChange}
              value={selectedProjectId}
            />
          )}
          {selectedProjectId && (
            <>
              <div>
                Past Projects
                <Switch
                  checkedChildren='On'
                  unCheckedChildren='Off'
                  checked={selectedDashboard.showPastProjects}
                  onChange={onPastProjectChange}
                />
              </div>
              <div>
                Project Completion
                <Switch
                  checkedChildren='On'
                  unCheckedChildren='Off'
                  checked={selectedDashboard.showProjectCompletion}
                  onChange={onProjectCompletionChange}
                />
              </div>
              <div>
                Toggle Theme
                <Switch
                  checkedChildren='Light'
                  unCheckedChildren='Dark'
                  checked={selectedDashboard.theme === 'light'}
                  onChange={onToggleThemeChange}
                />
              </div>
              <div>
                Project Repository
                <Select
                  placeholder='Select Repository'
                  options={projects
                    .filter((project) => project.cId === selectedClient.cId)
                    .map((project) => {
                      return {
                        value: project.id,
                        label: project.pName,
                      };
                    })}
                  onChange={onProjectRepoChange}
                  value={selectedDashboard.projectRepository}
                />
              </div>
              {/* we don't have enough data for this, so just set it up by using project's repo */}
              <div>
                Client Repository
                <Select
                  placeholder='Select Repository'
                  options={projects
                    .filter((project) => project.cId === selectedClient.cId)
                    .map((project) => {
                      return {
                        value: project.id,
                        label: project.pName,
                      };
                    })}
                  onChange={onClientRepoChange}
                  value={selectedDashboard.clientRepository}
                />
              </div>
              <div>
                Font Size
                <Select
                  placeholder='Select font size'
                  options={[
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ]}
                  onChange={onFontSizeChange}
                  value={selectedDashboard.fontSize}
                />
              </div>
              <div>
                {/* This preview button leads to client's dashboard as a client */}
                <Link
                  target='_blank'
                  to={`/client/dashboard/${selectedClient.type === 1 ? 'ongoing' : 'non-ongoing'}`}
                >
                  <Button>Preview</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <Tabs className='tabsContainer' defaultActiveKey='1' items={items} />
    </div>
  );
};

export default AdminClients;
