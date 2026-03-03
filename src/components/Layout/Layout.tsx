import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import './style.css';

export default function Layout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
