import React, { useEffect } from 'react';
import { useState } from 'react';

function EditClientAccount(props: any) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [type, setType] = useState(props.type);
  const [email, setEmail] = useState(props.email);

  useEffect(() => {
    setFirstName(props.firstName);
    setCompanyName(props.companyName);
    setType(props.type);
    setEmail(props.email);
  }, [props.email, props.firstName, props.companyName, props.type]);

  const getIsFormValid = () => {
    if (firstName.length > 0 && email.length > 0 /* && password.value.length >= 6 */) {
      return true;
    } else {
      return false;
    }
  };

  const clearForm = () => {
    setFirstName(props.firstName);
    setCompanyName(props.companyName);
    setType(props.type);
    setEmail(props.email);
  };

  // handleSubmit should make a request to back-end later on to create client account
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account edited!');
    clearForm();
  };

  return (
    <div className='EditClientAccount'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Edit Client Account</h3>
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
            <select
              placeholder='Type'
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
            >
              <option value='1'>Ongoing</option>
              <option value='2'>Non-ongoing</option>
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
          <br></br>
          <button type='submit' disabled={!getIsFormValid()}>
            Edit account
          </button>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default EditClientAccount;
