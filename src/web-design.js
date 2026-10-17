// Entry point for web-design.html (the Website design page).
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
import './components/steps/steps.css';
import './components/footer/footer.css';
import './pages/web-design/web-design.css';
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
import { initHeader, initHeaderScroll } from './components/header/header.js';
import { initAmbient } from './components/ambient/ambient.js';
import { initHero } from './components/hero/hero.js';
import { initSteps } from './components/steps/steps.js';
import { initFooter } from './components/footer/footer.js';
import { initWebDesign } from './pages/web-design/web-design.js';

function init() {
  initAppear();
  initHeader();
  initFooter();
  initWebDesign();

  initHeaderScroll();
  initHero();
  initAmbient();
  initScroll();
  initGlassGuard();

  initReveals();
  initSteps();
  initHeadings();
  initScrub();
  initPortal();
  initSpotlight();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
