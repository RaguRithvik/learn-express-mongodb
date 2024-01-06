import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../../Component/FromField';
import { createModal } from '../../Services/Uitilities';
import { Endpoints } from '../../Config';
import { Modal, Button } from 'react-bootstrap';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  image: Yup.mixed().required('Image is required'),
});

export const FormModal = ({ showModal, setshowModal, formAction, formData, pageName }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('image', values.image);
    createModal(Endpoints?.manager, formData, setLoading, setshowModal)
  };

  return (
    <Modal
      show={showModal}
      onHide={() => { setshowModal(false) }}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>{formAction} Manage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={true}
        >
          {(formik) => {
            return (
              <Form>
                <FormField
                  formik={formik}
                  fieldProps={{
                    fieldType: "text",
                    label: "Name",
                    placeholder: "Enter Name",
                    name: "name",
                  }}
                />
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
                    fieldType: "upload",
                    label: "Upload Image",
                    placeholder: "Enter Email Password",
                    name: "image",
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => {
                    formik.submitForm()
                  }}>Save</Button>
              </Form>)
          }}
        </Formik>
      </Modal.Body>

    </Modal>

  );
};

