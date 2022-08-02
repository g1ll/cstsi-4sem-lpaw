import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/main.js',
	output: {
	  compact: true,
	  file: 'public/js/bundle.js',
	  plugins:[terser()]
	}
  };