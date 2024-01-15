function Input(props) {
  const { name, type, label, value = null } = props;

  return (
    <label htmlFor={name}>
      <p>{label}</p>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        checked={value}
      />
    </label>
  );
}

export default Input;
