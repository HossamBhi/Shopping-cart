import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const prod = import.meta.env.PROD;

  return (
    <div>
      <main className="flex flex-col justify-center items-center p-5">
        <h1>Oops an error happen...</h1>
        {isRouteErrorResponse(error)
          ? "The requested page was not found."
          : prod
          ? "An unexpected error occurred."
          : (error as Error).message}
      </main>
    </div>
  );
};

export default ErrorPage;
