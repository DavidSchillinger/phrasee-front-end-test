import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

const App = () => {
  const onFinish = (values: unknown) => {
    // TODO: Improve types.
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    // TODO: Improve types.
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <header>
        <img alt="Digital Hospital Global logo" src="/images/dhg_whole.png" />
      </header>
      <main>
        <Form
          layout="vertical"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please provide a username!' }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please provide a password!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </main>
    </>
  );
};

export default App;
