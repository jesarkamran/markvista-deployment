const Container = (props) => {
  return (
    <div
      className={`mx-auto xl:px-0 ${props.className ? props.className : ""}`}
    >
      {props.children}
    </div>
  );
};

export default Container;
