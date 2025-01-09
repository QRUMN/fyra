import React from 'react';
import { Menu, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isExplore = location.pathname === '/explore';

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-white font-bold text-xl">FYRA</Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleAuthClick}
              className="bg-brand-lime hover:bg-brand-lime/90 text-brand-dark font-medium px-4 py-2 rounded-full transition-all transform hover:scale-105"
            >
              {user ? 'Logout' : 'Login'}
            </button>
            {user && (
              <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                <User size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}