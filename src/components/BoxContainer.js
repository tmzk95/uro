import "./BoxContainer.css";

function BoxContainer(props) {
  return <div className="boxContainer">{props.children}</div>;
}

export default BoxContainer;
