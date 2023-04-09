import { Container } from '@mui/material';
import { Button, Col, Form, Input, Row } from 'antd';
import Header from 'components/Header/Header';
import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

type Props = {};

const ForgotPasswordPage = (props: Props) => {
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
                  marginBottom: '20px',
                }}
              >
                Reset Password
              </h1>
              <Form form={form} layout='vertical'>
                <Form.Item label='Email' style={{ marginBottom: '15px' }}>
                  <Input type='email' />
                </Form.Item>

                <Form.Item>
                  <Link to='/reset-password'>
                    <Button
                      type='default'
                      htmlType='submit'
                      style={{
                        width: '100%',
                      }}
                    >
                      Reset Password
                    </Button>
                  </Link>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
