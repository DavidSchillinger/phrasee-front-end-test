import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';


const App = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <header>
        <img alt="Digital Hospital Global logo" src="/images/dhg_whole.png" />
      </header>
      <main>
        <Form
          layout={'vertical'}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
          >
            <Input
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={1>0}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </main>
      <footer>
      </footer>
    </>
  );
}

export default App;
