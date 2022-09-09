const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_router_sub_route_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;let common_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;common_prefix=`file:///${kh_global.kh.pathes.get("common")}`}else{jsm_prefix=`/contrib/jsm`;console.assert(0,`${mf} is only for node.js`)}import*as mergePatch from"json8-merge-patch";let kh_js={};Object.assign(kh_js,await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_classes${VERSION}.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_functions${VERSION}.js`));let print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));const{forward}=await import(`${common_prefix}/forward_request${VERSION}.mjs`);const{SROptionsMap}=await import(`${common_prefix}/sr_options${VERSION}.mjs`);const{get_method2,get_session_id}=await import(`${common_prefix}/utils${VERSION}.mjs`);const name=MF`${mf}`;export class Router extends(await import("express")).Router{constructor(base,own_route,options={}){options=kh_js.cloneObject(options);const call_use=options.call_use;delete options.call_use;base=base??options.base;delete options.base;const filter=options.filter;delete options.filter;super(options);const proto=Object.getPrototypeOf(this);Object.setPrototypeOf(this,Router.prototype);Object.setPrototypeOf(Object.getPrototypeOf(this),proto);if(base instanceof Router){base.addChild(this);this["#base_router_"]=base}else if("function"===typeof base?.use){this["#base_"]=base}if(!kh_js.isEmpty(own_route)&&!own_route.startsWith("/"))own_route="/"+own_route;this["#own_route_"]=own_route;if(call_use&&!kh_js.isEmpty(this.ownRoute)){let routes=[];if(filter)routes.push(filter);routes.push(this);(this.baseRouter??this.base)?.use(this.ownRoute,routes)}this["#child_router_"]=[]}addChild(sub_router){if(sub_router instanceof Router)this["#child_router_"].push(sub_router)}fullRoute(){return`${this.baseRouter?.fullRoute()??""}${this.ownRoute??"/???"}`}get root(){return this["#base_router_"]?.root??this}get base(){return this["#base_"]}get baseRouter(){return this["#base_router_"]}get ownRoute(){return this["#own_route_"]}get rootRoute(){return this.root.ownRoute}get childs(){return this["#child_router_"]}}function join(sub_route,router_name){if(kh_js.isEmpty(kh_global.kh.storage[router_name]))kh_log.warn?.(T9`possible incorrect subRoute joining ${sub_route} <=> ${router_name}`);const server_options=cs.server_options;server_options.sr.merge(sub_route,{route:sub_route,join_to:router_name});server_options.sr.merge(router_name,{route:sub_route,joined_from:sub_route,config:async()=>{try{return server_options.sr.get(sub_route).sub_route_config_loaded.then((async()=>server_options.sr.get(sub_route)))}catch(error){kh_log.error?.(T9`error during join sub route options => ${error}`);return Promise.reject(error)}}})}export async function checkOptionsLoaded(sub_route,sr_options={}){if(kh_js.isEmpty(sub_route))throw new kh_js.Error({msg:["param-not-determined","sub-route"]});const server_options=cs.server_options;const fs=await import("fs");const path=await import("path");const fsPromises=fs.promises;const{getFileFromStaticPathes}=await import(`${common_prefix}/files_from_pathes${VERSION}.mjs`);server_options.sr??=new SROptionsMap;let sub_route_config_must_load=server_options.sr.get(sub_route)?.sub_route_config_must_load;if(!kh_js.isValid(sub_route_config_must_load)){sub_route_config_must_load=true;server_options.sr.merge(sub_route,{sub_route_config_loaded:new kh_js.Deferred,sub_route_config_must_load})}if(true==sub_route_config_must_load){if(!kh_js.isEmpty(sr_options.join)&&!kh_js.isValid(server_options.sr.get(sr_options.join)))join(sub_route,sr_options.join);delete sr_options.join;server_options.sr.merge(sub_route,sr_options);let possible_files=[fn=>`./${fn}.json`,fn=>`./${fn.replace(/-/g,"_")}.json`,fn=>`${fn}/server.json`,fn=>`./${/([^-_]*?)[-_]?app$/.exec(fn)?.[1]??fn}.json`];possible_files=possible_files.map((f=>f(sub_route)));let sub_route_server_config=possible_files.find((sf=>!kh_js.isEmpty(sf)&&fs.existsSync(sf)));new Promise((function(resolve,reject){if(kh_js.isValid(sub_route_server_config)){const resolved_file=path.resolve(sub_route_server_config);fsPromises.readFile(resolved_file,"utf-8").then((content=>{if(kh_js.isString(content)){try{content=JSON.parse(content)}catch(error){kh_log.warn?.(T9`possible incorrect file format during parse ${resolved_file}, error => ${error}`);content={}}}content=mergePatch.apply(content,content[kh_js.Environment()]||{});server_options.sr.merge(sub_route,content);server_options.sr.get(sub_route).sub_route_config_must_load=false})).finally((()=>resolve(true)))}else resolve(false)})).then((async()=>{const express=await import("express");const sfp_copy=[...server_options.app_settings.static_files_pathes??[]];sfp_copy.forEach((sfp=>{sfp=path.resolve(`${sfp}../${sub_route}/`)+"/";if(fs.existsSync(sfp)&&!server_options.app_settings.static_files_pathes.includes(sfp)){server_options.app_settings.static_files_pathes.push(sfp);cs.app.use(express.static(sfp))}}));let further_config=getFileFromStaticPathes(`${sub_route}.json`);if(!kh_js.isValid(further_config)&&-1!=sub_route.indexOf("-")){further_config=getFileFromStaticPathes(`${sub_route.replace(/-/g,"_")}.json`)}if(kh_js.isValid(further_config)){return fsPromises.readFile(further_config,"utf-8").then((async content=>{if(kh_js.isString(content)){try{content=JSON.parse(content)}catch(error){kh_log.warn?.(T9`possible incorrect file format during parse ${further_config}, error => ${error}`);content={}}}content=mergePatch.apply(content,content[kh_js.Environment()]||{});server_options.sr.merge(sub_route,content);return true})).catch((async error=>{kh_log.error?.(T9`error during read sub route config => ${error}`);return false}))}else Promise.resolve(false)})).then((async further_config_resolved=>{let further_config=getFileFromStaticPathes(`${sub_route}-ui.json`,[`html/`]);further_config??=getFileFromStaticPathes(`${sub_route}-ui.json`);further_config??=-1!=sub_route.indexOf("-")?getFileFromStaticPathes(`${sub_route.replace(/-/g,"_")}-ui.json`):undefined;if(kh_js.isValid(further_config)){return fsPromises.readFile(further_config,"utf-8").then((async content=>{if(kh_js.isString(content)){try{content=JSON.parse(content)}catch(error){kh_log.warn?.(T9`possible incorrect file format during parse ${further_config}, error => ${error}`);content={}}}content=mergePatch.apply(content,content[kh_js.Environment()]||{});server_options.sr.merge(sub_route,{ui:content});return further_config_resolved})).catch((async error=>{kh_log.error?.(T9`error during read sub route ui config => ${error}`);return further_config_resolved}))}else Promise.resolve(further_config_resolved)})).then((async further_config_resolved=>server_options.sr.get(sub_route).sub_route_config_loaded.resolve(further_config_resolved)))}return server_options.sr.get(sub_route).sub_route_config_loaded}export function MakeRouter4SubRoute(_sub_route,sr_options={}){const server_options=cs.server_options;const sessionID=get_session_id(server_options);if(!kh_js.isEmpty(_sub_route)&&!_sub_route.startsWith("/"))_sub_route="/"+_sub_route;const router=new Router(sr_options.router_opt?.base,_sub_route,sr_options.router_opt);delete sr_options.router_opt;server_options.sr??=new SROptionsMap;if(!kh_js.isEmpty(_sub_route)){server_options.sr.merge(_sub_route,{sub_route_config_loaded:new kh_js.Deferred,sub_route_config_must_load:true});if(!kh_js.isEmpty(sr_options.join))join(_sub_route,sr_options.join)}router.all(["/","/*"],(async(req,res,next)=>{kh_log.trace?.(T9`prerequisits in router:${get_method2(req)}) -> request= ${req.originalUrl}, path= ${req.path} query= ${req.query} sessionID= ${sessionID(req)}`);let question_mark=req.originalUrl.indexOf("?");let pos_sub_route_end=req.originalUrl.indexOf("/",1);if(-1==pos_sub_route_end||-1!=question_mark&&pos_sub_route_end>question_mark)pos_sub_route_end=-1!=question_mark?question_mark:req.originalUrl.length;let sub_route=req.originalUrl.substring(1,pos_sub_route_end);req.sub_route=sub_route;return checkOptionsLoaded(sub_route,sr_options).then((()=>next("route")))})).get(["/","/*"],(async(req,res,next)=>{kh_log.trace?.(`check for start-file ${req.originalUrl.substring(1)} in router:${get_method2(req)}) -> request= ${req.originalUrl}, `+`path= ${req.path} sessionID= ${sessionID(req)}`);let sub_route=req.sub_route;const fs=await import("fs");const mime=(await import("mime")).default;const mime_extension=(mime.getExtension||mime.extension).bind(mime);const mime_getType=(mime.getType||mime.lookup).bind(mime);return server_options.sr.get(sub_route).sub_route_config_loaded.then((async()=>{let last_point=req.path.lastIndexOf(".");const suffix=-1!=last_point?req.path.substring(last_point+1):"";let req_content_type=req.headers["content-type"];if("/"!=req.path&&(kh_js.isEmpty(suffix)||kh_js.isEmpty(mime_getType(suffix))))return next("route");if(true==sr_options?.mainapp||1<req.path.length){let question_mark=req.originalUrl.indexOf("?");const query_string=-1!=question_mark?req.originalUrl.substring(question_mark):"";return forward({path:`${req.path}${query_string}`,pipe:true,fetch_options:{get_native:true}},req,res,next)}let possible_files=[fn=>`./${fn}.html`,fn=>`./${fn.replace(/-/g,"_")}.html`,fn=>`${fn}/index.html`,fn=>`${fn}/${server_options.start_file}`,fn=>`./${/([^-_]*?)[-_]?app$/.exec(fn)?.[1]??fn}.html`];possible_files=possible_files.map((f=>f(sub_route)));possible_files=[...possible_files,...possible_files.map((fn=>fn.replace(".html",".htm")))];let start_file=possible_files.find((sf=>!kh_js.isEmpty(sf)&&fs.existsSync(sf)));if(kh_js.isEmpty(start_file))throw kh_js.Error.create(undefined,"data-not-determined","start-file",{status:404});res.cookie("start_file",start_file,{sameSite:"Lax"});ms.sendTextFile??=(await import(`./send_text_file${VERSION}.mjs`)).sendTextFile;return ms.sendTextFile(start_file,req,res,cs.app).then((()=>next("route")))})).catch((error=>next(error)))})).get(["/version","/rest/:vno/version"],((req,res,next)=>forward({path:req.path,pipe:true,fetch_options:{get_json:true}},req,res,next)));return router}kh_global.LoadedScripts.get(mf).resolve(ms);