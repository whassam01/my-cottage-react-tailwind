import React, { Component } from "react";
import { Portal } from "./../Portal/Portal";
import "./CustomDropdown.scss";

export class CustomDropdown extends Component {
  state = {};
  componentDidMount() {
    const { top, left } = this.triggerRef.getBoundingClientRect();
    const initialOffsetY = 11;
    const initialOffsetX = 82;
    this.setState({
      top: top + window.scrollY - initialOffsetY,
      left: left - initialOffsetX,
    });
    window.addEventListener("resize", this.handleScreenResize);
    window.addEventListener("scroll", this.handleScreenResize);
    window.addEventListener("click", this.handleClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleScreenResize);
    window.removeEventListener("scroll", this.handleScreenResize);
    window.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = () => {
    document
      .querySelectorAll(".more-icon-dropdown.more-icon-dropdown-active")
      .forEach((dropdown) => dropdown.classList.remove("more-icon-dropdown-active"));
  };

  handleScreenResize = () => {
    const { top, left } = this.triggerRef.getBoundingClientRect();
    const offsetY = 3;
    const offsetX = 82;
    this.setState({
      top: top + window.scrollY - offsetY,
      left: left - offsetX,
    });
  };
  handleClick = (e) => {
    e.stopPropagation();
    document
      .querySelectorAll(".more-icon-dropdown.more-icon-dropdown-active")
      .forEach((dropdown) => dropdown.classList.remove("more-icon-dropdown-active"));
    this.portalDivRef.classList.add("more-icon-dropdown-active");
    const { top, left } = this.triggerRef.getBoundingClientRect();
    const offsetY = 3;
    const offsetX = 82;
    this.setState({
      top: top + window.scrollY - offsetY,
      left: left - offsetX,
    });
  };
  render() {
    const { top, left } = this.state;
    const { id } = this.props;
    return (
      <div onClick={(e) => this.handleClick(e)}>
        <span style={{ cursor: "pointer" }} ref={(r) => (this.triggerRef = r)}>
          {this.props.trigger}
        </span>
        {this.triggerRef && (
          <Portal>
            <div
              ref={(r) => (this.portalDivRef = r)}
              className={`more-icon-dropdown`}
              id={id}
              style={{
                top,
                left,
                ...this.props.style,
              }}>
              <div className="overlay-more-icon" onClick={(e) => this.handleClick(e)}>
                {this.props.trigger}
              </div>
              <div className="more-icon-dropdown-body">{this.props.children}</div>
            </div>
          </Portal>
        )}
      </div>
    );
  }
}
