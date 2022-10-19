import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import Input from 'antd/lib/input/Input';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  //get currently logged in user;
  useEffect(() => {
    if (localStorage.getItem('Auth')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (value) => {
    console.log(value);
    console.log(value);
    try {
      const res = await axios.post('/api/users/login', value);
      message.success('Sucessfully LOGGED IN ');
      localStorage.setItem('Auth', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
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
