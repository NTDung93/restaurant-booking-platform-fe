import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Access denied!</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}
