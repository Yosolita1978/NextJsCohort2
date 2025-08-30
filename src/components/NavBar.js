"use client";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

export default function NavBar() {
    const { user, isLoading } = useUser();
    return (

        <nav className="site-nav container">
            <Link href="/" className="brand">Home</Link>
            <ul className="links">
                <li> <Link href="/posts">Blog</Link></li>
                {/* Show Subscribe only when logged in */}
                {user && (
                    <li><Link href="/subscribe">Subscribe</Link></li>
                )}


                {/* Use <a> for Auth0 routes, not <Link> */}
                {!isLoading && (
                    user ? (
                        <li><a href="/auth/logout">Logout</a></li>
                    ) : (
                        <li><a href="/auth/login">Login</a></li>
                    )
                )}
            </ul>
        </nav>

    );
}