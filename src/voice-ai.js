// Entry point for voice-ai.html (the Voice AI page). Styles first, then behaviour.
import './styles/tokens.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/buttons.css';
import './styles/glass.css';
import './styles/logo.css';
import './styles/utilities.css';
import './styles/section.css';

import './components/header/header.css';
import './components/ambient/ambient.css';
import './components/hero/hero.css';
import './components/simulator/simulator.css';
import './components/scroll-band/scroll-band.css';
import './components/demos/demos.css';
import './components/capabilities/capabilities.css';
import './components/integrations/integrations.css';
import './components/industries/industries.css';
import './components/calculator/calculator.css';
import './components/steps/steps.css';
import './components/pricing/pricing.css';
import './components/booking/booking.css';
import './components/footer/footer.css';
import './components/portal/portal.css';
import './styles/glassmorphism.css';
import './styles/scroll-effects.css';

import { initAppear } from './js/appear.js';
import { initScroll, initGlassGuard } from './js/scroll.js';
import { initReveals } from './js/reveal.js';
import { initHeadings } from './js/headings.js';
import { initScrub } from './js/scrub.js';
import { initSpotlight } from './js/spotlight.js';
import { initPortal } from './components/portal/portal.js';
import { initHeader, initHeaderScroll, initScrollspy } from './components/header/header.js';
import { initAmbient } from './components/ambient/ambient.js';
import { initHero } from './components/hero/hero.js';
import { initSimulator } from './components/simulator/simulator.js';
import { initScrollBand } from './components/scroll-band/scroll-band.js';
import { initDemos } from './components/demos/demos.js';
import { initCapabilities } from './components/capabilities/capabilities.js';
import { initIndustries } from './components/industries/industries.js';
import { initCalculator } from './components/calculator/calculator.js';
import { initSteps } from './components/steps/steps.js';
import { initPricing } from './components/pricing/pricing.js';
import { initBooking } from './components/booking/booking.js';
import { initFooter } from './components/footer/footer.js';

function init() {
  initAppear();
  initHeader();
  initFooter();

  // Components that build or own DOM first...
  initSimulator();
  initDemos();
  initCalculator();
  initBooking();

  // ...then the shared scroll loop and the effects that read from it.
  initHeaderScroll();
  initHero();
  initAmbient();
  initScrollBand();
  initScroll();
  initGlassGuard();
  initScrollspy();

  initReveals();
  initSteps();
  initCapabilities();
  initIndustries();
  initPricing();
  initHeadings();
  initScrub();
  initPortal();
  initSpotlight();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
