import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return <h1>Kya galat search kar rha hai beyy</h1>;
};

export default Error;
