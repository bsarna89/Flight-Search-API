import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <header> ErrorPage </header>
      <Link to="/"> Back Home</Link>
    </div>
  );
}

export default ErrorPage;