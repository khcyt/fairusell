const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_js";const mf="kh_earlybird_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`}else{jsm_prefix=kh_global.zk?.ajaxResourceURI(`/contrib/jsm`)??`/contrib/jsm`}export function problem_keys(){if(!isValid(ms["_problem_keys"]))ms["_problem_keys"]=false!=getFirefoxVersion()?["onmozfullscreenchange","onmozfullscreenerror"]:isChromium()?["webkitStorageInfo"]:[];return ms["_problem_keys"]}export function lw_print(){[].splice.call(arguments,0,0,`${name}: `);console?.log.apply(kh_global,arguments)}export function dbgBreak(){const args=[...arguments];let out_list=["dbgBreak"];args.forEach((a=>{out_list.push(a);out_list.push(typeof a)}));lw_print(...out_list);return out_list}const isNode=function(){const is_node="undefined"===typeof window&&"undefined"!==typeof process&&"node"===process.release.name;return()=>is_node}();const isHeroku=(()=>{const argv=isNode()&&process.argv;const is_heroku=Array.isArray(argv)&&-1!=argv.findIndex((arg=>-1!=arg.indexOf("heroku")));return()=>is_heroku})();export const isPaaS=(()=>{const is_PaaS=isNode()&&"true"==process.env.PAAS||isHeroku();return()=>is_PaaS})();export const isBrowser=(()=>{const is_browser=!!kh_global.navigator;return()=>is_browser})();const Environment=function(){if(isNode()){process.env.NODE_ENV||="production";return()=>process.env.NODE_ENV}else return()=>kh_global.document?.documentElement?.getAttribute("env")}();const isProduction=(()=>"developement"!=Environment())();const isDevelopement=(()=>"developement"==Environment())();export function logicalXOR(a,b){return(a||b)&&!(a&&b)}export function logicalEQU(a,b){return a===b}const userAgent=function(){if(0!=(kh_global.navigator?.userAgentData?.brands??[]).length)return kh_global.navigator?.userAgentData;return kh_global?.navigator?.userAgent??kh_global?.vendor??kh_global?.opera}();const isMobile=function(){const is_mobile=userAgent?.mobile??/android|mobile|ip(hone|od|ad)|tablet|blackberry|iemobile|kindle|netfront|silk-accelerated|(hpw|web)os|playbook|fennec|minimo|opera m(obi|ini)|blazer|dolfin|dolphin|skyfire|zune|nokia|ucweb/i.test(userAgent);return function(){return is_mobile}}();const isTouch=function(){const is_touch=kh_global.document&&"ontouchstart"in kh_global.document||"ontouchstart"in kh_global||kh_global.navigator?.maxTouchPoints>0&&256!=kh_global.navigator?.maxTouchPoints||kh_global.navigator?.msMaxTouchPoints>0;return function(){return is_touch}}();const isiOS=function(){const agent=kh_global?.navigator?.userAgent;const is_iOS=/ip(hone|od|ad)/i.test(agent);const is_cuckoo=/ucbrowser|iemobile|chrome/i.test(agent);return function(){return is_iOS&&!is_cuckoo}}();export function getBrowserVersion(which){const brands=userAgent?.brands;if(undefined==brands)return undefined;const brand=brands.find((brand=>-1!=(brand.brand?.indexOf(which)??-1)));return brand?.version??false}const isChrome=function(){let isChrome=getBrowserVersion("Chrome");if(undefined===isChrome){isChrome=kh_global.chrome;const isOpera="undefined"!==typeof kh_global.opr;const isIEedge=-1<(kh_global.navigator?.userAgent?.indexOf("Edge")??-1);const isIOSChrome=kh_global.navigator?.userAgent?.match("CriOS");isChrome=null!==isChrome&&"undefined"!==typeof isChrome&&"Google Inc."===kh_global.navigator?.vendor&&false===isOpera&&false===isIEedge}return()=>isChrome}();const isChromium=function(){let isChromium=getBrowserVersion("Chrom");if(undefined===isChromium){isChromium=kh_global.chrome;const isOpera="undefined"!==typeof kh_global.opr;isChromium=null!==isChromium&&"undefined"!==typeof isChromium&&false===isOpera}return()=>isChromium}();const isEdge=function(){let isEdge=getBrowserVersion("Edge");if(undefined==isEdge){}return()=>isEdge}();const isSafari=function(){let isSafari=getBrowserVersion("Safari");let is_cuckoo=false;if(undefined===isSafari){const agent=kh_global?.navigator?.userAgent;isSafari=/safari|ip(hone|od|ad)/i.test(agent);is_cuckoo=/ucbrowser|iemobile|chrome/i.test(agent)}return function(){return isSafari&&!is_cuckoo?isSafari:false}}();const getFirefoxVersion=function(){let isFirefox=getBrowserVersion("Firefox");if(undefined==isFirefox){isFirefox=kh_global.navigator?.userAgent?.match(/Firefox\/([0-9]+)\./);isFirefox=isFirefox?parseInt(isFirefox[1]):false}return()=>isFirefox}();const isFirefox=function(){const isFF=0<(getFirefoxVersion()|0);return()=>isFF}();export const getBrowserShort=function(){let short=undefined;if(isSafari())short="sf";else if(isChrome())short="gc";else if(isChromium())short="cr";else if(isEdge())short="ed";else if(isFirefox())short="ff";else if("undefined"!==typeof kh_global.opr)short="opr";else if(/ucbrowser/i.test(kh_global.navigator?.userAgent))short="ucb";else short="ukn";return()=>short}();export const currentFunctionName=function(){if(isFirefox()){return function(level=0){const stack=(new Error).stack.split("\n");return stack[level+1]?.split("@")?.[0]??(0<level?currentFunctionName(level-1):"")}}else{return function(level=0){return(new Error).stack.match(/at (\S+)/g)[level+1]?.slice(3)??(0<level?currentFunctionName(level-1):"")}}}();export class Deferred{constructor(timeout=-1,reject_on_timeout=true,value_on_timeout){this.promise_=new Promise(((resolve,reject)=>{this.resolve=function(value){this.finished_=true;return resolve(value)};this.reject=function(reason){this.finished_=true;return reject(reason)}}));this.finished_=false;if(-1!=timeout){if("production"!==Environment){try{throw new Error(timeout)}catch(error){this.promise_["#debug_info_"]=this["#debug_info_"]=error}}this.timerId_=kh_global.setTimeout((()=>{(kh_log??console)?.error?.(T9`timeout during wait for deferred promise resolve/reject -> context(${kh_global.kh.context}), value= ${value_on_timeout}`);reject_on_timeout?this.reject(value_on_timeout??"timeout"):this.resolve(value_on_timeout);this.timerId_=undefined}),timeout);this.promise_=this.promise_.finally((()=>{if(isValid(this.timerId_)){kh_global.clearTimeout(this.timerId_);this.timerId_=-1}}))}}async then(fulfill,reject){return this.promise_.then(fulfill,reject)}async catch(reject){return this.promise_.catch(reject)}async finally(onFinally){return this.promise_.finally(onFinally)}async cancel(){if(this.finished_)return;return this.reject()}}export function PromiseTO(promise,timeout,reject_on_timeout=true,value_on_timeout){let timerId;value_on_timeout??=new Error("timeout in PromiseTO",{cause:promise});const timeoutPromise=new Promise(((resolve,reject)=>{if("production"!==Environment){try{throw new Error(timeout)}catch(error){promise["#debug_info_"]=error}}timerId=kh_global.setTimeout((()=>{(kh_log??console)?.error?.(T9`timeout during wait for promise resolve/reject -> context(${kh_global.kh.context}), value= ${value_on_timeout}`);reject_on_timeout?reject(value_on_timeout??"timeout"):resolve(value_on_timeout);timerId=undefined}),timeout)}));promise=promise.finally((()=>{if(isValid(timerId))kh_global.clearTimeout(timerId)}));return Promise.race([promise,timeoutPromise])}export function getBrowserLang(property){let lang=kh_global.navigator?.language||kh_global.navigator?.userLanguage;if(false!==property?.set)setBrowserLang({query:property?.query,attribute:property?.attribute,lang});return lang}export function setBrowserLang({query,attribute="lang",lang}={}){if(isEmpty(lang))return;if(!isValid(kh_global.$)){let win=document.querySelectorAll(query||"div.kh-window-main");win.forEach((w=>w.setAttribute(attribute,lang)))}else{let $win=$(!isEmpty(query)?query:"div.kh-window-main");if(isEmpty($win)&&kh_global.jq)$win=jq("@window");if(!isEmpty($win)){$win.attr(attribute,lang)}}}kh_global.LoadedScripts??=new class{#watched_;#map_;constructor(){this.#watched_=new Map;this.#map_=new Map}get(script_ident,timeout=2e4){if(isEmpty(script_ident))throw new Error("invalid-argument");if(true!=cs.onScriptLoadHandlerInstalled){const handler=(event,data)=>{data??=event.detail;const src=event.src??data.src;const code=data?.code;const entry=this.#watched_.get(src);isValid(entry)&&this.#map_.get(entry.ident)?.resolve(code??src)};if(isValid(kh_global.$))$(window).on(onScriptLoad,handler);else kh_global.addEventListener?.(onScriptLoad,handler);cs.onScriptLoadHandlerInstalled=true}const src=script_ident.src;const last_pt=src?.lastIndexOf(".")??-1;const suffix=-1!=last_pt&&src.substring(last_pt+1)||"";const is_html=-1!=suffix.indexOf("htm");const auto_resolve=true===script_ident.resolve;timeout=script_ident.timeout??timeout;script_ident=script_ident?.ident??script_ident;if(!this.#map_.has(script_ident)){if(!isEmpty(src)){if(auto_resolve){this.#watched_.set(src,{ident:script_ident})}loadScript(src).catch((error=>{kh_log.error?.(T9`error during loadScript(${src}) => ${error}`);this.#map_.get(script_ident).reject(error)}))}if(!this.#map_.has(script_ident))this.#map_.set(script_ident,new Deferred(timeout,undefined,script_ident))}return this.#map_.get(script_ident)}has(script_ident){if(isEmpty(script_ident))throw new Error("invalid-argument");return this.#map_.has(script_ident?.ident??script_ident)}};const onScriptLoad="onScriptLoad";const loadScript=isNode()||async function(src,async=true){if(isEmpty(src))return Promise.resolve(true);if(!Array.isArray(src))src=[src];if(asWorker){if(as_module)return Promise.all(src.map((_src=>import(_src.replace("/js/","/jsm/"))))).then((async modules=>src));else kh_global.importScripts(...src);return src}const{Util}=await import(`${jsm_prefix}/kh_io${VERSION}.js`);const{vjs}=await import(`${jsm_prefix}/kh_vanilla${VERSION}.js`);const n_promises=src.map(((_src,index)=>PromiseTO(new Promise((function(resolve,reject){if(isEmpty(_src))return resolve(`empty source @(${index})`);const last_pt=_src.lastIndexOf(".");const suffix=-1==last_pt?"js":_src.substring(last_pt+1);const is_html=-1!=suffix.indexOf("htm");const handler=(event,data)=>{kh_global.dispatchEvent(new CustomEvent(onScriptLoad,{detail:{state:event,src:_src,code:data?.code}}));resolve(_src)};if("css"==suffix){const new_css=document.createElement("link");new_css.setAttribute("rel","stylesheet");new_css.setAttribute("type","text/css");new_css.setAttribute("href",_src);new_css.setAttribute("media","all");new_css.addEventListener("load",handler);document.head.appendChild(new_css)}else if(is_html){const data_p=Util.fetchData(undefined,src);const dompurify_p=isValid(kh_global.DOMPurify)?Promise.resolve({default:kh_global.DOMPurify}):loadModule(LP`${"dompurify"}/+esm`,undefined,3e3);Promise.allSettled([data_p,dompurify_p]).then((async([v_content,v_purify])=>{if("fulfilled"==v_purify.status)kh_global.DOMPurify=v_purify.value.default;else kh_global.DOMPurify={};if("fulfilled"!=v_content.status)throw v_content.reason;return kh_global.DOMPurify.sanitize?.(v_content.value,{USE_PROFILES:{html:true},ADD_TAGS:["script","object"],ADD_ATTR:["data","onclick"]})??v_content.value})).then((async content=>{const marker_0='id="';const marker=`${marker_0}trigger-`;const pos=content.indexOf(marker);let defer_resolve=false;if(-1!=pos){const pos2=content.indexOf('"',pos+marker.length);if(-1==pos2)(kh_log??console)?.error?.('token `"` expected in ',_src," during search for kh-load id");else{defer_resolve=true;const id=content.substring(pos+marker_0.length,pos2);vjs.onoff("kh-load",((event,canceler)=>{if(canceler(event)){handler({type:"load",src:_src},{code:content})}}),kh_global,(event=>"kh-load"==event.type&&id==event.detail.id))}}vjs.insertAdjacentHTML(vjs.body,"afterbegin",content);return defer_resolve||handler({type:"load",src:_src},{code:content})})).catch((error=>reject(error)))}else{const type=-1!=_src.indexOf("/jsm/")||_src.endsWith("mjs")||_src.endsWith("/+esm")?"module":"text/javascript";const new_script=document.createElement("script");new_script.setAttribute("src",_src);new_script.setAttribute("type",type);new_script.setAttribute("async",async);new_script.addEventListener("load",handler);document.head.appendChild(new_script)}})),5e3)));return Promise.all(n_promises)};kh_global.async_require??=isNode()||function(src,timeout){if(!Array.isArray(src))return kh_global.LoadedScripts.get({src,ident:src,resolve:true,timeout});else{Promise.allSettled(src.map((_src=>kh_global.LoadedScripts.get({src:_src,ident:_src,resolve:true,timeout}))))}};const install_wS=isNode()||function(){const writeScript=function(src,evth_ol){const func=evth_ol?new Function("ctxt","var func= "+evth_ol+"; func();"):null;const type=-1!=src.indexOf("/jsm/")||src.endsWith("mjs")?"module":"text/javascript";const new_script=document.createElement("script");new_script.setAttribute("src",src);new_script.setAttribute("type",type);if(func)new_script.addEventListener("load",func);new_script.addEventListener("load",(function(event){kh_global.dispatchEvent(new CustomEvent(onScriptLoad,{detail:{state:event,src}}))}));document.head.appendChild(new_script)};if(kh_global.zk)document["wS"]??=writeScript;return function(){}}();const getScriptLoadQueue=isNode()||function(js_script_fragment){if(isEmpty(js_script_fragment))return;let list=kh_global["loaded-"+js_script_fragment];if(!list){list=kh_global["loaded-"+js_script_fragment]=new Array(0);let old_push=list.push;list.push=function(val){if(list.ready){if(val&&"function"===typeof val)val();return}old_push.call(list,val)};const my_event=event=>event.state&&-1!=event.src.indexOf(js_script_fragment);let handler=function(event){if(my_event(event)){list.map((list_entry=>list_entry()));list.splice(0);list["ready"]=true;kh_global.removeEventListener(onScriptLoad,handler)}};kh_global.addEventListener(onScriptLoad,handler)}return list};export async function loadModule(src,collect=true,timeout=1e4){if(isEmpty(src))return Promise.resolve(true);if(!Array.isArray(src))src=[src];const n_promises=src.map((_src=>{if(!isValid(_src))return Promise.resolve(true);if(_src.startsWith("/~KHCyT@EXT/thirdparty/")&&_src.endsWith(".js/+esm"))_src=_src.replace(".js/+esm",".esm.js");return import(_src)}));return PromiseTO(Promise.all(n_promises),timeout,true,src).then((async modules=>!collect?modules:modules.reduce(((module,result)=>({...result,...module})),{}))).catch((error=>{(kh_log??console).error?.(T9`error during load ${src} => ${error}`);return Promise.reject(error)}))}export function isValid(o){if("boolean"==typeof o)return true;if("number"==typeof o)return!isNaN(o);const b1=!isString(o);if(b1&&!o)return false;let f=isValid!==o["isValid"]?o["isValid"]:undefined;if(typeof f==="function")f=o.isValid();if(false===f||true===f)return f;return b1||"undefined"!=o&&"null"!=o&&"NaN"!=o}export function isObject(o){if(!isValid(o))return false;return typeof o==="function"||typeof o==="object"}export function isPlainObject(o){return o?.constructor===Object}export function isString(s){return Object.prototype.toString.call(s)==="[object String]"}export function isEmpty(o){if(!isValid(o))return true;if(isValid(o["isEmpty"])&&isEmpty!==o["isEmpty"])return"function"===typeof o["isEmpty"]?o["isEmpty"]():o["isEmpty"];if(isString(o)||Array.isArray(o)||isjQuery(o))return 0==o.length;if(kh_global["ImageData"]&&o instanceof ImageData)return isEmpty(o.data);if(kh_global!==o&&isValid(o["length"]))return 0===("function"===typeof o["length"]?o["length"]():o["length"]);if(isValid(o["size"]))return 0===("function"===typeof o["size"]?o["size"]():o.size);return 0===Object.entries(o).length&&o.constructor===Object}const isNumber=(n,lazy=false)=>!lazy?Object.prototype.toString.call(n)==="[object Number]":!isNaN(Number.parseFloat(n))&&!isNaN(n-0);export function isPrimitive(v){return isString(v)||isNumber(v)||"boolean"==typeof v||"symbol"==typeof v||"undefined"===typeof v||null===v}export function isBuiltIn(v){return isPrimitive(v)||v instanceof RegExp||v instanceof Date||v.constructor?.name=="BigInt"}const isjQuery=obj=>isValid(obj)&&isValid(kh_global["jQuery"])&&(obj instanceof jQuery||obj.constructor?.prototype.jquery);export const isZK=obj=>isValid(obj)&&isValid(kh_global["zk"])&&zk.Object.isInstance(obj);kh_global.nodeFN2ZK??=function(fn){return kh_global.zk?.ajaxResourceURI(fn)||fn};export function isEvent(obj,any_event=true){return"Event"in kh_global&&obj instanceof Event||any_event&&("$"in kh_global&&obj instanceof $.Event||"zk"in kh_global&&obj instanceof zk.Event)}export function isDOMNode(o){return typeof Node==="object"?o instanceof Node:o&&typeof o==="object"&&typeof o.nodeType==="number"&&isString(o.nodeName)}export function isDOMElement(o){return typeof HTMLElement==="object"?o instanceof HTMLElement:o&&typeof o==="object"&&o.nodeType===1&&isString(o.nodeName)}export function isIPAddress(s){return/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/g.test(s)}export function prettyPrint2(o,keys){if(!isValid(o))return"undefined";if(!(o instanceof Object))return o.toString();if(isEmpty(keys))return JSON.stringify(o);else{let no={};keys.map((function(key){if(!isEmpty(o[key]))no[key]=o[key];return key}));return JSON.stringify(no,(function(k,v){return prettyPrint2(v)}))}}export function prettyPrint(o,...keys){if(undefined===o)return"undefined";if(null===o)return"null";let clip_level=2;let max_array_string=360;if(0!=keys.length&&isString(keys[0])&&"$"==keys[0][0]){[clip_level,...keys]=[...keys];clip_level=Number.parseInt(clip_level.substring(1))>>>0}if(0!=keys.length&&isString(keys[0])&&"$"==keys[0][0]){[max_array_string,...keys]=[...keys];max_array_string=Number.parseInt(max_array_string.substring(1))>>>0}const max_obj_string=max_array_string/3;o=isEmpty(keys)||!isObject(o)?o:keys.reduce(((new_o,cur_k)=>({...new_o,cur_k:o[cur_k]})),{});if(isEmpty(o))return"";let weakmap=new WeakMap;let stringify=(level,path,k,v)=>{if(Array.isArray(v)){const ret=isEmpty(v)||isBuiltIn(v[0])?v.toString():v.map(((vx,vi)=>out(level,`${path}[${vi}]`,vx))).join(",");return"[ "+(ret.length<max_array_string/(level+1)?ret:ret.substring(0,max_array_string/(level+1))+"...")+" ]"}let ret=out(level,path,v);if(!isValid(ret))return ret;ret=ret.toString();return ret.length<max_obj_string||clip_level>=level?ret:`${ret.substring(0,max_obj_string)}...`};const ignore=["client","socket","connection"];let out=(level,path,obj)=>{if(null===obj)return null;if(!isValid(obj))return undefined;if("function"==typeof obj)return"ƒ";if(isBuiltIn(obj))return obj;if("DOMException"in kh_global&&obj instanceof DOMException)return JSON.stringify({message:obj.message,name:obj.name});if("ErrorEvent"in kh_global&&obj instanceof ErrorEvent)return JSON.stringify({message:obj.message,error:obj.error,file:obj.filename});if("Event"in kh_global&&obj instanceof Event)return JSON.stringify({type:obj.type,name:"Event"});if("Window"in kh_global&&obj instanceof Window)return"Window";if(isDOMElement(obj))return"HTMLElement";if("SVGElement"in kh_global&&obj instanceof SVGElement)return"SVGElement";if(isDOMNode(obj))return"DOMNode";if(isjQuery(obj))return"jQuery.Obj";if(kh_global["ImageData"]&&obj instanceof ImageData)return"ImageData["+(obj.data&&obj.data.length||"0")+"]";if("OverconstrainedError"in kh_global&&obj instanceof OverconstrainedError)return obj.toString();{let ret=undefined;if("function"===typeof obj["toJSON"])ret=obj.toJSON();else{ret={};Object.getOwnPropertyNames(obj).forEach((key=>{try{let ref_path=weakmap.get(obj[key]);if(undefined!=ref_path)ret[key]=`=>${ref_path}`;else{if(isObject(obj[key]))weakmap.set(obj[key],path+"."+key);if(isValid(obj[key])&&"function"===typeof obj[key]["toJSON"]&&undefined==obj[key].toJSON()){delete obj[key].toJSON}ret[key]=JSON.stringify(obj[key],stringify.bind(null,level+1,path+"."+key))}}catch(error){ret[key]="$forbidden"}}))}return JSON.stringify(ret).replace(/\\/g,"").replace(/""/g,'"').replace(/"\{/g,"{").replace(/\}"/g,"}")}};return stringify(0,"$",o,o)}export function prettyLogContextTagged(strings,...keys){if(isEmpty(strings)&&isEmpty(keys))return"";const pre_post_fixes="(?:kh[_-]|common[_-]|[_-]module|[_-]esm)*";const rex=new RegExp(`^${pre_post_fixes}(.*?)${pre_post_fixes}$`);const f=()=>keys.map(((key,i)=>{let s=key.trim(rex);return strings[i]+(!isEmpty(s)?s:key)})).join("")+strings[strings.length-1];return`[${f()}${asWorker?`-${kh_global.id||"ww"}`:""}]`}kh_global.MF??=prettyLogContextTagged;export function resolveLoadPathTagged(strings,...keys){const local_host=true!==checkInternetNP();keys=keys.map(((key,i)=>{let rev;const suffix=!key.endsWith(".css")&&!key.endsWith(".html")?".js":"";[key,rev]=key.split("@");return strings[i]+(local_host?`/~KHCyT@EXT/thirdparty/${key}${!isEmpty(rev)?`@${rev}`:""}${suffix}`:`https://cdn.jsdelivr.net/npm/${key}${!isEmpty(rev)?`@${rev}`:""}`)}));return keys.join("")+strings.at(-1)}kh_global.LP=kh_global.LP??resolveLoadPathTagged;kh_global.VERSION??=function(){const app_vers=kh_global.document?.documentElement?.getAttribute("app_vers");if(0==(app_vers?.length??0))return"";let pos_minus=app_vers.lastIndexOf("-");let zk_variant=false;if(-1==pos_minus){pos_minus=app_vers.lastIndexOf("_");if(-1!=pos_minus)zk_variant=true}let version_str=-1!=pos_minus?`.${app_vers.substring(pos_minus+1)}`:"";if(zk_variant)version_str=version_str.replaceAll("´",".");return version_str}();export function getTypeName(o,reject_invalid=false){const is_invalid=!isValid(o);return!is_invalid&&(o.__proto__||Object.getPrototypeOf({})).constructor.name||(reject_invalid&&is_invalid?o:Object.prototype.toString.call(o))}export function string2bool(value,{yes="ja",no="nein"}={},lazy=false){if("boolean"==typeof value)return value;if(!isValid(value))return undefined;if(!isString(value))value=value.toString();switch(value.toLowerCase().trim()){case"true":case"yes":case yes:case"1":return true;case"false":case"no":case no:case"0":return false;default:return lazy?value:undefined}}const checkInternet=function(){if("undefined"!==typeof process)return async function(){const{promises}={...await import("dns")};return promises.lookup("google.com").then((async()=>true)).catch((async()=>false))};else return async function(){return!(true===string2bool(kh_global.document?.documentElement?.getAttribute("local_hosting")))}}();const checkInternetNP=function(){let hasInternet=undefined;checkInternet().then((result=>hasInternet=result));return()=>hasInternet}();const name=MF`${mf}`;import(`${jsm_prefix}/kh_prototypes${VERSION}.js`);Object.assign(cs,{isValid,isEmpty,currentFunctionName});export{isMobile,isTouch,isiOS,isChrome,isChromium,isEdge,isSafari,isFirefox,getFirefoxVersion};export{isNode,isHeroku,Environment,isProduction,isDevelopement,onScriptLoad,loadScript,install_wS,getScriptLoadQueue};export{isNumber,isjQuery,checkInternet,checkInternetNP};kh_global.LoadedScripts.get(mf).resolve(ms);