import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  small: 'small',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
    style={{ borderRadius: '40px'}}
      className={`button-container text-nowrap ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
