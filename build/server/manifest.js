const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["fonts/Inter-Italic-VariableFont_opsz,wght.ttf","fonts/Inter-VariableFont_opsz,wght.ttf","fonts/Inter_18pt-Bold.ttf","fonts/Inter_18pt-Medium.ttf","fonts/Inter_18pt-Regular.ttf","fonts/Inter_18pt-SemiBold.ttf","og-image.jpg","robots.txt","twitter-image.jpg"]),
	mimeTypes: {".ttf":"font/ttf",".jpg":"image/jpeg",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BfTBUyl0.js",app:"_app/immutable/entry/app.Dy0saiX1.js",imports:["_app/immutable/entry/start.BfTBUyl0.js","_app/immutable/chunks/sKz5awjo.js","_app/immutable/chunks/CJpVuRZm.js","_app/immutable/entry/app.Dy0saiX1.js","_app/immutable/chunks/dbE6EfY3.js","_app/immutable/chunks/CJpVuRZm.js","_app/immutable/chunks/DsnmJJEf.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D2BpazDu.js')),
			__memo(() => import('./chunks/1-CAzI7oe7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/api/klines",
				pattern: /^\/api\/klines\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BQSNAPbp.js'))
			},
			{
				id: "/api/tickers",
				pattern: /^\/api\/tickers\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DgeneMvF.js'))
			}
		],
		prerendered_routes: new Set(["/","/__data.json"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set(["/","/__data.json"]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
