// LoginForm.js
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../Component/FromField';
import { Button } from 'react-bootstrap';
import { loginAuth } from '../Services/Uitilities';
import { Endpoints } from '../Config';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    console.log("uii")
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const handleLogin = (values) => {
        loginAuth(Endpoints?.login, values, setLoading, navigation)
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="login-container">
                <h2>Login</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <FormField
                                    formik={formik}
                                    fieldProps={{
                                        fieldType: "text",
                                        label: "Email",
                                        placeholder: "Enter Email Address",
                                        name: "email",
                                    }}
                                />
                                <FormField
                                    formik={formik}
                                    fieldProps={{
                                        fieldType: "password",
                                        label: "Password",
                                        placeholder: "Enter Email Password",
                                        name: "password",
                                    }}
                                />
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    onClick={() => {
                                        formik.submitForm()
                                    }}>Login</Button>
                            </Form>)
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
