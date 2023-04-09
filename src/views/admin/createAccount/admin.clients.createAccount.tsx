import React from 'react';
import { useState } from 'react';

const PasswordErrorMessage = () => {
  return <p className='FieldError'>Password should be at least 6 characters</p>;
};

function CreateClientAccount() {
  const [firstName, setFirstName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [type, setType] = useState(2);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });

  const getIsFormValid = () => {
    if (firstName.length > 0 && email.length > 0 && password.value.length >= 6) {
      return true;
    } else {
      return false;
    }
  };

  const clearForm = () => {
    setFirstName('');
    setCompanyName('');
    setType(2);
    setPassword({ value: '', isTouched: false });
    setEmail('');
  };

  // handleSubmit should make a request to back-end later on to create client account
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account created!');
    clearForm();
  };

  return (
    <div className='CreateClientAccount'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Create Client Account</h3>
          <div className='Field'>
            <label>Name</label>
            <input
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Company<sup>*</sup>
            </label>
            <input
              placeholder='Company name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className='Field'>
            <label>
              Type <sup>*</sup>
            </label>
            <select value={type} onChange={(e) => setType(Number(e.target.value))}>
              <option value='2'>Non-ongoing Contract</option>
              <option value='1'>Ongoing Contract</option>
            </select>
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
          <br></br>
          <button type='submit' disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CreateClientAccount;
