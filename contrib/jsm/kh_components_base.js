const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_components";const mf="kh_components_base_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;let common_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;common_prefix=`file:///${kh_global.kh.pathes.get("common")}`}else{jsm_prefix=nodeFN2ZK(`/contrib/jsm`)}const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`),...await import(`${jsm_prefix}/kh_functions${VERSION}.js`),...await import(`${jsm_prefix}/kh_classes${VERSION}.js`)};const{vjs}=await import(`${jsm_prefix}/kh_vanilla${VERSION}.js`);const name=MF`${mf}`;const print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));export class Component{#component_base_;get Șdom(){return undefined}get options(){return this.base()?.options}base(component_base){if(0==arguments.length)return this.#component_base_;if(!(component_base instanceof Component))throw new Error({msg:["invalid-argument","component-base",component_base]});this.#component_base_=component_base.base()??component_base}glue(element=this.Șdom,component){const flag=this.constructor.flag;if(!kh_js.isValid(flag))throw new Error({msg:["param-not-determined","flag","resolved-for",this]});if(element instanceof Component){component=element;element=this.Șdom}if(!kh_js.isValid(element)||!kh_js.isDOMElement(element))throw new Error({msg:["invalid-argument","element",element]});if(!kh_js.isValid(component))return vjs.data(element,flag);else return vjs.data(element,flag,component)}static glue(element,component_type){const flag=component_type?.flag;if(!kh_js.isValid(flag))throw new Error({msg:["param-not-determined","flag","resolved-for",component_type]});return vjs.data(element,flag)}role(new_role,set_attr=true){if(0==arguments.length)return vjs.data(this.Șdom,"role");vjs.data(this.Șdom,"role",new_role);if(set_attr)this.Șdom.setAttribute("role",new_role)}closestProperty(prop,barrier){if(!kh_js.isValid(prop))return prop;const value=vjs.data(this.Șdom,prop);if(kh_js.isValid(value))return value;const parent=this.parent?.();if(!kh_js.isValid(parent)||this===barrier)return undefined;return parent.closestProperty(prop,barrier)}}const class_orient_=new Map([["vertical","kh-vlayout"],["horizontal","kh-hlayout"],["flex","kh-flayout"],["hswitch","kh-hlayout-switch"],["hswitch-r","kh-hlayout-switch-r"],["vswitch","kh-vlayout-switch"]]);export function class_from_orient(orient="flex"){if(!class_orient_.has(orient)){const unzip=kh_global.kh.storage.kh_js.unzipString;kh_log?.warn?.(T9`${unzip("invalid-argument")} ${orient} | ${unzip("during-execution")}`+T9`${unzip("of")} ${kh_js.currentFunctionName()}`)}return class_orient_.get(orient)??"kh-flayout"}export function orient_from_class(class_name="kh-flayout"){let rslt=[...class_orient_].filter((([k,v])=>class_name==v));return rslt?.[0][0]??"flex"}export function class_pretty(classes=[],as_string=true){if(Array.isArray(classes))classes=classes.join(" ");if(!kh_js.isString(classes))return undefined;const ret=classes.split(" ").map((c=>c.trim("'\"`"))).filter((c=>!kh_js.isEmpty(c)));return as_string?ret.join(" "):ret}"function"==typeof kh_global.async_require&&kh_global.async_require(`${jsm_prefix}/../css/kh-components${VERSION}.css`);kh_global.LoadedScripts.get(mf).resolve(ms);