import React from "react";
import { useField, Field } from "formik";
import { Typography } from "antd";

const { Paragraph } = Typography;

/*
formFieldContent refers to an object that is shaped
  {
  title: "<field title>",
  label: "<field label>",
  field: "<field name>",
  limit: {
    min: 2,
    max: 20,
  },
  tooltip?: "<field tooltip"

*/
export const CustomTextField = ({ formFieldContent, ...props }) => {
  // usefield will allow access to formik's props, this allows for common
  // input fields to be extracted out.
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;
  return (
    <div>
      <Paragraph>{`${formFieldContent.title}`}</Paragraph>

      <Field
        {...field}
        {...props}
        className={error ? "profile-forms-input error-form" : "profile-forms-input"}
      />
      {error ? <span style={{ fontSize: "0.75rem", color: "#f5222d" }}>{meta.error} </span> : null}
    </div>
  );
};

export default CustomTextField;
