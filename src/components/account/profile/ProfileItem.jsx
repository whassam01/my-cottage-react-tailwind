import React from "react";
import { useSelector } from "react-redux";
import { S3Image } from "aws-amplify-react";
import { Button, Row, Col, Card, Statistic } from "antd";
import { EditButton } from "components/common";
import { useGetConsumer } from "store/react-query";
import { displayablePhoneNumber } from "utils/index";
import defaultImageSvg from "assets/account/defaultImage.svg";
import "./ProfileItem.scss";

const profileImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50px !important",
  overflow: "hidden",
};

const ProfileItem = (props) => {
  const { showEditProfile: editProfile, showChangePassword: changePassword } = props;
  const isMobileView = useSelector((state) => state.mobileView.isMobileView);
  const consumer = useGetConsumer();

  const showEditProfile = () => {
    editProfile(consumer?.data?.data?.consumer);
  };

  const showChangePassword = () => {
    changePassword();
  };

  const {
    avatar = null,
    firstName = "",
    lastName = "",
    email = "",
    phoneNumber = "",
  } = consumer?.data?.data?.consumer;

  const profileImageContainer = (
    <Card
      bodyStyle={{ display: "none" }}
      bordered={false}
      className="account-avatar-image"
      cover={
        avatar ? (
          <S3Image imgKey={avatar} theme={{ photoImg: profileImageStyle }} />
        ) : (
          <div>
            <img src={defaultImageSvg} alt="default" />
          </div>
        )
      }
    />
  );

  const nameContainer = (
    <Statistic
      value={firstName && lastName ? `${firstName} ${lastName}` : ""}
      className={"profile-item-username"}
    />
  );

  const emailContainer = (
    <Statistic value={email ? email : ""} className={"profile-item-details"} />
  );

  const phoneNumberContainer = (
    <div className="producer-info-number-container">{displayablePhoneNumber(phoneNumber)}</div>
  );

  const credentialsContainer = (
    <div className="producer-info-number-container">
      <Button onClick={showChangePassword}>Change password</Button>
    </div>
  );

  return (
    <div>
      {consumer.isSuccess && (
        <Card bordered={false} id="profile-item-card">
          <EditButton onClick={showEditProfile} />
          {isMobileView ? (
            <div className="profile-item-container">
              <Row type="flex" justify="space-between" align="middle" gutter={[0, 20]}>
                <Col span={24}>{profileImageContainer}</Col>
                <Col span={24}>
                  <Row>
                    <Col span={24}>{nameContainer}</Col>
                    <Col span={24}>{emailContainer}</Col>
                    <Col span={24}>{phoneNumberContainer}</Col>
                    <Col span={24}>{credentialsContainer}</Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ) : (
            <Row type="flex" justify="space-between" align="middle">
              <Col span={24}>{profileImageContainer}</Col>

              <Col span={24}>{nameContainer}</Col>

              <Col span={24}>{emailContainer}</Col>

              <Col span={24}>{phoneNumberContainer}</Col>
              <Col span={24}>{credentialsContainer}</Col>
            </Row>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProfileItem;
