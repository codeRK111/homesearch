module.exports = {
	apps: [
		{
			name: 'homesearchindia',
			script: './server.js',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
				NODE_TLS_REJECT_UNAUTHORIZED: 0,
			},
			watch: '.',
			watch_options: {
				usePolling: true,
			},
			ignore_watch: ['node_modules', 'images', 'static/invoices'],
		},
	],
};
