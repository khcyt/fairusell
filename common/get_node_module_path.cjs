const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_server";const mf="common_get_node_module_path_module";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);const gnmp=function e(n="json8-merge-patch"){const o=require("path");let s=require.resolve(n);let t=s.lastIndexOf(o.sep);s=s.substring(0,t);t=s.lastIndexOf(o.sep);s=s.substring(0,t);return s.replaceAll("\\","/")};gnmp.all=function(e,n=true){const o=require("path");const s=require("fs");let t=new Set;e=e.replaceAll("\\","/");while(true){if(!s.existsSync(e))break;if(!e.endsWith("/node_modules"))t.add(`${e}${e.endsWith("/")?"":"/"}node_modules`);else t.add(e);const n=o.resolve(`${e}${e.endsWith("/")?"":"/"}..`).replaceAll("\\","/");if(n===e)break;e=n}if(n){e=process.cwd().replaceAll("\\","/");while(true){if(!s.existsSync(e))break;if(!e.endsWith("/node_modules"))t.add(`${e}${e.endsWith("/")?"":"/"}node_modules`);else t.add(e);const n=o.resolve(`${e}${e.endsWith("/")?"":"/"}..`).replaceAll("\\","/");if(n===e)break;e=n}}return[...t.values()]};kh_global.LoadedScripts.get(mf).resolve(ms);if("object"===typeof module&&"object"===typeof module.exports)module.exports=gnmp;else if("function"===typeof define&&define.amd)define(["exports"],gnmp);