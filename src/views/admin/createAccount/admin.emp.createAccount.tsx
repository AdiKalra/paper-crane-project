import React from 'react';
import { useState } from 'react';

const PasswordErrorMessage = () => {
  return <p className='FieldError'>Password should be at least 6 characters</p>;
};

function CreateEmpAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [role, setRole] = useState('role');

  const getIsFormValid = () => {
    if (
      firstName.length > 0 &&
      email.length > 0 &&
      password.value.length >= 6 &&
      (role === 'developer' || role === 'designer')
    ) {
      return true;
    } else {
      return false;
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setPassword({ value: '', isTouched: false });
    setEmail('');
    setRole('role');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created!');
    // contact to back-end here
    clearForm();
  };

  return (
    <div className='CreateEmpAccount'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Create Employee Account</h3>
          <div className='Field'>
            <label>
              First name <sup>*</sup>
            </label>
            <input
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>Last name</label>
            <input
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Password <sup>*</sup>
            </label>
            <input
              placeholder='Password'
              type='password'
              value={password.value}
              onChange={(e) => setPassword({ ...password, value: e.target.value })}
            />
            {password.value.length < 6 && password.isTouched === true && <PasswordErrorMessage />}
          </div>
          <div className='Field'>
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='role'>Role</option>
              <option value='developer'>Developer</option>
              <option value='designer'>Designer</option>
            </select>
          </div>
          <br></br>
          <button type='submit' disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateEmpAccount;
