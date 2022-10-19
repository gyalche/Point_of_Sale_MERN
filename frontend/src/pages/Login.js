import React from 'react';
import { Form } from 'antd';
import Input from 'antd/lib/input/Input';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
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
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <p>
                Dont have an account? <Link to="/register">Create</Link>
              </p>
              <Button type="primary" htmlType="submit">
                LOGIN
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
