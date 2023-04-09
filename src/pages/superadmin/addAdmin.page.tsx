import { DataContext } from 'app';
import Header from 'components/Header/Header';
import SuperAdminNavbar from 'components/superAdminNavbar/SuperAdminNavbar';
import React, { useContext, useState } from 'react';

import './addAdmin.page.css';

function AddAdmin() {
  const [alert, setAlert] = useState(false);
  const { admins, setAdmins } = useContext(DataContext);
  const [newAdmin, setNewAdmin] = useState({
    userId: admins.length > 0 ? admins[admins.length - 1].userId + 1 : 1,
    name: '',
    username: '',
    domain: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmins((prevState) => {
      return [
        ...prevState,
        {
          userId: newAdmin.userId,
          name: newAdmin.name,
          type: newAdmin.type,
          email: `${newAdmin.username}@${newAdmin.domain}`,
        },
      ];
    });
    setNewAdmin({
      userId: admins.length > 0 ? admins.length + 2 : 1,
      name: '',
      username: '',
      domain: '',
      type: '',
    });
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAdmin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return (
    <>
      <Header />
      <SuperAdminNavbar />
      <div className='superAdmin--container'>
        <div className='add-admin-form'>
          {alert && <p>New admin added!</p>}
          <div className='input-row'>
            <label htmlFor='userId' className='labels'>
              User Id:
            </label>
            <input type={'text'} value={newAdmin.userId} id='userId' name='userId' disabled />
          </div>

          <div className='input-row'>
            <label htmlFor='userId' className='labels'>
              Type:
            </label>
            <input
              type={'text'}
              value={newAdmin.type}
              id='type'
              name='type'
              onChange={handleChange}
            />
            {/* <input type={'text'} value={newAdmin.userId} id='userId' name='userId' disabled /> */}
          </div>

          <div className='input-row'>
            <label htmlFor='name' className='labels'>
              Name:
            </label>
            <input
              type={'text'}
              value={newAdmin.name}
              id='name'
              name='name'
              onChange={handleChange}
              required
              disabled={alert}
            />
          </div>
          <div className='input-row'>
            <label htmlFor='username' className='labels'>
              Email:
            </label>
            <div>
              <input
                type={'text'}
                value={newAdmin.username}
                id='username'
                name='username'
                onChange={handleChange}
                required
                disabled={alert}
              />
              @
              <input
                type={'text'}
                value={newAdmin.domain}
                id='domain'
                name='domain'
                onChange={handleChange}
                disabled={alert}
              />
            </div>
          </div>
          <div className='input-row'>
            <div></div>
            <button type={'submit'} onClick={handleSubmit} className='add-btn'>
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAdmin;
