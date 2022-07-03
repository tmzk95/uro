import "./Modal.css";

function Modal(props) {
  return (
    <div>
      <div className="container" onClick={props.onClose}></div>
      <div className="modal">{props.children}</div>
    </div>
  );
}

export default Modal;
