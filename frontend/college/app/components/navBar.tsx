import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Website Name Button (Left) */}
        <Link className="navbar-brand" href="/">
          MyWebsite
        </Link>

        {/* Signup Button (Right) */}
        <div className="d-flex ms-auto">
          <Link href="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
