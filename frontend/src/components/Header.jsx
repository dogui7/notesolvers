// CSS
import "../assets/Header.css";

// React router dom
import {Link} from "react-router-dom";

export default function Header() {

    return (
        <>
        <Link to="/">
            <h1 id="title">Notesolvers</h1>
        </Link>
        <nav>
            <ul>
                <li>
                    <Link to="/" className="link">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/create" className="link">
                        Create note
                    </Link>
                </li>
                <li>
                    <Link to="/archived" className="link">
                        Archived
                    </Link>
                </li>
            </ul>
        </nav>
        </>
    );
}
