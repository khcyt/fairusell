const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_import_json_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`}else{jsm_prefix=`/contrib/jsm`;console.assert(0,`${mf} is only for node.js`)}import*as fs from"fs";import*as path from"path";const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`)};let print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>MF`${mf}`));export function import_json(json_fn,async=true,accept_error=false){if(async){const fsPromises=fs.promises;return fsPromises.readFile(json_fn,"utf-8").catch((error=>"ENOENT"==error.code?fsPromises.readFile(path.resolve(json_fn),"utf-8"):Promise.reject(error))).catch((error=>accept_error?Promise.resolve({}):Promise.reject(error))).then((async content=>{if(kh_js.isString(content)){try{content=JSON.parse(content)}catch(error){kh_log.warn?.(T9`possible incorrect file format during parse ${json_fn}, error => ${error}`);if(!accept_error)throw error;content={}}}return content}))}else{if(!fs.existsSync(json_fn))json_fn=path.resolve(json_fn);if(!fs.existsSync(json_fn)){if(!accept_error)throw new kh_js.Error({code:"ENOENT",msg:["file-not-exists",json_fn]});else return{}}let content=fs.readFileSync(json_fn,"utf-8");if(kh_js.isString(content)){try{content=JSON.parse(content)}catch(error){kh_log.warn?.(T9`possible incorrect file format during parse ${json_fn}, error => ${error}`);if(!accept_error)throw error;content={}}}return content}}kh_global.LoadedScripts?.get(mf).resolve(ms);