import EmpHeader from 'components/Header/empHeader';
import { AdminClientData } from 'dummyData/adminClientData';
import React, { useState } from 'react';
import CreateClientAccount from 'views/admin/createAccount/admin.clients.createAccount';
import EditClientAccount from 'views/admin/editAccount/admin.client.editAccount';

import './emp.clients.page.css';
import EmpNavbar from './emp.navbar';

const EmpClients = () => {
  const [clients, setClients] = useState(AdminClientData);

  const [selectedClient, setSelectedClient] = useState<{
    cId: number;
    type: number;
    name: string;
    company: string;
    email: string;
  }>();

  // column headers for employees list
  const columHeaders = [
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
          {clients[i].type === 1 ? 'Ongoing' : clients[i].type === 2 ? 'Single' : 'undefined'}
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

  return (
    <div>
      <EmpHeader />
      <EmpNavbar />
      <div className='container'>
        <ul>
          {columHeaders} {clientRows}
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
    </div>
  );
};

export default EmpClients;
