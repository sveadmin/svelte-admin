import svelte from 'rollup-plugin-svelte';
import replace from "@rollup/plugin-replace";
import resolve from '@rollup/plugin-node-resolve';
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
    { file: 'dist/index.js', 'format': 'umd', name: 'SvelteAdminCommon', sourcemap: true }
  ],
  plugins: [
    replace({
      isProduction: production,
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

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
		postcss({
			extract: 'svelte-admin-common.css'
		}),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
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
