// import admin pages
import { adminsData } from 'dummyData/adminData';
import AdminCalendar from 'pages/admin/admin.cal.page';
import AdminClients from 'pages/admin/admin.clients.page';
import AdminEmployees from 'pages/admin/admin.emp.page';
import AdminEmpWorkedHours from 'pages/admin/admin.emp.workedHours';
import AdminProjectDetails from 'pages/admin/admin.project.details.page';
import AdminProjects from 'pages/admin/admin.projects.page';
import AdminProposals from 'pages/admin/admin.proposals.page';
import AdminRepository from 'pages/admin/admin.repo.page';
import AdminRepoHistory from 'pages/admin/admin.repohistory.page';
import AdminVideo from 'pages/admin/admin.video.page';
import ClientDashboardNonOnGoingPage from 'pages/client/client.dashboard.non.ongoing.page';
import ClientDashboardOnGoingPage from 'pages/client/client.dashboard.ongoing.page';
//import client pages
import ClientProjects from 'pages/client/client.projects.page';
import ClientRepository from 'pages/client/client.repo.page';
// import employee pages
import EmpCalendar from 'pages/employee/emp.cal.page';
import EmpClients from 'pages/employee/emp.clients.page';
import EmpProjectDetails from 'pages/employee/emp.project.details.page';
import EmpProjects from 'pages/employee/emp.projects.page';
import EmpScopeRequests from 'pages/employee/emp.scope.requests.page';
import EmpTaskLists from 'pages/employee/emp.tasklists.page';
import EmpVideo from 'pages/employee/emp.video.page';
import ForgotPasswordPage from 'pages/forgot-password/forgot-password.page';
import Login from 'pages/login/login.page';
import ResetPasswordPage from 'pages/reset-password/reset-password.page';
import ResetSuccessPage from 'pages/reset-success/reset-success.page';
import AddAdmin from 'pages/superadmin/addAdmin.page';
import SuperAdmin from 'pages/superadmin/manageAdmin.page';
import React, { createContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataContextType, admin, projectList } from 'types/projectDetails/projectDataTypes';
import { useTheme } from 'views/client/ThemeContext';

import { projects as projectsData } from './dummyData/projectsData';

export const DataContext = createContext<DataContextType | null>(null);

export const App = () => {
  const [admins, setAdmins] = useState<admin | null>(adminsData);
  const [projects, setProjects] = useState<projectList | null>(projectsData);
  const { theme } = useTheme();

  return (
    <div
      className='App'
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'dark' ? 'white' : 'black',
      }}
    >
      <DataContext.Provider value={{ admins, setAdmins, projects, setProjects }}>
        <BrowserRouter>
          <Routes>
            {/* Comment out few pages until working on it */}
            {/* <Route exact path='/login' element={<Login />}></Route> */}
            {/* <Route exact path='/client/projects' element={<ClientProjects />}></Route> */}
            {/* <Route exact path="/logout" element={<Logout />} /> </Route> */}

            {/* These routes are for admins */}
            <Route
              path='/client/dashboard/ongoing'
              element={<ClientDashboardOnGoingPage />}
            ></Route>
            <Route
              path='/client/dashboard/non-ongoing'
              element={<ClientDashboardNonOnGoingPage />}
            ></Route>
            <Route path='/admin/projects' element={<AdminProjects />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/forgot-password' element={<ForgotPasswordPage />}></Route>
            <Route path='/reset-password' element={<ResetPasswordPage />}></Route>
            <Route path='/reset-success' element={<ResetSuccessPage />}></Route>
            <Route path={`/admin/project/:projectid`} element={<AdminProjectDetails />}></Route>
            <Route path='/admin/video' element={<AdminVideo />}></Route>
            <Route path='/admin/proposals' element={<AdminProposals />}></Route>

            <Route path='/admin/repository' element={<AdminRepository />}></Route>
            <Route
              path='/admin/repository/repohistory/:projectId'
              element={<AdminRepoHistory />}
            ></Route>

            <Route path='/admin/employees' element={<AdminEmployees />}></Route>
            <Route
              path={`/admin/employees/:empId/workedhours`}
              element={<AdminEmpWorkedHours />}
            ></Route>
            <Route path='/admin/clients' element={<AdminClients />}></Route>
            <Route path='/admin/calendar' element={<AdminCalendar />}></Route>
            {/* path='*' is for temporary */}
            <Route path='*' element={<Navigate to='/admin/projects' />}></Route>

            {/* path for SuperAdmin pages */}
            <Route path='/superadmin/showadmins' element={<SuperAdmin />}></Route>
            <Route path='/superadmin/addadmin' element={<AddAdmin />}></Route>

            {/* path for Employee pages */}
            <Route path='/employee/projects' element={<EmpProjects />}></Route>
            <Route
              path='/employee/project/:projectId/details'
              element={<EmpProjectDetails />}
            ></Route>
            <Route path='/employee/video' element={<EmpVideo />}></Route>

            <Route path='/employee/tasklist' element={<EmpTaskLists />}></Route>
            <Route path='/employee/calendar' element={<EmpCalendar />}></Route>
            <Route path='/employee/scopeRequests' element={<EmpScopeRequests />}></Route>
            <Route path='/employee/clients' element={<EmpClients />}></Route>

            {/* path for Client page */}
            <Route path='/client/projects' element={<ClientProjects />}></Route>
            <Route path='/client/repository' element={<ClientRepository />}></Route>
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
};
