const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_io";const mf="kh_io_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;let common_prefix;let npm_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;common_prefix=`file:///${kh_global.kh.pathes.get("common")}`;npm_prefix=`file:///${kh_global.kh.pathes.get("node-module")}`}else{jsm_prefix=nodeFN2ZK(`/contrib/jsm`)}const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`),...await import(`${jsm_prefix}/kh_functions${VERSION}.js`),...await import(`${jsm_prefix}/kh_classes${VERSION}.js`)};const name=MF`${mf}`;const print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));const{STATUS_CODES}="undefined"!==typeof process?{...await import("http")}:{};if("undefined"!==typeof process){kh_global.fetch=(await import(`${npm_prefix}/node-fetch/src/index.js`)).default}else{}const IOStringMap=function(){const ism=new kh_js.StringMap({"connection-timeout":{de:"Zeitüberschreitung in der Verbindung",en:"connection timeout"},"connection-failure":{de:"Verbindungfehler",en:"connection failure"},"connection-request-failed":{de:"Verbindung konnte nicht hergestellt werden",en:"connection request failed"},"not.connected":{de:"Nicht verbunden",en:"not connected"},connected:{de:"Verbunden über",en:"connected to"}});kh_js.StringMap.getGlobalMap().addEntries(ism);return ism}();export function HTTPError(err_class){return class extends err_class{constructor(){super(...arguments)}toJSON(){this["HTTP-Status"]??=this.status;if(kh_js.isNode())this["HTTP-Message"]??=STATUS_CODES?.[this.status];return super.toJSON()}}}export class Util{static use_fetch=!kh_js.isNode()||"fetch"in kh_global;static async fetchData(http_method="GET",url="",data={},_fetch_options={}){const fetch_options=kh_js.cloneObject(_fetch_options,{transfer:[_fetch_options.signal].filter((o=>kh_js.isValid(o)))});const get_native=true==fetch_options.get_native;const get_json=true==fetch_options.get_json;const send_json=false!=fetch_options.send_json;const on_error_set="on_error"in fetch_options;const on_error=fetch_options.on_error;delete fetch_options.get_json;delete fetch_options.send_json;delete fetch_options.get_native;delete fetch_options.on_error;let headers="GET"==http_method||null===data?{}:{"Content-Type":send_json?"application/json":"application/octet-stream"};if(Util.use_fetch){return kh_global.fetch(url,{method:http_method,mode:"cors",cache:"default",credentials:"same-origin",redirect:"follow",referrer:"",referrerPolicy:"strict-origin-when-cross-origin",body:"GET"==http_method?undefined:!send_json?data:JSON.stringify(data),...fetch_options,headers:{...headers,...fetch_options.headers}}).then((async response=>{if(false==response.ok&&"ignore"!=on_error)throw new(HTTPError(kh_js.Error))({status:response.status,statusText:response.statusText,msg:[response.statusText],response});return get_native?Promise.resolve(response):get_json?response.json():response.text()})).catch((error=>on_error_set?Promise.resolve("error"==on_error?error:on_error):Promise.reject(error)))}else{const get_and_set_json=get_json;let headers="GET"==http_method||null===data?{}:{"Content-Type":send_json?"application/json":"application/octet-stream"};headers={...headers,...fetch_options.headers};const send_json=-1!=headers["content-type"].indexOf("json");return request({method:http_method,uri:url,body:"GET"==http_method?undefined:data,...fetch_options,headers,resolveWithFullResponse:get_native,json:get_and_set_json&&!get_native}).catch((error=>on_error_set?Promise.resolve(on_error):Promise.reject(error)))}}static async fetchData2(http_method="GET",url,data={},fetch_options={}){const can_fail=fetch_options.can_fail;delete fetch_options.can_fail;return Util.fetchData(http_method,url,data,{get_json:true,on_error:"ignore",...fetch_options}).then((json=>{if(kh_js.isValid(json.error))throw json;if(400<=json.status)throw json;return Promise.resolve(json)})).catch((error=>{kh_log.trace?.(T9`Error is signaled, decision is made based on can_fail ${can_fail}, ${error}`);return can_fail?Promise.resolve(error):Promise.reject(error)}))}static async ownIP(){return Util.fetchData(undefined,"/client-ip",undefined,{get_json:true}).then((json=>json.error?Promise.reject(json):Promise.resolve(json))).catch((error=>Util.fetchData(undefined,"https://jsonip.com/?callback",undefined,{get_json:true}))).then((json=>Promise.resolve(json.ip))).catch((error=>Promise.reject(new kh_js.Error({error,msg:["data-not-determined","own IP"]}))))}static getQueryString(o){if(kh_js.isEmpty(o))return"";return Object.entries(o).map((entry=>{let value=entry[1];if(kh_js.isPlainObject(value)){value=JSON.stringify(value)}return`${encodeURIComponent(entry[0])}=${encodeURIComponent(value)}`})).join("&")}static ip4_rex=/^(([01]?\d\d?|2[0-4]\d|25[0-5])\.){3}([01]?\d\d?|2[0-4]\d|25[0-5])$/;static ip6_rex=/^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;static isIPv4(input){return this.ip4_rex.test(input)}static isIPv6(input){return this.ip6_rex.test(input)}static isIP(input){if(Util.isIPv4(input))return 4;if(Util.isIPv6(input))return 6;return 0}}if(kh_js.isNode()){import("node:net").then((({isIPv4,isIPv6,isIP})=>{Util.isIPv4=isIPv4;Util.isIPv6=isIPv6;Util.isIP=isIP}))}export{IOStringMap};kh_global.LoadedScripts.get(mf).resolve(ms);