import React from "react";

//components
import { PrimaryButton } from "./../../../index";

//icons
import { ReactComponent as CottageHomeIcon } from "./../../../../../assets/common/cottageHomeIcon.svg";

function JoinCottageForm(props) {
  return (
    <div className="guest-checkout-left">
      <div>
        <div className="left-title">Join Cottage</div>
        <div>
          <div className="cottage-home-icon-orange">
            <CottageHomeIcon height="60" width="50" />
          </div>
          <div className="guest-checkout-left-description">
            We’ll securely save your addresses and cards for faster checkouts in the future with
            Ideal Nutrition and any other businesses powered by Cottage.
          </div>
          <div className="guest-checkout-left-button">
            <PrimaryButton text="Sign Up" eventHandler={props.goToSignUp} />
          </div>
          <div className="have-an-account">
            Have an Account? <span onClick={props.goToSignIn}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinCottageForm;
