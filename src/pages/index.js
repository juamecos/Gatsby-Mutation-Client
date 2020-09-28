import React from 'react';
import { graphql } from 'gatsby';
import { Form, Button, Modal } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// This query is executed at run time by Apollo.
const APOLLO_MUTATION = gql`
  mutation signUp(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      name: $name
      password: $password
    ) {
      id
      email
      username
      name
    }
  }
`;

export default () => {
  const [singUp, { data }] = useMutation(APOLLO_MUTATION);
  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
      name: Yup.string().required('El nombre es obligatorio'),
      username: Yup.string().required('El nombre de usuario es obligatorio'),
      password: Yup.string().required('la contraseña es obligatoria'),
    }),
    onSubmit: async formData => {
      const { data, loading } = await singUp({
        variables: {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      });

      const { id, name, username, email } = data.signUp;
      toast(`User ${name} added successfully`);
    },
  });
  const { email, name, username, password } = formik.values;
  return (
    <div style={{ textAlign: 'center', width: '600px', margin: '50px auto' }}>
      <h1>Queries and mutations in Gatsby</h1>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          label="Nombre"
          placeholder="Nombre"
          name="name"
          value={name} // to make reset
          onChange={formik.handleChange}
          error={formik.errors.name}
        />
        <Form.Input
          type="text"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          name="email"
          value={email} // to make reset
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          type="text"
          label="Nombre de usuario"
          placeholder="Nombre de usuario"
          name="username"
          value={username} // to make reset
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          type="text"
          label="Contraseña"
          placeholder="Contraseña"
          name="password"
          value={password} // to make reset
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button type="submit" className="btn-submit">
          Añadir usuario
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

const initialValue = () => {
  return {
    email: '',
    name: '',
    username: '',
    password: '',
  };
};
