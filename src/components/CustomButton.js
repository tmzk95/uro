import "./CustomButton.css";

function CustomButton(props) {
  return (
    <div className="customButton" style={props.style} onClick={props.onClick}>
      {props.label}
    </div>
  );
}

export default CustomButton;
