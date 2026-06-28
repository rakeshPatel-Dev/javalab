import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  BookOpen, Search, Bookmark, Info, 
  Menu, X, Code2, ChevronRight, 
  Zap, Home
} from 'lucide-react';
import Container from '../common/Container';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import { Logo } from '../common/Logo';

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
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? 'bg-background/50 backdrop-blur-lg rounded-full top-3 border border-border max-w-6xl mx-auto shadow-sm'
            : 'bg-background/60 border-transparent'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between h-15 gap-4">
            {/* Premium Logo & Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative   flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <Logo className="w-10 h-10 object-contain" />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <span className="font-extrabold text-foreground text-xl leading-none tracking-tight flex items-center gap-1.5">
                  JavaLab
                </span>
                <span className="block text-[10px] text-muted-foreground leading-none mt-1 font-semibold tracking-wider uppercase">
                  Curated OOPs Learning
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 h-full pt-1">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 h-12 ${
                      isActive
                        ? 'text-primary border-primary font-bold'
                        : 'text-muted-foreground border-transparent hover:text-primary hover:border-primary/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right side Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/about"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/95 transition-all text-xs shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 fill-primary-foreground" />
                Go Pro
              </Link>

              <AnimatedThemeToggler
                className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-350 cursor-pointer"
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

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <nav
        className={`fixed top-24 left-4 right-4 z-40 bg-popover border border-border shadow-2xl rounded-2xl md:hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="p-5">
          {/* Mobile header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">Menu</span>
            </div>
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pro
            </span>
          </div>

          <div className="space-y-1.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:bg-accent'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
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
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary/5 border border-primary/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold text-muted-foreground">
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