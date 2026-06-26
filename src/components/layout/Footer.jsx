import { Link } from 'react-router-dom';
import { Code2, BookOpen, Search, Bookmark, Info, Heart, ExternalLink } from 'lucide-react';
import Container from '../common/Container';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur-sm mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/70 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
              <span className="font-bold text-foreground text-sm">JavaLab</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-55">
              A clean, fast question bank built for personal study and exam revision based on BITM 2nd Semester Java OOP syllabus. 
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/units', label: 'All Units', icon: BookOpen },
                { to: '/search', label: 'Search', icon: Search },
                { to: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
                { to: '/about', label: 'About', icon: Info },
              ].map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Content: Java OOP (BITM 2nd Sem)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Data: 9 Units · 77 Topics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Progress saved in Local Storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Free & Open Source</span>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
              Developer
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm">
                  RP
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Rakesh Patel</p>
                  <a
                    href="https://rakeshpatel.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    rakeshpatel.me
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                <span>Built with passion for education</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Enhanced */}
        <div className="py-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            © {year} Java OOP Question Hub.
            <span className="hidden sm:inline">All rights reserved.</span>
          </span>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Built for study
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              Made with
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
              by
              <a
                href="https://rakeshpatel.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline transition-all duration-200 font-medium"
              >
                Rakesh Patel
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;