import React from "react";
import { S3Image } from "aws-amplify-react";
import { v4 as uuidv4 } from "uuid";

import { Modal, Row, Col, Typography, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { Form, SubmitButton, Input } from "formik-antd";
import { PlusOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import { ErrorsBox, EditIcon, InputPhone, CustomTextField } from "components/common";
import { cleanedPhoneInput, removeNullProp } from "utils/index";
import { BYTES_TO_MB, MAX_IMAGE_SIZE_MB } from "constants/index";
import {
  useUpdateConsumer,
  useUploadConsumerImage,
  useRemoveConsumerImage,
} from "store/react-query";
import {
  consumerImageStyle,
  updateProfileParams as profileFormContent,
  ProfileFormFieldContent,
  ProfileFormInitialValues,
  ProfileFormValidationSchema,
} from "./ProfileFormFields";
import "containers/general.scss";
import "antd/dist/antd.css";

const { Title } = Typography;
const { FIRST_NAME, LAST_NAME, EMAIL, PHONE } = ProfileFormFieldContent;

const validateImage = (file) => {
  const isCorrectFileType = file.type === "image/jpeg" || file.type === "image/png";
  if (!isCorrectFileType) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isCorrectFileSize = file.size / BYTES_TO_MB < MAX_IMAGE_SIZE_MB;
  if (!isCorrectFileSize) {
    message.error("Image must smaller than 2MB!");
  }
  return isCorrectFileType && isCorrectFileSize;
};

const uploadImage = (file, consumerId, setFieldValue) => {
  let fr = new FileReader();
  let fileObj = {};

  fr.onload = function () {
    const src = fr.result;
    const location = `consumer/${consumerId}/${uuidv4()}.jpeg`;

    fileObj = { file, src, location };
    setFieldValue("avatar", { ...fileObj });
  };

  // TODO: Look into 404 not found on image load.
  fr.readAsDataURL(file);
};

const ProfileForm = (props) => {
  const { visible, onCancel, profileToEdit } = props;

  const updateConsumer = useUpdateConsumer();
  const removeConsumerImage = useRemoveConsumerImage();
  const uploadConsumerImage = useUploadConsumerImage();
  return (
    <div>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        style={{ top: "24px" }}
        className="form-modal-wrapper">
        <Formik
          initialValues={ProfileFormInitialValues(profileToEdit)}
          validationSchema={ProfileFormValidationSchema}
          onSubmit={async (values, actions) => {
            const { avatar } = values;
            //  If countries outside of US is supported phone input has to be reworked in both packages
            const countryCode = "+1";
            const cleanedPhone = cleanedPhoneInput(values[PHONE.field]);
            try {
              const requestPayload = {
                ...values,
                id: profileToEdit.id,
                avatar: avatar.location,
                [EMAIL.field]: null,
                [PHONE.field]: `${countryCode}${cleanedPhone.slice(cleanedPhone.length - 10)}`,
              };
              removeNullProp(requestPayload);
              await updateConsumer.mutateAsync(requestPayload);

              // Upload image to S3
              if (avatar.file) {
                if (profileToEdit.avatar) {
                  await removeConsumerImage.mutateAsync({ path: profileToEdit.avatar });
                }
                await uploadConsumerImage.mutateAsync({
                  path: avatar.location,
                  image: avatar.file,
                  contentType: "image/jpeg",
                });
              }
              onCancel();
            } catch (error) {
              actions.setErrors({ api: error.errors });
              actions.setSubmitting(false);
            }
          }}>
          {({ values, errors, touched, setFieldValue, dirty, isValid }) => (
            <Form>
              <Row>
                <Col span={24}>
                  <Title className="dashboard-form-title">{profileFormContent.title}</Title>
                </Col>
              </Row>
              <Row className="Dashboard-forms-container">
                <div className="dashbaord-avatar-wrapper">
                  <div>
                    <ImgCrop
                      shape={"round"}
                      visible={false}
                      modalOk={"Set avatar photo"}
                      // This gives a warning, dont understand original purpose of this
                      // modalTitle={<div className="avatar-modal-title">Crop your photo</div>}
                      className={"profileFormContainer"}>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        action={(file) => uploadImage(file, profileToEdit.id, setFieldValue)}
                        className="avatarUpload dashboard-form-avatar"
                        beforeUpload={validateImage}>
                        {profileToEdit.avatar && !values.avatar.src ? (
                          <S3Image
                            imgKey={profileToEdit.avatar}
                            theme={{ photoImg: consumerImageStyle }}
                          />
                        ) : values.avatar.src ? (
                          <img src={values.avatar.src} alt="avatar" style={{ width: "100%" }} />
                        ) : (
                          <div>
                            <div className="ant-upload-text">
                              <Row type="flex" justify="space-around" align="middle">
                                <div className="dashboard-product-add-image-icon">
                                  <PlusOutlined style={{ fontSize: "20px", color: "#FB775A" }} />
                                </div>
                              </Row>
                              <Row className="dashboard-product-add-image-text">Upload image</Row>
                            </div>
                          </div>
                        )}
                      </Upload>
                    </ImgCrop>
                  </div>
                </div>

                <Row gutter={[10, 20]}>
                  <Col lg={12} md={24} xs={24} sm={24}>
                    <CustomTextField
                      formFieldContent={FIRST_NAME}
                      name={FIRST_NAME.field}
                      maxLength={FIRST_NAME.limit.max}
                      type="text"
                      as={Input}
                    />
                  </Col>
                  <Col lg={12} md={24} xs={24} sm={24}>
                    <CustomTextField
                      formFieldContent={LAST_NAME}
                      name={LAST_NAME.field}
                      maxLength={LAST_NAME.limit.max}
                      type="text"
                      as={Input}
                    />
                  </Col>
                  <Col lg={12} md={24} xs={24} sm={24}>
                    <CustomTextField
                      formFieldContent={PHONE}
                      type="text"
                      name={PHONE.field}
                      as={InputPhone}
                    />
                  </Col>
                  <Col lg={12} md={24} xs={24} sm={24}>
                    <CustomTextField
                      formFieldContent={EMAIL}
                      name={EMAIL.field}
                      type="email"
                      as={Input}
                      maxLength={EMAIL.limit.max}
                      disabled={true}
                    />
                  </Col>
                  <Col span={24}>
                    <Row>
                      <SubmitButton
                        disabled={!(dirty && isValid)}
                        type="primary"
                        icon={<EditIcon />}
                        size="large"
                        style={{ width: "100%" }}
                        className="primary-button">
                        {profileFormContent.buttonText}
                      </SubmitButton>
                    </Row>
                  </Col>

                  {errors.api && (
                    <Row>
                      <Col span={24}>
                        <Row>
                          <ErrorsBox messages={errors.api} />
                        </Row>
                      </Col>
                    </Row>
                  )}
                </Row>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ProfileForm;
