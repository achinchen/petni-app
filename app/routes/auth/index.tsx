import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <Form action="/api/auth/google" method="post">
      <button>Login with Google</button>
    </Form>
  );
}
