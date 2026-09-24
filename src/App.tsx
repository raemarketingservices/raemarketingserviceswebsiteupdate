import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './components/ServicePage';
import { BusinessPortalModal } from './components/BusinessPortalModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { SiteProvider } from './context/SiteContext';
import { servicesData } from './data/servicesData';
import type { ServiceItem } from './types';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [portalInitialMode, setPortalInitialMode] = useState<'login' | 'register'>('login');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Synchronize state with browser URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path === '/admin') {
        setIsAdminOpen(true);
      } else if (path === '/portal') {
        setIsPortalOpen(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    // Check initial path
    if (window.location.pathname === '/admin') {
      setIsAdminOpen(true);
    } else if (window.location.pathname === '/portal') {
      setIsPortalOpen(true);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle in-app navigation
  const navigateTo = (path: string) => {
    if (path === '/admin') {
      setIsAdminOpen(true);
      return;
    }
    if (path === '/portal') {
      setIsPortalOpen(true);
      return;
    }

    if (path.startsWith('/#')) {
      const sectionId = path.replace('/#', '');
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (slug: string) => {
    navigateTo(`/${slug}`);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentPath !== '/') {
      navigateTo(`/#${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Match service route
  const currentServiceSlug = currentPath.replace('/', '');
  const activeService: ServiceItem | undefined = servicesData.find(
    (s) => s.slug === currentServiceSlug
  );

  return (
    <div className="flex flex-col min-h-screen text-slate-800">
      
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-blue text-white font-bold px-4 py-2 rounded-lg shadow-lg"
      >
        Saltar al contenido principal
      </a>

      {/* Global Navbar */}
      <Navbar 
        currentPath={currentPath} 
        onNavigate={navigateTo} 
        onOpenPortal={() => {
          setPortalInitialMode('login');
          setIsPortalOpen(true);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Body */}
      <div className="flex-1">
        {activeService ? (
          <ServicePage
            service={activeService}
            onNavigateHome={() => navigateTo('/')}
            onSelectOtherService={handleSelectService}
            onSuccessNotification={(msg) => setToastMessage(msg)}
          />
        ) : (
          <HomePage
            onSelectService={handleSelectService}
            onSuccessNotification={(msg) => setToastMessage(msg)}
            onNavigateSection={handleNavigateSection}
            onOpenPortal={() => {
              setPortalInitialMode('login');
              setIsPortalOpen(true);
            }}
            onOpenRegister={() => {
              setPortalInitialMode('register');
              setIsPortalOpen(true);
            }}
          />
        )}
      </div>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* SaaS Business Apps Portal Modal */}
      <BusinessPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        initialMode={portalInitialMode}
      />

      {/* Admin Panel Modal (Elementor Block Builder, Hero Editor, Inbox, Business Approval & Licenses) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}

export function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}

export default App;
