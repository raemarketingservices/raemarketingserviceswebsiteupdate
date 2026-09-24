import React from 'react';
import { Hero } from '../components/Hero';
import { AppsPortalSection } from '../components/AppsPortalSection';
import { ValueProp } from '../components/ValueProp';
import { AboutSection } from '../components/AboutSection';
import { BentoServices } from '../components/BentoServices';
import { WhyRaeSection } from '../components/WhyRaeSection';
import { ProcessSection } from '../components/ProcessSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ResultsSection } from '../components/ResultsSection';
import { CTASection } from '../components/CTASection';
import { ContactSection } from '../components/ContactSection';
import { useSite } from '../context/SiteContext';

interface HomePageProps {
  onSelectService: (slug: string) => void;
  onSuccessNotification: (msg: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPortal: () => void;
  onOpenRegister: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectService,
  onSuccessNotification,
  onNavigateSection,
  onOpenPortal,
  onOpenRegister,
}) => {
  const { config } = useSite();

  // Order sections based on the Elementor builder configuration
  const orderedSections = [...config.sections]
    .sort((a, b) => a.order - b.order)
    .filter((s) => s.visible);

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero':
        return (
          <Hero
            key="hero"
            onExploreServices={() => onNavigateSection('servicios')}
            onContactClick={() => onNavigateSection('contacto')}
          />
        );

      case 'appsPortal':
        return (
          <AppsPortalSection
            key="appsPortal"
            onOpenPortal={onOpenPortal}
            onOpenRegister={onOpenRegister}
          />
        );

      case 'valueProp':
        return <ValueProp key="valueProp" />;

      case 'about':
        return (
          <AboutSection
            key="about"
            onProcessClick={() => onNavigateSection('proceso')}
          />
        );

      case 'services':
        return (
          <BentoServices
            key="services"
            onSelectService={onSelectService}
          />
        );

      case 'whyRae':
        return <WhyRaeSection key="whyRae" />;

      case 'process':
        return (
          <div key="process" id="proceso">
            <ProcessSection />
          </div>
        );

      case 'portfolio':
        return (
          <PortfolioSection
            key="portfolio"
            onConsultProject={() => onNavigateSection('contacto')}
          />
        );

      case 'results':
        return <ResultsSection key="results" />;

      case 'cta':
        return (
          <CTASection
            key="cta"
            onContactClick={() => onNavigateSection('contacto')}
            onServicesClick={() => onNavigateSection('servicios')}
          />
        );

      case 'contact':
        return (
          <ContactSection
            key="contact"
            onSuccessNotification={onSuccessNotification}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main id="main-content">
      {orderedSections.map((sec) => renderSection(sec.id))}
    </main>
  );
};
