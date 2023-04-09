import AdminHeader from 'components/Header/adminHeader';
import { EmpData } from 'dummyData/empData';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateEmpAccount from 'views/admin/createAccount/admin.emp.createAccount';
import EditEmpAccount from 'views/admin/editAccount/admin.emp.editAccount';

import './admin.emp.page.css';
import AdminNavbar from './admin.navbar';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState(EmpData);

  const [selectedEmployee, setSelectedEmployee] = useState<{
    empId: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
  }>();

  // column headers for employees list
  const columHeaders = [
    <div key='headers' className='empRows'>
      <p className='columnHeaderSmall'>ID</p>
      <p className='columnHeader'>First Name</p>
      <p className='columnHeader'>Last Name</p>
      <p className='columnHeader'>Role</p>
      <p className='columnHeader'>Worked Hours</p>
      {/* these empty p are for 'buttons' column header */}
      <p className='buttonColumn'></p>
      <p className='buttonColumn'></p>
      <p className='buttonColumn'></p>
    </div>,
  ];

  // empRows will contain the employee arrays below
  const empRows = [];
  // add employee rows to the empRows
  for (let i = 0; i < employees.length; i++) {
    empRows.push(
      <div className='empRows'>
        <p className='buttonColumn'>{employees[i].empId}</p>

        <p className='column'>{employees[i].firstName}</p>

        <p className='column'>{employees[i].lastName} </p>

        <p className='column'>{employees[i].role}</p>

        <p className='column'>{employees[i].workedHours}</p>

        <p className='buttonColumn'>
          <Link to={`/admin/employees/${employees[i].empId}/workedhours`}>
            <button type='button'>View</button>
          </Link>
        </p>
        {/* edit button */}
        <p className='buttonColumn'>
          <button type='button' onClick={() => setSelectedEmployee(employees[i])}>
            Edit
          </button>
        </p>
        {/* delete button */}
        <p className='buttonColumn'>
          <button
            type='button'
            onClick={() =>
              setEmployees((prevState) => {
                return prevState.filter((emp) => emp.empId !== employees[i].empId);
              })
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
      <AdminHeader />
      <AdminNavbar />
      <div className='containerAdminEmp'>
        <ul>
          {columHeaders} {empRows}
        </ul>
        {selectedEmployee ? (
          <EditEmpAccount
            firstName={selectedEmployee.firstName}
            lastName={selectedEmployee.lastName}
            role={selectedEmployee.role}
            email={selectedEmployee.email}
            onCancel={() => setSelectedEmployee(undefined)}
          />
        ) : (
          <CreateEmpAccount />
        )}
      </div>
    </div>
  );
};

export default AdminEmployees;
