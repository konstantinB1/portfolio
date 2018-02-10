const path          = require('path');
const webpack       = require('webpack');
const htmlPlugin    = require('html-webpack-plugin');
const extractText   = require('extract-text-webpack-plugin');
const uglifyJs      = require('uglifyjs-webpack-plugin');

module.exports = 
{


	/**
	 * Config
	 */
	entry: path.resolve( __dirname, 'src/index.js' ),
	output: 
	{
		path: path.resolve( __dirname, 'public' ),
		filename: 'js/app.js'
	}, 


	/**
	 * Dev server
	 */
	devServer: 
	{
		contentBase: path.join( __dirname, 'public' )
	},

  	/**
	 * Loaders
	 */ 
	module: 
	{
		rules:
		[

		    // Css Loader
	        {
	        	test: /\.css$/,
	        	use: extractText.extract(
	        	{
	        		fallback: 'style-loader',
	        		use: 
	        		[ 
		        		{ 
		        			loader: 'css-loader', 
		        		} 
	        		]
	        	})
	        },

	        {
	        	test: /\.(png|jpg|gif)$/,
	        	use:
	        	[
	                {
	                	loader: 'file-loader',
	                	options: 
	                	{
	                		publicPath: '../',
	                		outputPath: 'assets/',
	                		name: '[name].[ext]'
	                	}
	                }
	        	]
	        },

	        // Babel Loader
	        {
	        	test: /\.js$/,
	        	exclude: /(node_modules|public)/,
	        	loader: 'babel-loader',
	        }


		]
	},

	/**
	 * Plugins
	 */
	plugins: 
	[
        new extractText(
        {
        	allChunks: true,
        	filename: 'css/style.css'
        }),
		new htmlPlugin
		({
	        template: './public/index.html'
		})

	],

}