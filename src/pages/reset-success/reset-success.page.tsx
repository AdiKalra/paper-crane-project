import { Container } from '@mui/material';
import { Button } from 'antd';
import Header from 'components/Header/Header';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const ResetSuccessPage = (props: Props) => {
  return (
    <div>
      <Header />

      <Container maxWidth='md' style={{ height: 'calc(100vh - 80px)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              borderRadius: '5px',
              padding: '20px',
            }}
          >
            <div>
              <p style={{ padding: '40px 0px' }}>
                Your new password is safely set up!
                <br />
                Please login with your new password.
              </p>

              <div style={{ textAlign: 'right' }}>
                <Link to='/login'>
                  <Button type='primary'>Ok</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResetSuccessPage;
