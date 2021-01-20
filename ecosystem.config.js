module.exports = {
	apps: [
		{
			name: 'homesearch18',
			script: './server.js',
			env: {
				NODE_ENV: 'production',
				PORT: 8080,
			},
		},
	],
};
