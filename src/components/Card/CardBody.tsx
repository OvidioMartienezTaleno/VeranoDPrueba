interface CardBodyProps {
  title: string;
  text?: string;
}

export const CardBody = (props: CardBodyProps) => {
  const { title, text } = props;
  return (
    <>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{text}</p>
    </>
  );
};
