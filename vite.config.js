import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Expands <!-- @include path/to/partial.html --> (paths relative to /src, nesting allowed)
// and fills three tokens used by the shared header and footer:
//   {{home}}       "" on index.html, "./" on other pages, so #section links work from any page
//   {{wd_active}}  " is-active" on the Website design page, "" elsewhere
//   {{va_active}}  " is-active" on the Voice AI page, "" elsewhere
function htmlInclude() {
  const root = resolve(__dirname, 'src');
  const re = /^([ \t]*)<!--\s*@include\s+(\S+)\s*-->/gm;
  const expand = (html, depth = 0) => {
    if (depth > 8) throw new Error('@include nested too deeply (circular?)');
    return html.replace(re, (_, indent, file) => {
      const body = expand(readFileSync(resolve(root, file), 'utf8'), depth + 1);
      return body.split('\n').map((l) => (l ? indent + l : l)).join('\n').replace(/\s+$/, '');
    });
  };
  return {
    name: 'html-include',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const page = (ctx && (ctx.path || ctx.filename) || '').replace(/\\/g, '/');
        const isHome = /(^|\/)index\.html$/.test(page) || page === '/' || page === '';
        return expand(html)
          .replace(/\{\{home\}\}/g, isHome ? '' : './')
          .replace(/\{\{wd_active\}\}/g, /web-design\.html$/.test(page) ? ' is-active' : '')
          .replace(/\{\{va_active\}\}/g, /voice-ai\.html$/.test(page) ? ' is-active' : '');
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.html')) server.ws.send({ type: 'full-reload' });
    },
  };
}

export default defineConfig({
  plugins: [htmlInclude()],
  base: './', // works on GitHub Pages sub-paths and any static host
  build: {
    target: 'es2019',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'voice-ai': resolve(__dirname, 'voice-ai.html'),
        'web-design': resolve(__dirname, 'web-design.html'),
      },
    },
  },
});
