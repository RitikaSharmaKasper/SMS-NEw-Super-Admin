export default function Topbar({ mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-30 h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 gap-4">
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <HamburgerIcon />
        </button>

        {/* Global Search */}
        <div className="relative flex items-center flex-1 max-w-xs sm:max-w-sm md:max-w-md">
          <span className="absolute left-2.5 text-gray-400 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search schools, tickets, users..."
            className="w-full pl-9 pr-3.5 py-2 text-sm border border-gray-200 rounded-md outline-none bg-white text-gray-700 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Notification bell */}
        <button className="relative inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white cursor-pointer text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
          <BellIcon />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
          <span className="text-white text-xs font-semibold">SA</span>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <circle cx="6.5" cy="6.5" r="4.5" />
      <path d="M10 10l3.5 3.5" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M8 1a5 5 0 015 5v3l1.5 2h-13L3 9V6a5 5 0 015-5z" />
      <path d="M6.5 13a1.5 1.5 0 003 0" />
    </svg>
  );
}
