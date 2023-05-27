import svelte from 'rollup-plugin-svelte';
import alias from "@rollup/plugin-alias";
import replace from "@rollup/plugin-replace";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import { spawn } from 'node:child_process';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.ts',
  output: [
    {
      sourcemap: true,
      format: 'iife',
      name: 'fntAdmin',
      file: 'public/dist/svelte-admin-dev.js',
  }
  ],
  plugins: [
    replace({
      isProduction: production,
      preventAssignment: true,
    }),
    nodeResolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: ['.js', '.ts', '.svelte'],
    }),
    svelte({
      preprocess: autoPreprocess({}),
      compilerOptions: {
        hydratable: true,
        // generate: 'ssr',
        dev: !production,
      },
    }),
    typescript(),
    alias({
      entries: [
        { find: '@sveadmin/common', replacement: '../common/src/main.ts' },
        { find: '@sveadmin/element', replacement: '../element/src/main.ts' },
        { find: '@sveadmin/table', replacement: '../table/src/main.ts' },
      ]
    }),
		postcss({
			extract: 'svelte-admin-dev.css'
		}),
		commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('static'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  preserveSymlinks: true,
  watch: {
    clearScreen: false
  }
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
