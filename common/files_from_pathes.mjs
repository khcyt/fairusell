const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_files_from_pathes_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`}else{jsm_prefix=`/contrib/jsm`;console.assert(0,`${mf} is only for node.js`)}import*as fs from"node:fs";import*as fsPromises from"node:fs/promises";let kh_js={};Object.assign(kh_js,await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_classes${VERSION}.js`));Object.assign(kh_js,await import(`${jsm_prefix}/kh_functions${VERSION}.js`));let print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>MF`${mf}`));export function getFileFromStaticPathes(filename,pathes=cs.server_options?.app_settings?.static_files_pathes){const sfp=pathes?.find((sfp=>fs.existsSync(sfp+filename)));return sfp&&sfp+filename}export async function getFileFromStaticPathesAsync(filename,pathes=cs.server_options?.app_settings?.static_files_pathes){const fn_promises=pathes?.map((sfp=>sfp+filename)).map((fn=>fsPromises.stat(fn).then((async stats=>stats.isFile()?Promise.resolve(fn):Promise.reject("ENOENT")))));return Promise.any(fn_promises).catch((error=>Promise.reject(new kh_js.Error({msg:["param-not-determined","filename",filename],code:error}))))}export function getFilesFromStaticPathes(filename,pathes=cs.server_options?.app_settings?.static_files_pathes){return pathes?.map((sfp=>sfp+filename)).filter(fs.existsSync)}export async function getFilesFromStaticPathesAsync(filename,pathes=cs.server_options?.app_settings?.static_files_pathes){const match_wildcard=-1!=filename.indexOf("*");if(!match_wildcard){const fn_promises=pathes?.map((sfp=>sfp+filename)).map((fn=>fsPromises.stat(fn).then((async stats=>stats.isFile()?Promise.resolve(fn):Promise.reject("ENOENT")))));return Promise.allSettled(fn_promises).then((async results=>results.filter((result=>"fulfilled"==result.status)).map((result=>result.value)))).then((async fns=>!kh_js.isEmpty(fns)?Promise.resolve(fns):Promise.reject(new kh_js.Error("param-not-determined","filename",filename))))}else{const pos_sl=filename.lastIndexOf("/");let post_fix_path;if(-1!=pos_sl){post_fix_path=filename.substring(0,pos_sl+1);filename=filename.substring(pos_sl+1)}filename=filename.replace(/\./g,"\\.");filename=filename.replace(/\?/g,".?");filename=filename.replace(/\*/g,".*");filename=new RegExp(filename);return Promise.allSettled(pathes?.map((sfp=>!kh_js.isEmpty(sfp)?sfp+post_fix_path:sfp)).map((path=>fsPromises.readdir(path,"utf-8").then((async dirlist=>({dirlist,path})))))).then((async results=>results.filter((result=>"fulfilled"==result.status)).map((result=>result.value)))).then((async dirlist=>dirlist.map((entry=>({path:entry.path,dirlist:entry.dirlist.filter((fn=>filename.test(fn)))}))).filter((entry=>!kh_js.isEmpty(entry.dirlist))).map((entry=>entry.dirlist.map((fn=>entry.path+fn)))).flat())).then((async fns=>!kh_js.isEmpty(fns)?Promise.resolve(fns):Promise.reject(new kh_js.Error("param-not-determined","filename",filename))))}}kh_global.LoadedScripts.get(mf).resolve(ms);