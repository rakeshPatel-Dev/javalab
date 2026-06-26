import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import UnitsPage from './pages/UnitsPage';
import UnitPage from './pages/UnitPage';
import TopicPage from './pages/TopicPage';
import QuestionPage from './pages/QuestionPage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import AboutPage from './pages/AboutPage';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen ">
    <Navbar />
    <main className="flex-1 pt-14 px-4 sm:px-6 lg:px-8">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/question/:questionId" element={<QuestionPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <span className="text-6xl mb-4">🔍</span>
    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">Page Not Found</h1>
    <p className="text-slate-500 dark:text-slate-400 mb-6">The page you're looking for doesn't exist.</p>
    <a href="/" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors">
      Go Home
    </a>
  </div>
);

export default App;
