import { Select } from 'antd';
import AdminHeader from 'components/Header/adminHeader';
import { AdminEmpDetailedWorkedHours } from 'dummyData/adminEmpDetailedWorkedHours';
import { EmpData } from 'dummyData/empData';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './admin.emp.workedHours.css';
import AdminNavbar from './admin.navbar';

const AdminEmpWorkedHours = () => {
  const [workedHours] = useState(AdminEmpDetailedWorkedHours);
  const [employees] = useState(EmpData);
  const { empId } = useParams();
  const employee = employees.find((emp) => emp.empId === Number(empId));
  // add current month plus 6 months behind
  const date1 = new Date(); //today

  const date2 = new Date();
  date2.setMonth(date1.getMonth() - 1, 1); // last month

  const date3 = new Date();
  date3.setMonth(date1.getMonth() - 2, 1);

  const date4 = new Date();
  date4.setMonth(date1.getMonth() - 3, 1);

  const date5 = new Date();
  date5.setMonth(date1.getMonth() - 4, 1);

  const date6 = new Date();
  date6.setMonth(date1.getMonth() - 5, 1);
  const [selectedMonth, setSelectedMonth] = useState(date1.toISOString());
  const handleChange = (value: string) => {
    setSelectedMonth(value);
  };
  const listrows = workedHours
    .filter(
      (item) =>
        new Date(item.date).getUTCMonth() === new Date(selectedMonth).getMonth() &&
        new Date(item.date).getFullYear() === new Date(selectedMonth).getFullYear(),
    )
    .map((item) => {
      return (
        <div key={item.date}>
          {item.date} {item.hours} hours
        </div>
      );
    });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <div className='empWorkedHoursContainer'>
        <div className='empWorkedHoursDetails'>
          {employee.firstName} {employee.lastName} has been working in this month for{' '}
          {employee.workedHours} hours
          <Select
            defaultValue='Select Month'
            style={{ width: 150, marginLeft: 10 }}
            onChange={handleChange}
            options={[
              { value: date1.toISOString(), label: 'Current Month' },
              { value: date2.toISOString(), label: monthNames[date2.getMonth()] },
              { value: date3.toISOString(), label: monthNames[date3.getMonth()] },
              { value: date4.toISOString(), label: monthNames[date4.getMonth()] },
              { value: date5.toISOString(), label: monthNames[date5.getMonth()] },
              { value: date6.toISOString(), label: monthNames[date6.getMonth()] },
            ]}
          />
        </div>

        <div>{listrows}</div>
      </div>
    </div>
  );
};

export default AdminEmpWorkedHours;
