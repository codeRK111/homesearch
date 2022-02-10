module.exports = {
	apps: [
		{
			name: 'homesearch18',
			script: './server.js',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
			watch: '.',
			watch_options: {
				usePolling: true,
			},
			ignore_watch: ['node_modules', 'images', 'static/invoices'],
		},
	],
};
