import React, { useState } from "react";
import { ErrorMessage, Field, useField, FieldArray } from "formik";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const FormField = ({ formik, fieldProps }) => {
    const { fieldType, label, options, name, placeholder, ...otherProps } = fieldProps;
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);
    if (fieldType === "text") {
        return (
            <>
                <p className="text-left mb-2">{label || ""}</p>
                <Field
                    type="text"
                    {...otherProps}
                    name={name}
                    id={name}
                    value={field.value ?? ""}
                    placeholder={placeholder || ""}
                    onChange={(e) => {
                        formik.setFieldValue(name, e.target.value)
                    }}
                />
                <span className="error"><ErrorMessage name={name} /></span>
            </>
        );
    }
    else if (fieldType === "password") {
        return (
            <>
                <p className="text-left mb-2">{label || ""}</p>
                <div className="position-relative w-100">
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        {...otherProps}
                        name={name}
                        id={name}
                        value={field.value ?? ""}
                        placeholder={placeholder || ""}
                        onChange={(e) => {
                            formik.setFieldValue(name, e.target.value)
                        }}
                        className="w-100"
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="eye-icon cursor-pointer">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <span className="error"><ErrorMessage name={name} /></span>
            </>
        );
    }
    else return null
}
export default FormField;