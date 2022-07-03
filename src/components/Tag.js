import "./Tag.css";

function Tag(props) {
  return <div class={`tag ${props.color}`}>{props.text}</div>;
}

export default Tag;
