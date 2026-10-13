import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

// Replaces <!-- @include path/to/partial.html --> with the file's contents.
// Paths are relative to /src. Works recursively, so a component can include another.
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
    transformIndexHtml: { order: 'pre', handler: (html) => expand(html) },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.html')) server.ws.send({ type: 'full-reload' });
    },
  };
}

export default defineConfig({
  plugins: [htmlInclude()],
  base: './', // works on GitHub Pages sub-paths and any static host
  build: { target: 'es2019' },
});
