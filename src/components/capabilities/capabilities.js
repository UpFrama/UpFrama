import { $, $$, drawOnReveal } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';

export function initCapabilities() {
  drawOnReveal('.panel--new');
  registerScrub($('.diff'), 'scale');
}
