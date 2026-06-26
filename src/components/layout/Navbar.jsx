import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  BookOpen, Search, Bookmark, Info, 
  Menu, X, Code2, ChevronRight, 
  Crown, Sparkles, Zap, Home
} from 'lucide-react';
import Container from '../common/Container';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/units', label: 'Units', icon: BookOpen },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
  { to: '/about', label: 'About', icon: Info },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-lg'
            : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Premium Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/70 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                  <Code2 className="w-4.5 h-4.5 text-primary-foreground" />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <span className="font-bold text-foreground text-xl leading-none tracking-tight flex items-center gap-1.5">
                  JavaLab
                </span>
                <span className="block text-[10px] text-muted-foreground leading-none mt-0.5 font-medium tracking-[0.15em] uppercase">
                  Question Hub for Java
                </span>
              </div>
            </Link>

            {/* Desktop Nav - shadcn style */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${location.pathname === to ? 'text-primary' : ''}`} />
                    {label}
                  </span>
                  {location.pathname === to && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right side: Premium actions */}
            <div className="flex items-center gap-2">

              <AnimatedThemeToggler
                className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 cursor-pointer"
              />
              
              <Link
                to="/search"
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
              >
                <Search className="w-4.5 h-4.5" />
              </Link>
              
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300 cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay - shadcn style */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu - shadcn style */}
      <nav
        className={`fixed top-16 left-4 right-4 z-40 bg-popover border border-border shadow-2xl rounded-2xl md:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-4">
          {/* Mobile header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">Menu</span>
            </div>
            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Pro
            </span>
          </div>

          <div className="space-y-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-accent'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    location.pathname === to 
                      ? 'bg-primary/10 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {label}
                </span>
                <ChevronRight className={`w-4 h-4 transition-all duration-200 ${
                  location.pathname === to 
                    ? 'text-primary' 
                    : 'text-muted-foreground group-hover:translate-x-0.5'
                }`} />
              </NavLink>
            ))}
          </div>

          {/* Mobile footer */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Study smarter with premium features
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;