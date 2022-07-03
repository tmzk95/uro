import "./AbsoluteText.css";

function AbsoluteText(props) {
  return (
    <div className="text">
      <div>{props.value}</div>
    </div>
  );
}

export default AbsoluteText;
