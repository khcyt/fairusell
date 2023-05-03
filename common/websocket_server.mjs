const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_websocket_server_module";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`}else{jsm_prefix=`/contrib/jsm`;console.assert(0,`${mf} is only for node.js`)}const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`),...await import(`${jsm_prefix}/kh_classes${VERSION}.js`),...await import(`${jsm_prefix}/kh_functions${VERSION}.js`)};let print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));const kh_io={...await import(`${jsm_prefix}/kh_io${VERSION}.js`),...await import(`${jsm_prefix}/kh_io_ws${VERSION}.js`)};const name=MF`${mf}`;const verifier=(web_server,info)=>{const originURL=new URL(info.origin);const hostName=originURL.hostname;const server_ips=cs.get_server_ips();const ip_index=server_ips.findIndex((ip=>ip.address==hostName));if(!kh_js.isIPAddress(hostName))return true;const verified=-1!=ip_index&&(kh_js.isEmpty(originURL.port)||web_server.address().port==originURL.port);kh_log.debug?.(`verify ${info.origin} against [${[...server_ips.map((ip=>ip.address))]}]${!kh_js.isEmpty(originURL.port)?":"+web_server.address().port:""}; `+`result= ${verified}`);if(!verified)kh_log.error?.(T9`compare fails with server IP's ${server_ips} and origin-port /${originURL.port}/`);return verified};import*as cookie from"cookie";import*as cookieParser from"cookie-parser";import{WebSocket,WebSocketServer}from"ws";export function createWebSocketServer(sessionData,handler,options={}){if(!kh_js.isValid(sessionData))throw new kh_js.Error("param-invalid","sessionData");const noServer=!kh_js.isEmpty(options.sub_route);const web_server=options.server??cs["server"];options=kh_js.JSON8MergePatch.apply(kh_js.cloneObject(web_server.getOptions?.().wss||{}),options,{assign:true});let create_options=noServer?{noServer}:{server:web_server};const wss=new WebSocketServer({...create_options,WebSocket:getWebSocketClass(options.WebSocket,options.enumSocket),clientTracking:options.clientTracking??true,verifyClient:verifier.bind(null,web_server)});wss.sessionData=()=>sessionData;wss.webServer=()=>web_server;let wd_obj=undefined;wss.close=function(){const fclose=wss.close;return function close(){fclose.apply(wss,arguments);for(const ws of wss.clients){ws.terminate()}}}();wss.on("connection",((ws,req)=>{try{kh_log.debug?.(T9`websocket status is "on(connection)", request from client: ${req.socket.remoteAddress}, ${req.url}`);let sid=cookieParser.signedCookie(cookie.parse(req.headers.cookie)[web_server.getOptions().session_cookie_name],web_server.getOptions().session_secret);if(-1==sid)kh_log.info?.("invalid session id(-1) during websocket connection start");sessionData.set(sid,Object.assign(sessionData.get(sid)||{},{ws}));const bind_handler=event=>{const onevent=`on${event}`;if(kh_js.isValid(handler?.[onevent])){if(!Array.isArray(handler[onevent]))handler[onevent]=[handler[onevent]];handler[onevent].forEach((_handler=>ws.on(event,_handler.bind(null,ws,sid))))}};["message","open","close","error"].forEach(bind_handler);handler?.eventmessage&&(ws.onmessage=handler.eventmessage.bind(null,ws,sid));handler?.eventclose&&(ws.onclose=handler.eventclose.bind(null,ws,sid));handler?.eventerror&&(ws.onerror=handler.eventerror.bind(null,ws,sid));ws.on("message",on_message.bind(null,ws,sid));ws.on("unexpected-response",((req,res)=>{kh_log.warn?.(T9`unexpected response in ${ws.name()} => ${res.url}, ${res.headers}`)}));ws.initOnConnection(wss,req);ws.isAlive=true;ws.ping=function(callback){if(true!==ws.watchdog_suspended){ws.isAlive=false;if(ws.isOpen())ws.send("ping",callback);else if(callback)callback(new kh_js.Error({status:406,msg:"socket not open"}))}else ws.isAlive=true};ws.pong=function(callback){if(ws.isOpen())ws.send("pong",callback);else if(callback)callback(new kh_js.Error({status:406,msg:"socket not open"}))};ws.onpong=()=>ws.isAlive=true;ws.onping=()=>ws.pong();ws.emit("open");handler?.eventopen?.(ws,sid,req);wd_obj??=kh_global.setInterval((function ping(){if(-1==[...wss.clients].findIndex((ws=>ws.isAlive))){const wd_obj_old=wd_obj;wd_obj=undefined;kh_log.info?.("cancel WebSocketServer WatchDog Interval Timer (all Clients dead)");kh_global.clearInterval(wd_obj_old)}wss.clients.forEach((ws=>{if(false===ws.isAlive&&true!==ws.watchdog_suspended)return ws.terminate();ws.ping()}))}),web_server.getOptions().app_settings.watchdog_itervall||3e4)}catch(error){kh_log.error?.(T9`error in websocket on connection => ${error}`)}}));wss.on("listening",(le=>{kh_log.info?.("websocket is on(listening/connected)",le)}));wss.broadcast_msg=function(req,msg,filter){const from_session_data=sessionData.get(req);if(!kh_js.isValid(from_session_data))throw new kh_js.Error({status:400,msg:"invalid-argument"});const msg2send=kh_js.isString(msg)?msg:JSON.stringify(msg);const sid=cs.sessionID(req);for(const[key,cur_session_data]of sessionData){if(key==sid)continue;if(false!==filter?.(cur_session_data,from_session_data,msg2send)){kh_log.debug?.(T9`data in session data ${Object.keys(cur_session_data)}, send ${msg2send}`);const ws=cur_session_data.ws;if(kh_js.isValid(ws)&&WebSocket.OPEN===ws.readyState)ws.send(msg2send)}}};wss.broadcast_msg2=function(ws_from,msg,filter){if(!kh_js.isValid(ws_from))throw new kh_js.Error({status:400,msg:"invalid-argument"});const msg2send=kh_js.isString(msg)?msg:JSON.stringify(msg);for(const ws_cur of wss.clients){if(ws_from==ws_cur)continue;if(!filter||filter(ws_cur,ws_from,msg2send)){if(kh_js.isValid(ws_from)&&WebSocket.OPEN===ws_from.readyState)ws_cur.send(msg2send)}}};function on_message(ws,sid,message_data,is_binary){try{if(is_binary||Buffer.isBuffer(message_data))message_data=message_data.toString();if("ping"==message_data||"pong"==message_data){if("function"===typeof ws[`on${message_data}`])ws[`on${message_data}`]();return}let msgs=kh_js.isString(message_data)&&JSON.parse(message_data)||message_data;if(!Array.isArray(msgs))msgs=[msgs];msgs.forEach((msg=>{if(kh_js.isString(msg)){if("ping"==msg||"pong"==msg){if("function"===typeof ws[`on${msg}`])ws[`on${msg}`]();return}}const enumSocket=options.enumSocket??kh_io.enumSocket;const msg_type=enumSocket.valueOf(msg,enumSocket.attr_msg_type_);const msg_sub_type=enumSocket.valueOf(msg,enumSocket.attr_msg_sub_type_);kh_log.trace?.(T9`ws message_data ${sid} => ${msg_type} - ${msg_sub_type} - ${msg[enumSocket.attr_value_]}`);switch(msg_type){case enumSocket.mt_broadcast_:{if(enumSocket.mt_broadcast_==msg_sub_type){msg=msg[enumSocket.attr_value_]}wss.broadcast_msg2(ws,msg);break}case enumSocket.mt_send_back_:{msg=msg[enumSocket.attr_value_];ws.send(kh_js.isString(msg)&&msg||JSON.stringify(msg));break}case enumSocket.mt_socket_status_:{const session_data=sessionData.get(sid);switch(msg_sub_type){case enumSocket.mt_watchdog_:{if("suspend"==msg[enumSocket.attr_value_]){ws.watchdog_suspended=true;if(kh_js.isHeroku()){if(kh_js.isNumber(sessionData.pp_id)&&-1!=sessionData.pp_id){kh_global.clearInterval(sessionData.pp_id);sessionData.pp_id=-1}session_data.pp_id=kh_global.setInterval((()=>{ws.send("pp")}),3e4)}}else if("resume"==msg[enumSocket.attr_value_]){ws.watchdog_suspended=false;if(kh_js.isNumber(sessionData.pp_id)&&-1!=sessionData.pp_id){kh_global.clearInterval(sessionData.pp_id);sessionData.pp_id=-1}}break}default:{if("closed"==msg[enumSocket.attr_value_]){kh_js.defer(100).then((async()=>sessionData?.delete(sid)))}break}}break}default:break}}))}catch(error){kh_log.warn?.(T9`mh | unexpected error or ws message with unknown data format / ${message_data} / error => ${error} / sid => ${sid}`)}}function getWebSocketClass(base=WebSocket,enumSocket){class WSC extends base{#wss_;remoteAddress_;#sid_;constructor(){super(...arguments)}initOnConnection(wss,req){this.wss=wss;if(!kh_js.isValid(this.url))this._url=req.url||"";this.remoteAddress_=req.socket?.remoteAddress||"";this.#sid_=cookieParser.signedCookie(cookie.parse(req.headers.cookie)[wss.webServer().getOptions().session_cookie_name],wss.webServer().getOptions().session_secret)}set wss(wss){this.#wss_=wss}get wss(){return this.#wss_}get sid(){return this.#sid_}isOpen(){return super.isOpen?.()??WebSocket.OPEN==this.readyState}isReady(){return super.isReady?.()??(WebSocket.CONNECTING==this.readyState||WebSocket.OPEN==this.readyState)}isClosed(){return!this.isReady()}myFunc(){return this.#wss_}room(){return super.room?.()??(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(){const url_split=this.url.split("/");return url_split[2]||""};Object.defineProperty(pproto,"room",{value});return super.room()})()}shortName(force_with_room=false){return super.shortName?.(force_with_room)??(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(force_with_room=false){const url_split=this.url.split("/");return(url_split[1]||"")+(force_with_room?`/${this.room()}`:"")||this.url};Object.defineProperty(pproto,"shortName",{value});return super.shortName(force_with_room)})()}name(){return super.name?.()??(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(){this.name_??=`${this.remoteAddress_.startsWith("::ffff:")?this.remoteAddress_.substring("::ffff:".length):this.remoteAddress_}/${this.shortName(true)}`;return this.name_};Object.defineProperty(pproto,"name",{value});return super.name()})()}broadcast(msg,filter){return this.wss.broadcast_msg2(this,msg,filter)}send_text(text,callback){if("function"==typeof super.send_text)return super.send_text(text,"function"===typeof callback?callback:undefined);else(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(text,callback){if(kh_js.isEmpty(text))return;text=kh_js.isString(text)?text:JSON.stringify(text);if(this.isOpen())this.send(text,"function"===typeof callback?callback:undefined);else callback?.(new kh_io.HTTPError(kh_js.Error)({status:406,msg:"websocket not open"}))};Object.defineProperty(pproto,"send_text",{value});return super.send_text(text,callback)})()}}if(!kh_js.isValid(enumSocket))return WSC;return class extWSC extends WSC{constructor(){super(...arguments);this.result_promises_??=new Map;this.on("message",this.msgh.bind(this))}resolve_request(msg){if("function"==typeof super.resolve_request)return super.resolve_request(msg);else(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(msg){this.result_promises_.get(msg[enumSocket.attr_request_id_])?.resolve(msg)};Object.defineProperty(pproto,"resolve_request",{value});return super.resolve_request(msg)})()}reject_request(msg,error){if("function"==typeof super.reject_request)return super.reject_request(msg);else(()=>{const pproto=Object.getPrototypeOf(WSC.prototype);const value=function(msg){this.result_promises_.get(msg[enumSocket.attr_request_id_])?.reject(error??msg)};Object.defineProperty(pproto,"reject_request",{value});return super.reject_request(msg,error)})()}send_text(text,callback){if(kh_js.isEmpty(text))return;const hots=kh_js.isPlainObject(callback);const hots_flag=hots&&callback.receiver;if(hots){callback=undefined;if(-1==["server-context","client-context"].indexOf(hots_flag))throw new kh_js.Error({msg:["param-invalid","receiver"]});if(kh_js.isString(text))throw new kh_js.Error({msg:["param-invalid","invalid-type","object expected"]})}text=kh_js.isString(text)?text:JSON.stringify(!hots?text:{...text,[enumSocket.attr_private_]:hots_flag});if(this.isOpen()){!hots?this.send(text,callback):this.emit("message",text)}else callback?.(new kh_io.HTTPError(kh_js.Error)({status:406,msg:"socket not open"}))}send_request(msg,timeout=3e4,hots){if(!kh_js.isValid(msg[enumSocket.attr_request_id_]))msg[enumSocket.attr_request_id_]=kh_io.WebSocketUtil.nextRequestId();const promise=new kh_js.Deferred(timeout,true,new kh_js.Error({msg:"timeout",data:msg}));this.result_promises_.set(msg[enumSocket.attr_request_id_],promise);this.send_text(msg,hots);return promise.finally((()=>this.result_promises_.delete(msg[enumSocket.attr_request_id_])))}msgh(message_data,is_binary){try{if(is_binary||Buffer.isBuffer(message_data))message_data=message_data.toString();if("ping"==message_data||"pong"==message_data){return}kh_js.yieldToMain().then((()=>{let msgs=kh_js.isString(message_data)&&JSON.parse(message_data)||message_data;if(!Array.isArray(msgs))msgs=[msgs];msgs.forEach((msg=>{if(kh_js.isString(msg)){if("ping"===msg||"pong"===msg)return}else this.resolve_request(msg)}))})).catch((error=>{kh_log.warn?.(T9`extmh01 | unexpected error or ws message with unknown data format / ${message_data} / error => ${error} / sid => ${this.sid}`)}))}catch(error){kh_log.warn?.(T9`extmh02 | unexpected error or ws message with unknown data format / ${message_data} / error => ${error} / sid => ${this.sid}`)}}close(){kh_log.error?.(`Unwanted close - if app still running - please check`);super.close(...arguments)}terminate(){kh_log.error?.(`Unwanted terminate - if app still running - please check`);super.terminate(...arguments)}}}if(noServer){let sub_route=options.sub_route;if(!sub_route.startsWith("/"))sub_route="/"+sub_route;web_server["#wss_active"]??=new Map;if("function"!==typeof web_server["#on_upgrade"]){web_server["#on_upgrade"]=function upgrade(request,socket,head){let pathname=request.url;const pos_second_slash=pathname.indexOf("/",1);if(-1!=pos_second_slash)pathname=pathname.substring(0,pos_second_slash);const wss2handle=web_server["#wss_active"].get(pathname);if(kh_js.isValid(wss2handle))wss2handle.handleUpgrade(request,socket,head,wss2handle.emit.bind(wss2handle,"connection"));else{kh_log.warn?.("no WebSocketServer found for socket... socket will destroy");socket.destroy()}};web_server.on("upgrade",web_server["#on_upgrade"])}web_server["#wss_active"].set(sub_route,wss)}return wss}kh_global.LoadedScripts.get(mf).resolve(ms);