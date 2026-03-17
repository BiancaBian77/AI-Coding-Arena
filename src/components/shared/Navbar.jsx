import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Navbar({ activePage }) {
  const links = [
    { to: '/product', label: '产品介绍', key: 'product' },
    { to: '/assessment', label: '评测体系', key: 'assessment' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">⚡</span>
          <span className="text-lg font-bold text-gray-900 tracking-tight">AI Coding Arena</span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-12">
          {links.map(link => (
            <Link
              key={link.key}
              to={link.to}
              className={`text-base font-medium transition-colors ${
                activePage === link.key
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right button */}
        <Link
          to="/login"
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
        >
          企业登录
        </Link>
      </div>
    </nav>
  );
}
