import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
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
  const formikRef = React.useRef(null);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    //    formData.append('skills', values.skills);
    formData.append("skills", JSON.stringify(values.skills));
    formData.append('images', values.images);
    formData.append('documents', values.documents);
    if (formAction === "Add") {
      createModal(Endpoints?.employee, formData, setLoading, setshowModal)
    }
    else {
      formData.append('id', values.id);
      updateModal(Endpoints?.employee, formData, setLoading, setshowModal)
    }
  };
  const handleAddSkills = () => {
    if (formikRef.current) {
      const formik = formikRef.current;
      formik.setFieldValue(`skills`, [...formik.values.skills, { skill: "" }]);
      formik.validateForm();
    }
  }
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
        <Modal.Title>{formAction} Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={true}
          innerRef={formikRef}
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
                <div class="">
                  <div class="flex-direction-column d-flex justify-content-end">
                    <Button
                      varient="success"
                      onClick={() => handleAddSkills()}
                      type="button"
                    >
                      New Skill
                    </Button>
                  </div>
                  <FieldArray name="skills">
                    {({ push, remove }) => (
                      <div>
                        <p class="text-left mb-2">Skills</p>
                        {formik.values.skills?.length > 0 &&
                          formik.values.skills?.map(
                            (durationdData, Index) => {
                              return (
                                <>
                                  <div className="">
                                    <FormField
                                      formik={formik}
                                      fieldProps={{
                                        fieldType: "text",
                                        name: `skills[${Index}].skill`,
                                        className: "w-80",
                                        label: "",
                                        placeholder: "Skill",
                                      }}
                                    />

                                    <Button
                                      varient="danger"
                                      type="button"
                                      className='c-delete btn btn-danger'
                                      onClick={() => {
                                        if (Index > 0) {
                                          remove(Index)
                                        }
                                      }}
                                    >
                                      <FaTrash />
                                    </Button>
                                  </div>
                                </>
                              );
                            }
                          )}
                      </div>
                    )}
                  </FieldArray>
                </div>

                <FormField
                  formik={formik}
                  fieldProps={{
                    fieldType: "upload",
                    label: "Upload Image",
                    placeholder: "",
                    name: "images",
                  }}
                />
                <FormField
                  formik={formik}
                  fieldProps={{
                    fieldType: "upload",
                    label: "Upload Documents",
                    placeholder: "",
                    name: "documents",

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

