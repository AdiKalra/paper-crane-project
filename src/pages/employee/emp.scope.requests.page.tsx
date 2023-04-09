import { Button, DatePicker, DatePickerProps, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import EmpHeader from 'components/Header/empHeader';
import { Scopes } from 'dummyData/scopeData';
import React, { useState } from 'react';

import EmpNavbar from './emp.navbar';
import './emp.scope.requests.page.css';

const EmpScopeRequests = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scopeData, setScopeData] = useState(Scopes);
  const [pendingScopeData, setPendingScopeData] = useState(
    scopeData.filter((scope) => scope.status === 'pending'),
  );
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);

  const onWeekChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date === null) {
      setStartDate(null);
      setEndDate(null);
      setWeek(null);
    } else {
      setMonth(null);
      setWeek(date);
      setStartDate(new Date(date.startOf('week').toISOString()));
      setEndDate(new Date(date.endOf('week').toISOString()));
    }
  };
  const onMonthChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date === null) {
      setStartDate(null);
      setEndDate(null);
      setMonth(null);
    } else {
      setWeek(null);
      setMonth(date);
      setStartDate(new Date(date.startOf('month').toISOString()));
      setEndDate(new Date(date.endOf('month').toISOString()));
    }
  };
  return (
    <div>
      <EmpHeader />
      {/* call employee navbar */}
      <EmpNavbar />
      <div className='body'>
        <Tabs defaultActiveKey='1' id='tabs' tabBarStyle={{ marginBottom: 40 }}>
          <TabPane tab='Requests List' key='1'>
            <h2 className='scopeRequestsTitle'>Scope Requests List</h2>
            <div className='scopeRequests'>
              {pendingScopeData.map((scope, i) => {
                return (
                  <div className='scope' key={i}>
                    <p className='columnMedium'>{scope.pName}</p>
                    <p className='columnLarge'>{scope.scopeList}</p>
                    <p className='columnMedium'>{scope.clientName}</p>
                    <p className='columnMedium'>{scope.date}</p>
                    <Button
                      type='text'
                      onClick={() => {
                        const newPendingScopeData = [...pendingScopeData];

                        newPendingScopeData[i] = { ...scope, status: 'approved' };

                        const newScopeData = [...scopeData];
                        newScopeData[newScopeData.findIndex((foundScope) => foundScope === scope)] =
                          { ...scope, status: 'approved' };

                        setPendingScopeData(
                          newPendingScopeData.filter((scope) => scope.status === 'pending'),
                        );
                        setScopeData(newScopeData);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      type='text'
                      onClick={() => {
                        const newPendingScopeData = [...pendingScopeData];

                        newPendingScopeData[i] = { ...scope, status: 'rejected' };

                        const newScopeData = [...scopeData];
                        newScopeData[newScopeData.findIndex((foundScope) => foundScope === scope)] =
                          { ...scope, status: 'rejected' };

                        setPendingScopeData(
                          newPendingScopeData.filter((scope) => scope.status === 'pending'),
                        );
                        setScopeData(newScopeData);
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabPane>
          <TabPane tab='History' key='2'>
            <h2>History of Scope Requests</h2>
            <DatePicker value={month} onChange={onMonthChange} picker='month' />
            <DatePicker value={week} onChange={onWeekChange} picker='week' />
            <div className='scopeHistory'>
              {scopeData
                .filter(
                  (scope) =>
                    scope.status !== 'pending' &&
                    startDate !== null &&
                    startDate.getTime() <= new Date(scope.date).getTime() &&
                    endDate.getTime() >= new Date(scope.date).getTime(),
                )
                .map((scope, i) => {
                  return (
                    <div className='scope' key={i}>
                      <p>{scope.pName}</p>
                      <p>{scope.scopeList}</p>
                      <p>{scope.clientName}</p>
                      <p>{scope.status}</p>
                      <p>{scope.date}</p>
                    </div>
                  );
                })}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default EmpScopeRequests;
