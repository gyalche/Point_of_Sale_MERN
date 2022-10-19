import { message, Select } from 'antd';
import { Button } from 'antd';
import React from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    console.log(value);
    try {
      const res = await axios.post('/api/users/register', value);
      message.success('Sucessfully Registered ', res.name);
      navigate('/login');
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
