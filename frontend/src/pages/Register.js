import { Select } from 'antd';
import { Button } from 'antd';
import React from 'react';
import { Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const Register = () => {
  const handleSubmit = (value) => {
    console.log(value);
  };
  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>POS APP</h1>
          <h3>Register Page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Alread Register Please <Link to="/login"> Login Here</Link>
              </p>
              <Button type="primary" htmlType="submit">
                REGISTER
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
