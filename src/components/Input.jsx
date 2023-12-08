function Input(props) {
  const { name, type, label } = props;

  return (
    <label htmlFor={name}>
      <p>{label}</p>
      <input type={type} name={name} id={name} />
    </label>
  );
}

export default Input;
