import { $$ } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';

// Every second card drifts at a slightly different speed.
export function initIndustries() {
  $$('.ind-grid .ind:nth-child(even)').forEach((e) => registerScrub(e, 'par', 0.07));
}
