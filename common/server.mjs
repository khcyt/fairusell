const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_server_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);import*as fs from"fs";import*as path from"path";import*as os from"os";const fsPromises=fs.promises;import*as express from"express";import*as session from"express-session";import*as cookie from"cookie";import*as cookieParser from"cookie-parser";import*as http from"http";import*as https from"https";import*as mergePatch from"json8-merge-patch";export async function main(server_print_level){if(!cs.app){let UglifyJS=undefined;const __dirname=(await import("./dirname.mjs")).dirname(import.meta.url);let kh_own_path;try{const cwd=process.cwd();kh_own_path=path.resolve("./contrib");if(!fs.existsSync(kh_own_path))throw kh_own_path}catch(error){if(error instanceof SyntaxError)console?.error(`${error} / ${error.stack}`);kh_own_path=path.resolve(__dirname+"/../../../web");if(!fs.existsSync(kh_own_path))throw kh_own_path}kh_global.kh.pathes??=new Map;kh_global.kh.pathes.set("common",__dirname);kh_global.kh.pathes.set("own",kh_own_path.replaceAll("\\","/"));kh_global.kh.pathes.set("own-module",kh_own_path.replaceAll("\\","/")+"/jsm");const jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;const common_prefix=`file:///${kh_global.kh.pathes.get("common")}`;let kh_js={};Object.assign(kh_js,await import(`${jsm_prefix}/kh_earlybird.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_functions${VERSION}.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_classes${VERSION}.js`));const print_level=kh_js.isProduction?"info":"debug";const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>MF`${mf}`));if(!kh_js.isEmpty(server_print_level))kh_log.printLevel(server_print_level);const get_node_module_path=(await import(`${common_prefix}/get_node_module_path${VERSION}.cjs`)).default;kh_global.kh.pathes.set("node-module",get_node_module_path());kh_global.kh.pathes.set("node-module-all",get_node_module_path.all(__dirname));kh_log.debug?.(T9`node module path= ${kh_global.kh.pathes.get("node-module")} / pathes= ${kh_global.kh.pathes.get("node-module-all")}`);const all_pathes=new Set([process.cwd().replaceAll("\\","/"),...[...kh_global.kh.pathes.values()].flat()]);kh_global.kh.pathes.set("search",[...all_pathes.values()]);const kh_db={...await import(`${jsm_prefix}/kh_db${VERSION}.js`)};const reload=undefined;const{import_json}=await import(`${common_prefix}/import_json${VERSION}.mjs`);let common_server_options=await import_json(kh_global.kh.pathes.get("common")+"/server.json")||{};let app_server_options=await import_json("./server.json")||{};common_server_options=mergePatch.apply(common_server_options,common_server_options[kh_js.Environment()]||{});app_server_options=mergePatch.apply(app_server_options,app_server_options[kh_js.Environment()]||{});let private_options_data=import_json(kh_global.kh.pathes.get("common")+"/server_private.json",false,true);if(!kh_js.isEmpty(private_options_data))common_server_options=mergePatch.apply(common_server_options,private_options_data);private_options_data=import_json("./server_private.json",false,true);if(!kh_js.isEmpty(private_options_data))app_server_options=mergePatch.apply(app_server_options,private_options_data);cs.server_options=mergePatch.apply(common_server_options,app_server_options);const app=express.default();cs.app=app;app.locals.title=(()=>{let basename=path.basename(process.cwd());return cs.server_options.app_name||basename})();let static_files_pathes=[];let static_files_val=cs.server_options.app_settings?.static_files||[];if(!Array.isArray(static_files_val))static_files_val=static_files_val.split(path.delimiter);static_files_pathes=[...static_files_pathes,...static_files_val];static_files_val=process.env[`${app.locals.title.toUpperCase()}_STATIC_FILES`]||[];if(!Array.isArray(static_files_val))static_files_val=static_files_val.split(path.delimiter);static_files_pathes=[...static_files_pathes,...static_files_val];static_files_pathes=static_files_pathes.map((sfp=>`${sfp}${!kh_js.isEmpty(sfp)&&!sfp.endsWith("/")?"/":""}`));static_files_pathes=[...static_files_pathes,...static_files_pathes.map((sfp=>`${sfp}../${app.locals.title}/`))];static_files_pathes=kh_js.make_unique(static_files_pathes.map((sfp=>path.resolve(sfp)+"/"))).filter((sfp=>fs.existsSync(sfp)));if(!kh_js.isEmpty(static_files_pathes)){static_files_pathes.forEach((_static_files_path=>app.use(express.static(_static_files_path))));cs.server_options.app_settings.static_files_pathes=static_files_pathes;const config_file_from_static=static_files_pathes.reduce(((file_path,cur_path)=>{if(kh_js.isValid(file_path))return file_path;const cur_file_path=(cur_path.endsWith("/")||cur_path.endsWith("\\")?cur_path:cur_path+"/")+"server.json";return fs.existsSync(cur_file_path)?cur_file_path:file_path}),undefined);if(kh_js.isValid(config_file_from_static)){let static_server_config=fs.readFileSync(config_file_from_static,"utf-8");try{static_server_config=JSON.parse(static_server_config);cs.server_options=mergePatch.apply(common_server_options,static_server_config)}catch(error){kh_log.error?.(`error during read static server config => ${error}`)}}}cs.server_options.key_file=process.env["KEY_FILE"]??cs.server_options.key_file;cs.server_options.cert_file=process.env["CERT_FILE"]??cs.server_options.cert_file;cs.server_options.passw=process.env["PASSPHRASE"]??cs.server_options.passw;let key,cert;try{const pathes=[kh_global.kh.pathes.get("common")+"/",...cs.server_options?.app_settings?.static_files_pathes??[]];key="-"!==cs.server_options.key_file?cs.server_options.key_file:undefined;cert="-"!==cs.server_options.cert_file?cs.server_options.cert_file:undefined;key&&=fs.readFileSync(pathes?.find((sfp=>fs.existsSync(sfp+key)))+key);cert&&=fs.readFileSync(pathes?.find((sfp=>fs.existsSync(sfp+cert)))+cert)}catch(error){kh_log.error?.(T9`read key store fails => ${error}`)}cs.server_options={key,cert,passphrase:cs.server_options.passw,...cs.server_options};kh_global["kh-server-options"]=cs.server_options;if(kh_js.isProduction&&cs.server_options.uglify){cs.UglifyJS??=await import("uglify-es");cs.UglifyJS.private_options_={nameCache:{}};cs.UglifyJS.minify2=function(filename,options={}){return fsPromises.readFile(filename,"utf-8").then((content=>cs.UglifyJS.minify({real_fn:content},{...cs.UglifyJS.private_options_,...options}))).then((code=>Promise.resolve(code))).catch((error=>Promise.reject(error)))};const ori_minify=cs.UglifyJS.minify;cs.UglifyJS.minify=function(code,options={}){return new Promise((function(resolve,reject){const result=ori_minify(code,{...cs.UglifyJS.private_options_,...options});if(result.error)reject(result.error);else resolve(result.code)}))}}Object.assign(cs,await import(`${common_prefix}/utils${VERSION}.mjs`));import(`${common_prefix}/get_release_version${VERSION}.mjs`).then((module=>{cs.getPackageData=module.getPackageData;cs.getReleaseVersion=module.getReleaseVersion}));const fetch_lib=cs.server_options.fetch_lib??"node-fetch";if("node-fetch"==fetch_lib){import("node-fetch").then((({default:fetch})=>{kh_global.fetch??=fetch}))}else if("undici"==fetch_lib)kh_global.fetch=(await import(fetch_lib)).request;else kh_global.fetch=await import(fetch_lib);app.disable("x-powered-by");if(kh_js.isValid(cs.server_options.app_settings?.use_helmet)&&false!==cs.server_options.app_settings.use_helmet){const{default:helmet}=await import("helmet");app.use(helmet(mergePatch.apply({contentSecurityPolicy:false,crossOriginEmbedderPolicy:false,originAgentCluster:false},true===cs.server_options.app_settings.use_helmet?{}:cs.server_options.app_settings.use_helmet)))}if(kh_js.isValid(cs.server_options.app_settings?.use_morgan)&&false!==cs.server_options.app_settings.use_morgan){const{default:morgan}=await import("morgan");const short_frmt=true==cs.server_options.app_settings?.use_morgan?"tiny":cs.server_options.app_settings?.use_morgan;app.use(morgan(short_frmt))}if(true==cs.server_options.app_settings.rawbody.use){const contentType=await import("content-type");app.use(express.raw({inflate:true,limit:cs.server_options.app_settings.rawbody.limit??"50mb",type:function(req){let encoding="utf-8";let content_type;try{content_type=contentType.parse(req);encoding=content_type.parameters.charset}catch(error){}return-1==content_type?.type.indexOf("json")},verify:function(req,res,buf,encoding){req.encoding=encoding}}))}app.use(express.json(cs.server_options.app_settings.json));app.use(express.urlencoded(cs.server_options.app_settings.urlencoded));const session_timeout=(cs.server_options.app_settings?.session_timeout||cs.server_options.session_timeout||36e5)>>>0;const{JSONBINStore}=await import(`${common_prefix}/jsonbinstore${VERSION}.mjs`);const session_store=await JSONBINStore.createStore(cs.server_options["session_store"],{appid:cs.server_options.app_settings?.id??cs.server_options.app_name??cs.server_options.session_cookie_name,autoTimeout:session_timeout});app.set("etag",(cs.server_options.etag=kh_js.string2bool(cs.server_options.etag,undefined,true))??"weak");app.set("trust proxy",kh_js.isProduction);app.set("strict routing",false);app.use(session.default({secret:cs.server_options.session_secret,name:cs.server_options.session_cookie_name,resave:false,saveUninitialized:true,cookie:{secure:kh_js.isProduction,maxAge:session_timeout,sameSite:"lax"},store:session_store,resave:false}));app.use((function(req,res,next){return next()}));app.use((await import(`${common_prefix}/manage_headers${VERSION}.mjs`)).manageHeaders());app.use("/",(function(req,res,next){if("function"!==typeof cs["kh-validation-func"]||true===cs["kh-validation-func"](req,res,next)){return next()}else{kh_log.error?.(T9`unauthorized request in ${kh_js.currentFunctionName()}`);res.status(403);return next(new kh_js.Error("invalid-access"))}}));if(kh_js.isValid(cs.server_options.response)){app.use((function(req,res,next){kh_js.for_in(cs.server_options.response.header,((k,v)=>res.header(k,v)));return next()}))}cs.sessionID=cs.get_session_id(cs.server_options);app.createServer=function(sub_opt={},onlisten){const use_ssl=!kh_js.isHeroku();const http_module=use_ssl?https:http;cs.server_options.protocoll=use_ssl?"https":"http";const{[`${use_ssl?"ssl_":""}port`]:port,reload_port,host}=cs.server_options;const listen_options={port:process.env.PORT||sub_opt.port||port||3444,host:sub_opt.host||host};kh_log.info?.(T9`${app.locals.title} try listen on ${listen_options}, runtime= ${process.version}@${process.platform}`);const server=http_module.createServer(cs.server_options=mergePatch.apply(cs.server_options,sub_opt),this);app.server=()=>server;cs.server=server;if(kh_js.isValid(reload)&&false){cs.app.reload=reload(this,{port:reload_port}).then((reloadReturn=>{server.listen(listen_options,onlisten);return Promise.resolve(reloadReturn)}))}else server.listen(listen_options,onlisten);server.getOptions=function(){return cs.server_options};server.app=()=>app;app.emit("server_ready");return server};let sendTextFile=(await import(`${common_prefix}/send_text_file${VERSION}.mjs`)).sendTextFile;const router=express.Router();cs.router=router;router.get(["/~KHCyT@OWN/*","/contrib/*"],((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);const real_fn=`${kh_global.kh.pathes.get("own")}/${req.originalUrl.substring(req.originalUrl.indexOf("/",1)+1)}`;if(!kh_js.isValid(cs.UglifyJS)||!real_fn.endsWith(".js")&&!real_fn.endsWith(".mjs")){return sendTextFile(real_fn,req,res,cs.app).catch((error=>{kh_log.error?.(T9`router:${cs.get_method2(req)} -> error= ${error}`);return next(error)}))}else{return cs.UglifyJS.minify2(real_fn).then((code=>res.contentType("application/javascript").send(code))).catch((error=>{kh_log.error?.(`error= ${error}`);res.status(error.status||404);return next(error)}))}})).get("/~KHCyT@EXT/*",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);const url=decodeURI(req.originalUrl.substring(req.originalUrl.indexOf("/",1)+1));if(!kh_js.isEmpty(cs.server_options.app_settings.static_files_pathes)){const static_files_pathes=[...cs.server_options.app_settings.static_files_pathes,cs.server_options.app_settings.static_files_pathes[0]+"../"];let founded_file=static_files_pathes.map((sfp=>fs.existsSync(sfp+url)?sfp+url:undefined)).filter((ff=>!kh_js.isEmpty(ff)));if(!kh_js.isEmpty(founded_file))return res.sendFile(path.resolve(founded_file[0]),{headers:{}})}return next("route")})).get(["/version","/rest/:vno/version"],((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);let version=cs.getReleaseVersion();res.json({version,result:version,query:req.path,_links:{self:T9`${cs.getOwnURL(req)}${req.originalUrl}`},_expandable:{}})})).get("/:sub_route?/app-name",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);if(kh_js.isEmpty(req.params.sub_route))return res.json({name:app.locals.title});const sub_route_opt=cs.server_options.sr?.get(req.params.sub_route)||{};return res.json({name:sub_route_opt.app_name||req.params.sub_route})})).get("/client-ip",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);const ip=req.socket?.remoteAddress??"";return res.json({ip:ip.startsWith("::ffff:")?ip.substring("::ffff:".length):ip})})).get("/healthcheck",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);return res.json({uptime:process.uptime(),message:"OK",timestamp:(new Date).toUTCString()})})).get("/copyrights",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);let known_copyrights=import_json(kh_global.kh.pathes.get("common")+"/license.json",false);const pd_dependencies=cs.getPackageData().dependencies;let copyrights_for_transfer=new Map;const ckh=known_copyrights.kh||{};if(kh_js.isString(ckh.txt?.de))ckh.txt.de=ckh.txt?.de.replace(/\$\{YEAR\}/g,1900+(new Date).getYear());if(kh_js.isString(ckh.txt?.en))ckh.txt.en=ckh.txt?.en.replace(/\$\{YEAR\}/g,1900+(new Date).getYear());if(kh_js.isString(ckh.txt))ckh.txt=ckh.txt.replace(/\$\{YEAR\}/g,1900+(new Date).getYear());copyrights_for_transfer.set("kh",ckh);copyrights_for_transfer.set("node.js",known_copyrights["node.js"]);Object.keys(pd_dependencies).forEach((k=>copyrights_for_transfer.set(k,known_copyrights[k])));[...kh_js.Copyright.used.values()].forEach((cpyr=>{if(!copyrights_for_transfer.has(cpyr))copyrights_for_transfer.set(cpyr,known_copyrights[cpyr])}));let client_copyrights=req.query?.values;if(!kh_js.isEmpty(client_copyrights)){try{client_copyrights=JSON.parse(decodeURI(client_copyrights))}catch(error){client_copyrights=undefined}client_copyrights??=[]}client_copyrights.forEach((k=>copyrights_for_transfer.set(k,known_copyrights[k])));copyrights_for_transfer.set("last",known_copyrights.last);return res.json(Object.fromEntries(copyrights_for_transfer))})).get("/app-report/:filename?/:errobj?",((req,res,next)=>{kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);const report=process.report?kh_js.isString(req.params.filename)?process.report.writeReport(req.params.filename,req.params.errobj):process.report.getReport(req.params.filename):"not available";res.json({report})}));const{MakeGetSettingsRouter}=await import(`${common_prefix}/get_settings${VERSION}.mjs`);const get_settingsrouter=await MakeGetSettingsRouter(cs,"/",{router_opt:{base:router,call_use:true}});router.get(/^\/|^\/\*/,(function(req,res,next){kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl} ~ ${req.path}, sessionID= ${cs.sessionID(req)}`);const session_id=cs.sessionID(req);let resolved_file;if("/"===req.path){let start_files=[cs.server_options.start_file||"",`./${cs.server_options.start_file||""}`,`./${app.locals.title}.html`,"./index.html",`${kh_global.kh.pathes.get("common")}/index.html`,`./${app.locals.title}/index.html`,,`./${app.locals.title}/${app.locals.title}.html`].filter((sf=>3<sf?.length));start_files=[...start_files,...start_files.map((fn=>fn.replace(".html",".htm")))];let start_file=start_files.find((sf=>!kh_js.isEmpty(sf)&&fs.existsSync(sf)));res.cookie("start_file",start_file,{sameSite:"Lax"});if(start_file){sendTextFile(start_file,req,res,cs.app).catch((error=>{kh_log.error?.(T9`router:${cs.get_method2(req)} -> error= ${error}`);return next(error)}))}else{kh_log.warn?.(`Could't self located startfile`);next()}}else{if(req.path.endsWith("/"))return res.redirect(req.path.substring(0,req.path.length-1));let url=decodeURIComponent(req.originalUrl);let path=kh_global.kh.pathes.get("search").find((p=>fs.existsSync(p+url)));if(!path){kh_log.debug?.(`Could't self located ${url}`);next()}else{resolved_file=path+url;if(!kh_js.isValid(cs.UglifyJS)||!resolved_file.endsWith(".js")&&!resolved_file.endsWith(".mjs")){fsPromises.stat(resolved_file).then((stats=>Promise.resolve({resolved_file,stats}))).catch((error=>{kh_log.warn?.(T9`process error(${error}) in ${cs.get_method2(req)}`);return Promise.resolve({resolved_file})})).then((data=>{if(false!==data){let{resolved_file,stats}=data;sendTextFile(resolved_file,req,res,cs.app).catch((error=>{kh_log.error?.(T9`router:${cs.get_method2(req)} -> error= ${error}`);return next(error)}))}}))}else{cs.UglifyJS.minify2(resolved_file).then((code=>res.contentType("application/javascript").send(code))).catch((error=>{kh_log.error?.(`router:${cs.get_method2(req)} -> error= ${error}`);res.status(error.status||404);return next(error)}))}}}kh_log.debug?.(`router:${cs.get_method2(req)}) -> resolved file= ${resolved_file}`);if(!kh_js.isEmpty(req.query)&&"function"===typeof router["queryFunc"])router["queryFunc"](req)}));router.get("/~bin/*",((req,res,next)=>{kh_log.debug?.(T9`check for file with binary data ${req.url}, ${req.params}, ${req.query}`);const session_id=cs.sessionID(req);const url=decodeURI(req.url.substring("/~bin/".length));if(!kh_js.isEmpty(cs.server_options.app_settings.static_files_pathes)){const founded_file=cs.server_options.app_settings.static_files_pathes.map((sfp=>fs.existsSync(sfp+url)?sfp+url:undefined)).filter((ff=>!kh_js.isEmpty(ff)));if(!kh_js.isEmpty(founded_file)){const buffer=fs.readFileSync(founded_file[0],{encoding:null});const stats=fs.statSync(founded_file[0]);const mtime=stats.mtime;const size=stats.size;res.writeHead(200,{"Content-Type":"application/octet-stream","Last-Modified":mtime.toUTCString(),"Content-Length":buffer.length});res.write(buffer,"binary");return res.end(null,"binary")}}return next("route")}));router.post("/*",(async function(req,res,next){kh_log.debug?.(`router:${cs.get_method2(req)}) -> request= ${req.originalUrl}, sessionID= ${cs.sessionID(req)}`);let filename;if(!kh_js.isEmpty(req.originalUrl)&&!req.originalUrl.startsWith("/~")&&(filename=path.resolve(`./data${req.originalUrl}`))){const last_sl=filename.lastIndexOf(path.sep);if(fs.existsSync(filename.substring(0,last_sl+1))){kh_log.debug?.(`1. post JSON-Data for JSON file >>${req.originalUrl}<< -> save ${filename}`);try{await fsPromises.writeFile(filename,JSON.stringify(req.body));kh_log.debug?.("Write files successful");res.sendStatus(201)}catch(err){kh_log.debug?.(`Write data fails for url(${filename}), err= ${err}`);res.status(404)}}}return next()}),(function(req,res,next){return next("route")}));app.use(router);let all_sub_routes_promise=Promise.resolve(true);if(!kh_js.isEmpty(cs.server_options.app_settings.routes)){if(!kh_js.isValid(cs.server_options.sr)){all_sub_routes_promise=new kh_js.Deferred;cs.server_options.sr=Promise.all([import(`${common_prefix}/sr_options${VERSION}.mjs`),import(`${common_prefix}/router_sub_route${VERSION}.mjs`)]).then((async([{SROptionsMap},{MakeRouter4SubRoute}])=>{cs.server_options.sr=new SROptionsMap;async function make_router(sub_route,value){try{if(true===value)value={};else if(false===value)value={enable:false};cs.server_options.sr.merge(sub_route,{enabled:kh_js.string2bool(value.enable)??true});const filter=function(req,res,next){if(false!=cs.server_options.sr.get(sub_route).enabled)return next();else res.status(404).end()};const config=mergePatch.apply(value.config||{},{router_opt:{base:app,call_use:true,filter}});const esm=false!==kh_js.string2bool(value.esm);const{MakeRouter}=!kh_js.isEmpty(value.router)?esm?await import(`file:///${path.resolve(value.router)}.mjs`):(await import(`file:///${path.resolve(value.router)}.js`)).default():{MakeRouter:MakeRouter4SubRoute};return MakeRouter(sub_route,config).then((async router=>router)).catch((async error=>{(kh_log??console).error?.(T9`error during process preconfigured route's ${sub_route} => ${value} => ${error} // `+T9`${error.stack}`);throw error}))}catch(error){(kh_log??console).error?.(T9`error during process preconfigured route ${sub_route} => ${value} => ${error} // ${error.stack}`);throw error}}function cvt_route(sub_route,value){if(kh_js.isValid(sub_route)&&!sub_route.startsWith("/"))sub_route="/"+sub_route;if(kh_js.isString(value)){try{value=JSON.parse(value)}catch(error){return}}return make_router(sub_route,value)}const all_sub_routes_converted=Object.entries(cs.server_options.app_settings.routes).map((([sub_route,value])=>cvt_route(sub_route,value))).filter((p=>kh_js.isValid(p)));return Promise.allSettled(all_sub_routes_converted)})).finally((async()=>{all_sub_routes_promise.resolve(true)}))}}process.on("SIGABRT",(()=>{kh_log.warn?.("SIGABRT signal received.");cs.server?.close((()=>{kh_log.info?.("Http server closed.")}));process.exit(0)})).on("SIGTERM",(()=>{kh_log.warn?.("SIGTERM signal received.");cs.server?.close((()=>{kh_log.info?.("Http server closed.")}));process.exit(0)})).on("unhandledRejection",((reason,p)=>{kh_log.error?.(T9`Unhandled Rejection at: Promise ${p}, reason: ${reason} / ${reason.stack}`);cs.server?.close((()=>{kh_log.info?.("Http server closed.")}));process.exit(0)})).on("uncaughtException",(error=>{kh_log.error?.(T9`uncaughtException : errro ${error} / ${error.stack}`);cs.server.close((()=>{kh_log.info?.("Http server closed.")}));process.exit(0)}));Promise.all([kh_js.defer(500),all_sub_routes_promise]).then((async()=>{if(!kh_js.isValid(cs.server)){kh_log.info?.("start server from base server module");cs.app.createServer()}app.use((function errorhandling(error,req,res,next){const msg2send=kh_db?.Util.cvt_error(error,error._status??404,req)??error;delete msg2send._status;if("function"===typeof error.log)error.log(msg2send);else kh_log.error?.(T9`router:${cs.get_method2(req)} -> error= ${msg2send.error||msg2send}`);return res.status(msg2send.status).json(msg2send)}))}))}kh_global.LoadedScripts.get(mf).resolve(ms);return cs.app}kh_global.setTimeout(main,4e3);