import Link from "next/link";

export default function NavBar() {
    return (
        
        <nav className="site-nav container">
            <Link href="/" className="brand">Home</Link>
            <ul className="links">
                <li> <Link href="/posts">Blog</Link></li>
                <li> <Link href="/subscribe">Subscribe</Link></li>
            </ul>
        </nav>
    
    );
}