var http = require("http");
var httpProxy = require("http-proxy");

var proxyServer = httpProxy.createServer({
	router: {
		"subdomain.host.com": "127.0.0.1:3001",
		"subdomain2.host.com": "127.0.0.1:3002"
	}
});
proxyServer.listen(8080, "localhost");