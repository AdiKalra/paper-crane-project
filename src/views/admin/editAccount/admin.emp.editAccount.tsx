import React, { useEffect } from 'react';
import { useState } from 'react';

// const PasswordErrorMessage = () => {
//   return <p className='FieldError'>Password should be at least 6 characters</p>;
// };

function EditEmpAccount(props: any) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  //   const [password, setPassword] = useState({
  //     value: '',
  //     isTouched: false,
  //   });
  const [role, setRole] = useState(props.role);

  useEffect(() => {
    setFirstName(props.firstName);
    setLastName(props.lastName);
    // setPassword({ value: '', isTouched: false });
    setEmail(props.email);
    setRole(props.role);
  }, [props.email, props.firstName, props.lastName, props.role]);

  const getIsFormValid = () => {
    if (
      firstName.length > 0 &&
      email.length > 0 &&
      //   password.value.length >= 6 &&
      (role === 'Developer' || role === 'Designer')
    ) {
      return true;
    } else {
      return false;
    }
  };

  const clearForm = () => {
    setFirstName(props.firstName);
    setLastName(props.lastNmae);
    // setPassword({ value: '', isTouched: false });
    setEmail(props.email);
    setRole(props.role);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Account edited!');
    // contact to back-end here
    clearForm();
  };

  return (
    <div className='EditEmpAccount'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>Edit Employee Account</h3>
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
          {/* <div className='Field'>
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
          </div> */}
          <div className='Field'>
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='role'>Role</option>
              <option value='Developer'>Developer</option>
              <option value='Designer'>Designer</option>
            </select>
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

export default EditEmpAccount;
