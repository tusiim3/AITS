import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            404 page not found
            <Link to="/">Home</Link>
        </div>
    );
}