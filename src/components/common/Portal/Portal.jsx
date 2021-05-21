import ReactDOM from "react-dom";

export function Portal(props) {
  return ReactDOM.createPortal(props.children, props.parentNode);
}
Portal.defaultProps = {
  parentNode: document.body,
};
