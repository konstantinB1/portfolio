const ExtractTextPlugin = require('extract-text-webpack-plugin');
const uglify            = require('uglifyjs-webpack-plugin');
const path              = require('path');
const webpack           = require('webpack');

const autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },	
})

module.exports = {

	// import export
	entry: 
	{
		scripts: path.join( __dirname, './webpack/js/export.js' ),
		global:  path.join( __dirname, './webpack/js/global.js' )
    },
	output: {	
		filename: 'js/[name].js',
	},

	// modules
	module: 
	{
	    rules: 
	    [
	        // CSS final output configuration
	        {
	        	 test: /\.scss$/,
	        	 exclude: '/node_modules',
	        	 use: ExtractTextPlugin.extract(
	        	 {
	        		 fallback:  'style-loader',
	        		 use:       ['css-loader', 'resolve-url-loader', autoprefix, 'sass-loader'] ,
	        	 })
	        },
	        { 
	            test: /\.js$/, 
	            exclude: '/node_modules', 
	            loader: 'babel-loader' 
	        },	        
	        { 
		        test: /(ttf|jpg|png|svg)$/, 
		        exclude: ['/node_modules/'], 
		        loader: 'file-loader',
		        options: 
		        {
			         file: '[name].[ext]',
			         publicPath: '/',		          
		        }
	        },	
	    ]
	},

	// plugins	
	plugins: [
		new uglify(),
		new ExtractTextPlugin(
		{
			filename: 'css/style.css',
			disable: false,
			allChunks: true
		}),		
		new webpack.ProvidePlugin(
		{
			$: 'jquery',
			jQuery: 'jquery'
		})
	],			


}