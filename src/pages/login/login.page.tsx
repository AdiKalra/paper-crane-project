import { Container } from '@mui/material';
import { Button, Col, Form, Input, Row } from 'antd';
import Header from 'components/Header/Header';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const Login = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Header />

      <Container maxWidth='md' style={{ height: 'calc(100vh - 80px)' }}>
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col
            span={24 / 2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className='logo'>
              <img className='invertedLogo' src={Logo} alt='logo' width={'100px'} />
            </div>
          </Col>

          <Col
            span={24 / 2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                maxWidth: '400px',
                minWidth: '300px',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                }}
              >
                Log in
              </h1>
              <Form form={form} layout='vertical'>
                <Form.Item label='Email' style={{ marginBottom: '15px' }}>
                  <Input type='email' />
                </Form.Item>
                <Form.Item label='Password'>
                  <Input type='password' />
                </Form.Item>
                <Form.Item style={{ marginBottom: '15px' }}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link to='/forgot-password'>Forgot password? </Link>
                    <Button type='default' htmlType='submit'>
                      Login
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
