import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <Link className='manage-link' to="/admin/dashboard">⚙</Link>   
      {children}
    </div>
  );
}

export default Layout;
