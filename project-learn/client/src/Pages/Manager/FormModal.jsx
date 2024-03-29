import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../../Component/FromField';
import { createModal, updateModal } from '../../Services/Uitilities';
import { Endpoints } from '../../Config';
import { Modal, Button } from 'react-bootstrap';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  images: Yup.mixed().required('Image is required'),
});

export const FormModal = ({ showModal, setshowModal, formAction, formData }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('images', values.images);
    if (formAction === "Add") {
      createModal(Endpoints?.manager, formData, setLoading, setshowModal)
    }
    else{
      formData.append('id', values.id);
      updateModal(Endpoints?.manager, formData, setLoading, setshowModal)
    }
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
        <Modal.Title>{formAction} Manager Details</Modal.Title>
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
            console.log(formik.values, "formik.values");
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
                    name: "images",
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => {
                    formik.submitForm()
                  }}>{formAction}</Button>
              </Form>)
          }}
        </Formik>
      </Modal.Body>

    </Modal>

  );
};

