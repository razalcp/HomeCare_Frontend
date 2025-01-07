import { useRouteError } from "react-router-dom";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

const Error = () => {
  const err = useRouteError() as RouteError;

  return (
    <div>
      <h1>OOps !!!</h1>
      <h2>Something went wrong !!</h2>
      <h3>
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
};

export default Error