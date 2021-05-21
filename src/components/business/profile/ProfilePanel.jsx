import React, { Component } from "react";
import { connect } from "react-redux";
import { S3Image } from "aws-amplify-react";
import { Skeleton, Space } from "antd";

//components
import { Container } from "./../../common";

// Redux
import { BusinessActionType } from "../../../store/actiontypes";

// Utils
import { displayablePhoneNumber } from "../../../utils";

// Style
import "./ProfilePanel.scss";

// Default image
import businessDefaultCover from "../../../assets/business/profile/default_cover_image.png";

const profileImageStyle = {
  width: "100%",
  maxHeight: "260px",
  objectFit: "cover",
  objectPosition: "center",
};

class ProfilePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate = (prevProps) => {
    const { profile } = this.props;
    if (profile.status !== prevProps.profile.status) {
      if (profile.status === BusinessActionType.GET_BUSINESSES_BY_DOMAIN_SUCCESS) {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { isLoading } = this.state;
    const {
      profile: {
        value: { description, phoneNumber, website, coverImage },
      },
    } = this.props;

    const coverImageContainer = (
      <div>
        {coverImage ? (
          <S3Image imgKey={coverImage} theme={{ photoImg: profileImageStyle }} />
        ) : (
          <img src={businessDefaultCover} alt="Icon" className="default-image" />
        )}
      </div>
    );

    return (
      <div className="profile-panel-wrapper">
        <div className="profile-panel-title">
          <h1>About us</h1>
        </div>
        <div className="profile-panel">
          <div className="profile-cover-image">
            {coverImageContainer}
            <Container style={{ overflow: "visible" }}>
              <div className={description ? "business-info" : "business-info empty-description"}>
                <div>
                  <h3>ABOUT</h3>
                  {isLoading ? (
                    <Skeleton
                      title={false}
                      paragraph={{ rows: 2 }}
                      active={isLoading}
                      style={{ width: "500px" }}
                      className="description-skeleton"
                    />
                  ) : (
                    <p>{description ? description : "-"}</p>
                  )}
                </div>
                {isLoading ? (
                  <Space style={{ display: "flex", justifyContent: "space-between" }}>
                    <Skeleton.Button active={isLoading} />
                    <Skeleton.Button active={isLoading} />
                  </Space>
                ) : (
                  <div className="business-info-footer">
                    <div className="business-info-phone">
                      <span>
                        <img src={require("./../../../assets/common/phone.svg")} alt="" />
                      </span>
                      <span>
                        <a href={`tel:${phoneNumber}`} style={{ color: `#4c6889` }}>
                          {displayablePhoneNumber(phoneNumber)}
                        </a>
                      </span>
                    </div>
                    <div className="business-info-website">
                      {website && (
                        <>
                          <span>
                            <a href={`http://${website}`} style={{ color: `#4c6889` }}>
                              Website
                            </a>
                          </span>
                          <span>
                            <img
                              src={require("./../../../assets/common/faded-arrow-right.svg")}
                              alt=""
                            />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.business.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);
