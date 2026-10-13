import { $ } from '../../js/utils.js';

export function initFooter() {
  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
}
