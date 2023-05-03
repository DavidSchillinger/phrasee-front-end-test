import React, { Fragment, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useRootDispatch, useRootSelector } from '../store';
import { loginUser } from '../user';

type AntdStore = { [key: string]: any }; // Antd doesn't seem to export this.
type FormSchema = { username: string; password: string };

export const Login = (): JSX.Element => {
  const dispatch = useRootDispatch();

  const onFinish = useCallback(
    (store: AntdStore) => {
      const values = store as FormSchema;
      dispatch(loginUser(values as FormSchema));
    },
    [dispatch]
  );

  return (
    <Fragment>
      <header>
        <img alt="Digital Hospital Global logo" src="/images/dhg_whole.png" />
      </header>

      <main>
        <Form layout="vertical" name="basic" onFinish={onFinish}>
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

          <Status />
        </Form>
      </main>
    </Fragment>
  );
};

function Status(): JSX.Element | null {
  const status = useRootSelector((state) => state.user.status);

  switch (status) {
    case 'initial':
    case 'success':
      return null;
    case 'failed':
      return <p>There was a problem logging you in.</p>;
    case 'incorrect':
      return <p>Incorrect username and password combination.</p>;
  }
}
