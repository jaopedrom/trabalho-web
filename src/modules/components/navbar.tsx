import Link from "next/link";
import Sobre from "@/src/app/sobre/page";

export default function Navbar(){
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <ul>
                    <li className="nav-item">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/Sobre">Sobre</Link>
                    </li>

                    <li className="nav-item">

                    </li>
                </ul>
            </div>
        </nav>
    )
}