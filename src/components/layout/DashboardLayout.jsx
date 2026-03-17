import { Link } from 'react-router-dom';
import { Zap, LogOut } from 'lucide-react';

export default function DashboardLayout({ sidebarItems, children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 h-screen fixed flex flex-col">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 text-gray-900 hover:text-indigo-600 transition-colors">
            <Zap size={20} className="text-indigo-600" />
            <span className="text-base font-bold tracking-tight">AI Coding Arena</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const className = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all w-full text-left ${
              item.active
                ? 'bg-indigo-50 text-indigo-600 border-l-[3px] border-indigo-600 pl-[9px]'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`;
            if (item.onClick) {
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={className}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.path}
                className={className}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User area */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm flex-shrink-0">
              M
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">面试官</p>
              <p className="text-xs text-gray-400 truncate">admin@company.com</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 bg-gray-50 min-h-screen flex-1">
        {children}
      </main>
    </div>
  );
}
