import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-row">
      <h1>404 Not found</h1>
      <Link to="/">Go to Home</Link>
      <a href="/">Home</a>
    </div>
  );
}