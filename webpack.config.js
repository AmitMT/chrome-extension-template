const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

content_scripts = fs
	.readdirSync('content_scripts')
	.map((content_script_name) => path.join('content_scripts', content_script_name));

content_script_srcs = content_scripts.map((content_script) => path.join(content_script, 'src'));
content_script_publics = content_scripts.map((content_script) =>
	path.join(content_script, 'public')
);

const config = {
	entry: {
		'popup/src/index': './popup/src/index.tsx',
		'background/src/background': './background/src/background.ts',

		// Add the index.ts files inside every content_script
		...content_script_srcs.reduce(
			(prev, content_script_src) => ({
				...prev,
				[path.join(content_script_src, 'index')]: './' + path.join(content_script_src, 'index.ts'),
			}),
			{}
		),
	},
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'popup/src')],
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: { noEmit: false },
							configFile: 'popup/src/tsconfig.json',
						},
					},
				],
			},
			{
				// TODO: Maybe not working
				test: /\.css$/,
				include: [path.resolve(__dirname, 'popup/src')],
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, 'background/src')],
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: { noEmit: false },
							configFile: 'background/src/tsconfig.json',
						},
					},
				],
			},
			...content_script_srcs.map((content_script_src) => ({
				test: /\.tsx?$/,
				include: [path.resolve(__dirname, content_script_src)],
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							compilerOptions: { noEmit: false },
							configFile: path.resolve(__dirname, content_script_src, 'tsconfig.json'),
						},
					},
				],
			})),
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'public/manifest.json', to: path.resolve(__dirname, 'dist/manifest.json') },
				{ from: 'popup/public', to: path.resolve(__dirname, 'dist/popup') },
				{
					from: 'background/public',
					to: path.resolve(__dirname, 'dist/background'),
					noErrorOnMissing: true,
				},
				// Copy the public folders inside every content_script
				...content_script_publics.map((content_script_public) => ({
					from: path.resolve(__dirname, content_script_public),
					to: path.resolve(__dirname, path.join('dist', content_script_public, '..')),
					noErrorOnMissing: true,
				})),
			],
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
	},
};

module.exports = config;
