export default function NavBar() {
    return (
        
        <nav className="site-nav container">
            <a href="/" className="brand">Home</a>
            <ul className="links">
                <li> <a href="/posts">Blog</a></li>
                <li> <a href="/subscribe">Subscribe</a></li>
            </ul>
        </nav>
    
    );
}