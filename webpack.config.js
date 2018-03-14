const path = require('path');

module.exports = {
	entry: "./main.ts",
	output: { 
	    filename: 'app.js',
	    path: path.resolve(__dirname, '/dist') 
	},
	module: {
		rules: [
			{
				test: /.ts$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
}