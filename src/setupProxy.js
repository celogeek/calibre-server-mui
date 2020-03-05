const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
        '/api',
        {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api' : '/interface-data'
            }
        },
    ),

    createProxyMiddleware(
      '/thumb',
      {
          target: 'http://localhost:8080/get',
          changeOrigin: true,
      },
    ),

  );
};