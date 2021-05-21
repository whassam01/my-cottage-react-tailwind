import React from "react";
import "./PasswordChecker.scss";

class PasswordChecker extends React.Component {
  render() {
    return (
      <div className="password-container">
        <p className="validation-item">6-30 characters, 1 uppercase, 1 lowercase, 1 number</p>
      </div>
    );
  }
}

export default PasswordChecker;
