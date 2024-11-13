type ButtonProps = {
  name: string;
};

const Button = ({ name }: ButtonProps) => {
  return <button className="rounded-full">{name}</button>;
};

export default Button;
