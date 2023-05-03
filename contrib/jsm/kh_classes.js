const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_js";const mf="kh_classes_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;let common_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;common_prefix=`file:///${kh_global.kh.pathes.get("common")}`}else{jsm_prefix=nodeFN2ZK(`/contrib/jsm`)}const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`),...await import(`${jsm_prefix}/kh_functions${VERSION}.js`)};const name=MF`${mf}`;const print_level=undefined;const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));export class Class{static toJSON(obj,field_name_arr){field_name_arr=[...field_name_arr??[]];let ret={};const fna_was_empty=kh_js.isEmpty(field_name_arr);const decisionMaker=(cur_key,value,fna_entry)=>{if(!kh_js.isValid(fna_entry)){const index=field_name_arr.findIndex((fna_entry=>fna_entry===cur_key||fna_entry.key===cur_key));if(-1!=index)fna_entry=field_name_arr.splice(index,1)[0]}let should_process=false;if(kh_js.isValid(fna_entry)){if(kh_js.isString(fna_entry))should_process=true;else{if("function"==typeof fna_entry.value)should_process=!fna_entry.value(value);else should_process=undefined==fna_entry.value||fna_entry.value!==value;if(should_process&&"function"===typeof fna_entry["converter"])value=fna_entry["converter"](value)}}return should_process?value:undefined};kh_js.for_in(obj,((key,value)=>{let cur_key=key.endsWith("_")?key.substring(0,key.length-1):key;if(!kh_js.isEmpty(field_name_arr)){value=decisionMaker(cur_key,value)}else if(!fna_was_empty)value=undefined;if(value!==undefined&&"function"!==typeof value)ret[cur_key]=value}));field_name_arr.forEach((fna_entry=>{const prop_name=fna_entry.key??fna_entry;const value=decisionMaker(prop_name,obj[prop_name],fna_entry);if(value!==undefined&&"function"!==typeof value)ret[prop_name]=value}));return ret}static toJSON2(obj,excl_field_name_arr){let ret={};kh_js.for_in(obj,((key,value)=>{let cur_key=key.endsWith("_")?key.substring(0,key.length-1):key;let should_process=kh_js.isEmpty(excl_field_name_arr);if(!should_process){const find=fnae=>{if(kh_js.isString(fnae))return fnae==cur_key;else if(fnae.key==cur_key){if("function"===typeof fnae.value)return fnae.value(value);else{if(undefined!=fnae.value&&fnae.value===value)return true}if("function"===typeof fnae["converter"]){value=fnae["converter"](value);if(undefined==value)return true}}return false};let fna_entry=excl_field_name_arr.find(find);should_process=!kh_js.isValid(fna_entry)}if(should_process&&value!==undefined&&"function"!==typeof value)ret[cur_key]=value}));return ret}static withType(obj){const replacer=(key,value)=>{if(!kh_js.isPrimitive(value)&&!kh_js.isPlainObject(value)&&!Array.isArray(value))value.__type=kh_js.geTypeName(value);let ret=JSON.stringify(value,replacer);return ret};return JSON.stringify(obj,replacer)}static mod(classz,property,value=property){delete classz[property];return classz[property]=value}static resolveJSONRefs(root,use_keys=true){const m=new WeakMap;function inner(node){if(!kh_js.isPlainObject(node)&&!Array.isArray(node))return;const keys=use_keys?Object.keys(node):Object.getOwnPropertyNames(node);const $keys=keys.filter((key=>key.startsWith("$")));if(!kh_js.isEmpty($keys)){for(let $key of $keys){let path=node[$key];if(!path.startsWith("#/"))continue;path=path.substring(2).split("/");let $value=root;let i=0;for(;i<path.length;++i){$value=$value[path[i]];if(!kh_js.isValid($value))break}if(!kh_js.isValid($value)&&i!=path.length-1)continue;if("$ref"==$key){const node_pre={...node};Object.assign(node,$value??{},node_pre);delete node.$ref}else{node[$key.substring(1)]=$value;const idx_key=keys.indexOf($key.substring(1));if(-1!=idx_key)keys.splice(idx_key,1);delete node[$key]}}}for(let key of keys){if(!key.startsWith("$"))inner(node[key])}}inner(root)}}export class Error extends kh_global.Error{constructor(){let argz=[...arguments];if(1==argz.length&&(argz[0]instanceof kh_global.Error||argz[0].error instanceof kh_global.Error)){super(argz[0].error||argz[0])}else{super(argz.map((s=>{let unzipped=kh_js.isString(s)?Error.#unzip(s):kh_js.isObject(s)&&s["msg"]?Error.#unzip(s.msg,true):Error.#anyToString(s);return unzipped??s})).join(" "))}if(1==argz.length){if(kh_js.isString(argz[0])){try{argz[0]=JSON.parse(argz[0])}catch(e){}}if(kh_js.isObject(argz[0]))kh_js.for_in(argz[0],((k,v)=>this[k]=v))}}static#anyToString(o){try{return o?.toJSON?.()??JSON.stringify(o)}catch(error){o?.toString()}}static#unzip(s,unzip_array=false){return kh_js.isString(s)?cs.unzipString(s)??s:Array.isArray(s)&&unzip_array?s.map((_s=>Error.#unzip(_s))).join(" | "):Error.#anyToString(s)}toJSON(){return Object.assign(Class.toJSON(this,Object.keys(this)),{message:this.message,stack:this.stack})}static create(type,...argz){argz=0==argz.length?[]:argz;const filter_stay=arg=>Array.isArray(arg)||kh_js.isString(arg);let argz_obj=argz.filter((arg=>!filter_stay(arg)));argz=argz.filter(filter_stay);argz_obj=argz_obj.reduce(((sum,cur)=>({...sum,...cur})),{});argz_obj.msg=argz;return new class extends(type||Error){constructor(){super(...arguments)}}(argz_obj)}}Error.prototype.toJSON||=function(){return this.message};cs.unzipString||=s=>cs.unzipProp(s,true);cs.unzipProp||=function unzipProp(label_key,must_key,element,do_not_trim=false){if("function"===typeof label_key)label_key=label_key();if(!label_key)return label_key;if(kh_js.isString(label_key)&&!do_not_trim)label_key=label_key.trim();must_key=kh_js.isValid(must_key)?must_key:true;if(must_key&&0==label_key.search(/@\(/)){let respect_quotes=0==label_key.search(/@\('/)||0==label_key.search(/@\("/)?1:0;label_key=label_key.substring(2+respect_quotes,label_key.length-1-respect_quotes)}if(Array.isArray(label_key)){return label_key.map((s=>{if(!do_not_trim&&kh_js.isString(s))s=s.trim();return kh_js.isEmpty(s)?s:unzipProp(s,must_key,element)}))}let s=StringMap.getGlobalMap()[label_key];if(kh_js.isEmpty(s)){if(must_key)return s;else s=label_key}if(Array.isArray(s)){s=s.map(((cV,idx)=>unzipProp(cV,false,element)))}else{if(kh_js.isObject(s)&&!kh_js.isString(s))return s;while(true){const pos=s.indexOf("@(");if(-1==pos)break;let pos2=s.indexOf(")",pos+1);if(-1==pos2)pos2=s.length-1;const s2=unzipProp(s.substring(pos,pos2+1),true,element,do_not_trim);s=`${s.substring(0,pos)}${s2}${s.substring(pos2+1)}`}}return s};export class EnumValue{constructor(name,val){this.name_=name;this.value_=val}toString(){return this.name_}toJSON(){return this.name_}get key(){return this.name_}get name(){return this.name_}get value(){return this.value_}static valueOf(obj,ev_or_string,Enumeration){ev_or_string=EnumValue.fromObj(ev_or_string);if(!obj||!ev_or_string||!(ev_or_string instanceof EnumValue||kh_js.isString(ev_or_string)))return undefined;let val=obj[ev_or_string];if(val instanceof EnumValue||!val)return val;return EnumValue.map(val,Enumeration);val=kh_js.find_in(Enumeration,((k,v)=>v.name_===val||v.value_===val));return val&&kh_js.isString(val)?Enumeration[val]:undefined}static fromObj(ev_or_string){if(kh_js.isEmpty(ev_or_string))return ev_or_string;if(ev_or_string instanceof EnumValue)return ev_or_string;if(kh_js.isValid(ev_or_string.name_)&&kh_js.isValid(ev_or_string.val_))return new EnumValue(ev_or_string.name_,ev_or_string.val_);return ev_or_string}static map(ev_or_string_or_num,Enumeration){if(ev_or_string_or_num instanceof EnumValue)return ev_or_string_or_num;if(!kh_js.isValid(Enumeration))return undefined;const ev_key=kh_js.find_in(Enumeration,((k,v)=>v.name===ev_or_string_or_num||v.value===ev_or_string_or_num));return kh_js.isValid(ev_key)?Enumeration[ev_key]:undefined}static map2Array(ev_values,Enumeration){if(ev_values instanceof EnumValue){return[ev_values]}else{if(kh_js.isString(ev_values))ev_values=ev_values.split(",");if(Array.isArray(ev_values)){ev_values=ev_values.map(kh_js.bind2nd(EnumValue.map,Enumeration)).filter(kh_js.isValid)}else if(kh_js.isNumber(ev_values,true)){let ev_value=ev_values|0;ev_values=[];let bit=1;while(ev_value){const ev=EnumValue.map(bit,Enumeration);if(kh_js.isValid(ev)){ev_values.push(ev);ev_value&=~bit}bit<<=1}}return ev_values}}}export class Local{#local_;constructor(ls=Intl.DateTimeFormat().resolvedOptions()){if(ls instanceof Local)ls=ls.#local_;ls||=Intl.DateTimeFormat().resolvedOptions();if(kh_js.isString(ls)){const local_arr=ls.split("-");if(2!=local_arr.length)ls=`${local_arr[0]}-XX`;ls=new Intl.DateTimeFormat(ls).resolvedOptions()}const local_arr=ls.locale.split("-");if(2!=local_arr.length)ls.locale=`${local_arr[0]}-${Local.#country_from_lang(local_arr[0])}`;this.#local_=ls}toString(){return this.#local_.locale}get lang(){return this.#local_.locale.split("-")[0]}get country(){return this.#local_.locale.split("-")[1]}static fromUser(def_local){const from_page=!kh_js.isNode()&&!asWorker?kh_js.getAttribute2("html","lang",undefined,undefined,"attr")?.lang:cs.local;return new Local(from_page||def_local)}static setUser(user_local){if(user_local instanceof Local)user_local=user_local.toString();user_local=user_local.locale||user_local;if(!kh_js.isString(user_local)||kh_js.isEmpty(user_local))return;if(!kh_js.isNode()&&!asWorker)kh_global.document?.documentElement?.setAttribute("lang",user_local);else cs.local=user_local}static#country_from_lang(lang){switch(lang){case"zh":return"CN";default:return lang?.toLocaleUpperCase()}}}export class Copyright{static used=new Set(kh_js.isNode()?["kh"]:["kh","h5bp"]);static async request({ss_values,for_client_side=true,cs_values}={}){const{Util}=await import(`${jsm_prefix}/kh_io${VERSION}.js`);if(kh_js.isEmpty(ss_values))ss_values=Copyright.used.values();else if(Array.isArray(ss_values))ss_values=[...ss_values,...Copyright.used.values()];else if(ss_values instanceof Set)ss_values=ss_values.values();const query_param=encodeURI(JSON.stringify([...ss_values]));return Util.fetchData(undefined,`copyrights?values=${query_param}`,undefined,{get_json:true}).then((async copyrights=>{if(kh_js.isString(copyrights)){try{copyrights=JSON.parse(copyrights)}catch(error){kh_log.error?.(T9`error during parse copyrights => ${error}`);copyrights={}}}const kh_cpy=cs.unzipProp("app.copyright.notice");if(!kh_js.isEmpty(kh_cpy))JSON8MergePatch.apply(copyrights.kh,kh_cpy);if(kh_js.isValid(cs_values)){if(!Array.isArray(cs_values))cs_values=[cs_values];cs_values=cs_values.map((key=>({key:key.startsWith("app.copyright.")&&key.substring("app.copyright.".length)||key,value:cs.unzipProp(key)}))).filter((entry=>kh_js.isValid(entry.value)&&entry.key!==entry.value));const last=copyrights.last;delete copyrights.last;cs_values.forEach((entry=>copyrights[entry.key]=entry.value));copyrights.last=last}copyrights=Object.fromEntries(Object.entries(copyrights).filter((([key,value])=>kh_js.isValid(value))).map((([key,value])=>[key,StringMap.prototype.afterLocale.apply(value,[true])??value])).map((([key,value])=>{if(for_client_side){value.txt=value.txt.split("|").join("<br>")}return[key,value]})));kh_log.trace?.(T9`success copyrights 2 ${copyrights}`);return copyrights})).catch((error=>kh_log.error?.(T9`error copyrights => ${error}`)))}}export class StringMap{get["cur-time"](){return(new Date).toLocaleString(undefined,{dateStyle:"full",timeStyle:"long"})}get#today(){return new Date}get["today-iso"](){return this.#today.toISODateString?.()??`${this.#today.getFullYear()}-${this.#today.getMonth()+1}-${this.#today.getDate()}`}constructor(map,make_default=false){this.dt_formatter={de:new Intl.DateTimeFormat("de",{day:"2-digit",month:"2-digit",year:"numeric"}),en:new Intl.DateTimeFormat("en",{day:"2-digit",month:"2-digit",year:"numeric"})};if(make_default||!kh_js.isValid(StringMap.getGlobalMap(false))){this["cur-year"]=this.#today.getFullYear(),this["today"]={de:this.dt_formatter.de.format(this.#today),en:this.dt_formatter.en.format(this.#today)},this["today-s"]={de:this.dt_formatter.de.format(this.#today),en:this.dt_formatter.en.format(this.#today)};this["today-l"]={de:this.#today.toLocaleDateString("de",{day:"2-digit",month:"long",year:"numeric"}),en:this.#today.toLocaleDateString("en",{day:"2-digit",month:"long",year:"numeric"})};this["hello-world"]={de:"Hallo Welt","en-US":"Hello I'm Mr. Trump",en:"Hello world"},this["and"]={de:"und",en:"and"},this["for"]={de:"für",en:"for"},this["in"]={de:"in",en:"in"},this["of"]={de:"von",en:"of"},this["or"]={de:"oder",en:"or"},this["changes"]={de:"Änderungen",en:"changes"},this["confirm"]={de:"Bestätigung",en:"confirm"},this["info"]={de:"Info",en:"info"},this["warning"]={de:"Warnung",en:"warning"},this["error"]={de:"Fehler",en:"error"},this["success"]={de:"Erfolgreich",en:"success"},this["authorization-fails"]={de:"Authorisierung fehlerhaft",en:"authorization fails"};this["authorization-required"]={de:"Authorisierung erforderlich",en:"authorization required"};this["authorization-succeeded"]={de:"Authorisierung erfolgreich",en:"authorization succeeded"};this["authorization-logout"]={de:"Abmeldung erfolgreich",en:"logout succeeded"};this["authorization-expired"]={de:"Authorisierung abgelaufen",en:"authorization expired"};this["authorization-must-register"]={de:"Registrierung erforderlich",en:"registration required"};this["authorization-username"]={de:"Benutzername",en:"user name"};this["authorization-uoe"]={de:"Benutzername oder email",en:"user name or email"};this["authorization-password"]={de:"Kennwort",en:"password"};this["authorization-verify"]={de:"Authorisierung prüfen",en:"verify authorization"};this["authorization-privkey-nf"]={de:"Datei mit privatem Schlüssel nicht gefunden",en:"cannot locate private key file"};this["authorization-pubkey-nf"]={de:"Datei mit öffentlichen Schlüssel nicht gefunden",en:"cannot locate public key file"};this["authorization-cert-nf"]={de:"Zertifikatdatei nicht gefunden",en:"cannot locate certificate file"};this["authorization-not-logged-in"]={de:"Benutzer ist nicht eingeloggt",en:"user is not logged in"};this["authorization-must-login"]={de:"Benutzer muss sich einloggen",en:"user must login"};this["copyright"]={de:"Copyright",en:"copyright"};this["copyright.title"]={de:"Übersicht zu Urheberechten und Lizenzen",en:"overview of copyright and licences"};this["copyright.col.product"]={de:"Verwendete(s) Produkt(e) oder Bibliothek(en)",en:"used product(s) or library"};this["copyright.col.web"]={de:"Internetpräsenz",en:"website"};this["copyright.col.lic"]={de:"Lizenzdetails ansehen",en:"show licence details"};this["copyright.btu"]="© BTU Cottbus-Senftenberg, K. Henning";this["legal.notice.btu"]={de:"Dieses Programm ist ausschließlich für den Gebrauch durch die BTU Cottbus-Senftenberg gedacht. Eine Weitergabe an                                                             Dritte ist nicht zulässig.",en:"This program is for the exclusive use by BTU Cottbus-Senftenberg. Passing on to third parties is not permitted."},this["changes-accept"]={de:"@(changes) @(button-accept)",en:"@(button-accept) @(changes)"};this["changes-reject"]={de:"@(changes) @(button-reject)",en:"@(button-reject) @(changes)"};this["data-not-determined"]={de:"Daten konnte nicht ermittelt werden",en:"data could not be determined"};this["during-execution"]={de:"während der Ausführung",en:"during execution"};this["during-evaluation"]={de:"während der Auswertung",en:"during evaluation"};this["filter-entries"]={de:"Einträge filtern",en:"filter entries"};this["internal-error"]={de:"Interner Fehler",en:"internal error"};this["invalid-access"]={de:"Ungültiger Zugriff",en:"invalid access"};this["invalid-operation"]={de:"Ungültige Operation",en:"invalid operation"};this["wrong-usage-of"]={de:"Falsche Verwendung von",en:"wrong usage of"};this["already-exists"]={de:"existiert bereits",en:"already exists"};this["not-exists"]={de:"existiert nicht",en:"not exists"};this["invalid-argument"]={de:"Ungültiges Argument",en:"invalid argument"};this["invalid-type"]={de:"Ungültiger Typ",en:"invalid type"};this["invalid-usage-of"]={de:"Ungültige Verwendung von",en:"Invalid usage of"};this["legal-notice"]={de:"Impressum",en:"legal notice"};this["missing-token"]={de:"erforderliches Zeichen nicht gefunden",en:"required token not found"};this["not-implemented"]={de:"Diese Funktionalität ist nicht implementiert",en:"This functionality is not implemented"};this["timeout"]={de:"Zeitüberschreitung",en:"timeout"};this["server-context-expected"]={de:"Server Kontext erwartet",en:"server context expected"};this["browser-context-expected"]={de:"Browser Kontext erwartet",en:"browser context expected"};this["open-link-newtab"]={de:"Öffnet den Link in einem neuen Browsertab",en:"open the link in new browser tab"};this["open-link-sametab"]={de:"Öffnet den Link im aktuellen Browsertab",en:"open the link in current browser tab"};this["options-available"]={de:"Verfügbare Optionen",en:"available options"};this["options-selected"]={de:"Selektierte Optionen",en:"selected options"};this["param-invalid"]={de:"Parameter ungültig",en:"parameter invalid"};this["param-not-determined"]={de:"Parameter konnte nicht ermittelt werden",en:"parameter could not be determined"};this["param-not-match"]={de:"Parameter passen nicht zueinander",en:"parameters do not match each other"};this["param-expected"]={de:"Parameter erwartet",en:"parameters expected"};this["param-must-not-empty"]={de:"Parameter darf nicht leer sein",en:"parameter must not be empty"};this["param-must-not-empty-if"]={de:"Parameter darf nicht leer sein, wenn angegeben",en:"Parameter cannot be empty if specified"};this["path-not-exists"]={de:"Pfad @(not-exists)",en:"path @(not-exists)"};this["file-not-exists"]={de:"Datei @(not-exists)",en:"file @(not-exists)"};this["privacy-policy"]={de:"Datenschutz",en:"privacy policy"};this["resolved-for"]={de:"ermittelt für",en:"resolved for"};this["unknown-type"]={de:"Unbekannter Typ",en:"unknown type"};this["unknown-type-for"]={de:"Unbekannter Typ für",en:"unknown type for"};this["one-of-keys"]={de:"Eine der Tasten",en:"one of keys"};this["button-about"]={de:"Über",en:"about"};this["button-accept"]={de:"Übernehmen",en:"accept"};this["button-cancel"]={de:"Abbrechen",en:"cancel"};this["button-close"]={de:"Schließen",en:"close"};this["button-download"]={de:"Herunterladen",en:"download"};this["button-help"]={de:"Hilfe",en:"help"};this["button-less"]={de:"weniger",en:"less"};this["button-less-tt"]={de:"Weitere Informationen ausblenden",en:"show lesser information"};this["button-more"]={de:"mehr",en:"more"};this["button-more-tt"]={de:"Weitere Informationen anzeigen (öffnet evtl. externen Link)",en:"show more information (eventually external link opened)"};this["button-move"]={de:"Übertragen",en:"move"};this["button-move-all"]={de:"Alle Übertragen",en:"move all"};this["button-new"]={de:"Neu",en:"new"};this["button-no"]={de:"Nein",en:"no"};this["button-ok"]={de:"OK",en:"OK"};this["button-open"]={de:"Öffnen",en:"open"};this["button-print"]={de:"Drucken",en:"print"};this["button-reject"]={de:"Verwerfen",en:"reject"};this["button-save"]={de:"Speichern",en:"save"};this["button-save-as"]={de:"Speichern unter",en:"save as"};this["button-upload"]={de:"Hochladen",en:"upload"};this["button-yes"]={de:"Ja",en:"yes"};this["event.button.click"]='@(kh_js.toKebabCase([ "@(app-prefix)", "button-click" ]))'}this.addEntries(map);StringMap.setGlobalMap(this,true)}afterLocale(internal=false){if(true!==internal)this._restore?.();const o_this=this;const system_local=new Local;const kh_local="de";const local=Local.fromUser();function forLocal(value,for_local){for_local=!kh_js.isValid(for_local)?local:new Local(for_local);if(kh_js.isString(value)||!for_local)return value;if(Array.isArray(value))return value;if("function"===typeof value)return value;return value[for_local.toString()]??value[for_local.lang]??value[for_local.country]??value[for_local.country.toLocaleLowerCase()]??value[system_local.toString()]??value[system_local.lang]??value[system_local.country]??value[kh_local]??value}kh_js.for_in(this,(function(key,value){if(!kh_js.isPlainObject(value))return;if(value!=forLocal(value)){Object.defineProperty(o_this,key,{configurable:true,enumerable:true,get:function(){return forLocal(value)},set:!internal?undefined:function(nv){value=nv}});if(true!==internal&&!kh_js.isValid(o_this[StringMap.#k(key)])&&value!=o_this[key]){Object.defineProperty(o_this,StringMap.#k(key),{configurable:true,enumerable:false,get:function(){return value}})}}}))}addEntries(map,only_if_not_exists=false){this._restore();if(!map)debugger;const is_map=map instanceof Map;(is_map&&[...map]||Object.entries(map)).forEach((([k,v])=>{const add=!only_if_not_exists||!([k]in this);if(add){if(kh_js.isValid(this[StringMap.#k(k)]))delete this[StringMap.#k(k)];let assign=true;if(!is_map){const descriptor=Object.getOwnPropertyDescriptor(map,k)??Object.getOwnPropertyDescriptor(Object.getPrototypeOf(map),k);if(!kh_js.isValid(descriptor))throw new ms.Error({msg:["param-not-determined","ƒ",k]});if(kh_js.isValid(descriptor.get)){Object.defineProperty(this,k,descriptor);if(kh_js.isValid(map[StringMap.#k(k)])){Object.defineProperty(this,StringMap.#k(k),{configurable:true,enumerable:false,get:function(){return map[StringMap.#k(k)]}})}assign=false}}if(assign)this[k]=v}}));this.afterLocale()}_restore(){const o_this=this;kh_js.for_in(this,(function(key,value){if(kh_js.isValid(o_this[StringMap.#k(key)])){Object.defineProperty(o_this,key,{configurable:true,enumerable:true,writable:true,value:o_this[StringMap.#k(key)]})}}))}static#k(key){return`__kh-${key}`}static setGlobalMap(map,only_if_first=false){if(!only_if_first||!kh_js.isValid(cs[StringMap.#gsm_key]))cs[StringMap.#gsm_key]=map}static getGlobalMap(create_one=true){return cs[StringMap.#gsm_key]||(create_one?new StringMap([],true):undefined)}static#gsm_key="kh-global-string-map"}export class Color{#rgb_;#rgb_01_;constructor({r=0,g=0,b=0,a=1}={}){if(kh_js.isString(arguments[0])){let color_s=arguments[0];if("#"===color_s[0]){color_s=color_s.slice(1)}let color_num=Number.parseInt(color_s,16);const with_tranparency=4==color_s.length||8==color_s.length;const short_notation=3==color_s.length||4==color_s.length;const r_shift=(with_tranparency?3:2)*(short_notation?4:8);const g_shift=(with_tranparency?2:1)*(short_notation?4:8);const b_shift=(with_tranparency?1:0)*(short_notation?4:8);const a_shift=(with_tranparency?0:0)*(short_notation?4:8);const mask=short_notation?15:255;r=Color.range(color_num>>r_shift&mask);g=Color.range(color_num>>g_shift&mask);b=Color.range(color_num>>b_shift&mask);a=with_tranparency?color_num&mask:1}else if(Array.isArray(arguments[0])){r=Color.range(arguments[0][0]);g=Color.range(arguments[0][1]);b=Color.range(arguments[0][2]);a=4==arguments[0].length?Color.range(arguments[0][3]):1}this.#rgb_={r,g,b,a};this.#rgb_01_={r:r/255,g:g/255,b:b/255,a:a/255}}get r(){return this.#rgb_.r}get g(){return this.#rgb_.g}get b(){return this.#rgb_.b}get a(){return this.#rgb_.a}setRGBA({r,g,b,a}={}){this.#rgb_={...this.#rgb_,r,g,b,a};this.#rgb_01_={r:this.#rgb_.r/255,g:this.#rgb_.g/255,b:this.#rgb_.b/255,a:this.#rgb_.a/255}}rgbString(){return`rgb(${this.r}, ${this.g}), ${this.b})`}rgbaString(){return`rgba(${this.r}, ${this.g}), ${this.b}), 0`}complementary(){return new Color({r:255-this.r,g:255-this.g,b:255-this.b,a:this.a})}isDarken(limit=128){return this.r<=limit&&this.g<=limit&&this.b<=limit}toString(use_pound=false){const with_tranparency=1!=this.a;const r_shift=with_tranparency?24:16;const g_shift=with_tranparency?16:8;const b_shift=with_tranparency?8:0;return(use_pound?"#":"")+(this.g<<g_shift|this.b<<b_shift|this.r<<r_shift|this.a).toString(16)}static range(val,limit=255){return 0>val?0:limit<val?limit:val}static GradientCalculator(p1,p2,p3){return{calc_chanel:function(v1,v2,c1,c2,x){return c1==c2?c1:c1-(c1-c2)*(v1-x)/(v1-v2)},calc:function(x){if(p1.val>=x)return p1.col;if(p3.val<=x)return p3.col;if(p2.val==x)return p2.col;if(p2.val>x){let r=this.calc_chanel(p1.val,p2.val,p1.col.r,p2.col.r,x);let g=this.calc_chanel(p1.val,p2.val,p1.col.g,p2.col.g,x);let b=this.calc_chanel(p1.val,p2.val,p1.col.b,p2.col.b,x);return new Color({r,g,b})}else{let r=this.calc_chanel(p2.val,p3.val,p2.col.r,p3.col.r,x);let g=this.calc_chanel(p2.val,p3.val,p2.col.g,p3.col.g,x);let b=this.calc_chanel(p2.val,p3.val,p2.col.b,p3.col.b,x);return new Color({r,g,b})}}}}static LightenDarkenColor(col,amt){let usePound=false;let plain=false;if(col instanceof Color);else if(kh_js.isPlainObject(col)){col={r:0,g:0,b:0,...col};plain=true}else if(kh_js.isString(col)){if("#"===col[0])usePound=true;col=new Color(col)}let r=Color.range(col.r+amt);let g=Color.range(col.g+amt);let b=Color.range(col.b+amt);return plain?{r,g,b,a:col.a}:(usePound?"#":"")+(b|g<<8|r<<16).toString(16)}LightenDarkenColor(amt){this.setRGBA(Color.LightenDarkenColor(this.#rgb_,amt))}}export class JSON8MergePatch{static apply(target,source,options){const should_assign=true===options?.assign||Array.isArray(options?.assign)&&-1!=options.assign.indexOf(source);const integrate_arrays=options?.array??false;if(!should_assign&&source instanceof Set)source=JSON8MergePatch.toArray(source);if(typeof source!=="object"||null===source||Array.isArray(source)&&!integrate_arrays){return source}if(typeof target!=="object"||null===target||Array.isArray(target)&&!integrate_arrays){if(should_assign){target=source;return target}const proto=kh_js.isValid(options)&&"proto"in options&&undefined!==options.proto?options.proto:{};target=Object.create(proto)}if(source instanceof Set)return source;if(source instanceof Map)source=JSON8MergePatch.toObject(source);for(const k in source){const v=source[k];if(null===v){delete target[k];continue}if(undefined==v&&Array.isArray(target)&&integrate_arrays)continue;target[k]=JSON8MergePatch.apply(target[k],v,options)}if(Array.isArray(target)&&integrate_arrays)target.length=Math.max(target.length,source.length);return target}static patch(doc,patch,options){return JSON8MergePatch.apply(doc,patch,options)}static diff(a,b){const t=JSON8MergePatch.type(a);if("object"!=t||t!==JSON8MergePatch.type(b))return b;const patch={};let keys=Object.keys(b);for(let i=0,l=keys.length;i<l;++i){const k=keys[i];if(!a.hasOwnProperty(k))patch[k]=b[k];else if(!JSON8MergePatch.equal(a[k],b[k]))patch[k]=JSON8MergePatch.diff(a[k],b[k])}keys=Object.keys(a);for(let i=0,l=keys.length;i<l;++i){const k=keys[i];if(!b.hasOwnProperty(k))patch[k]=null}return patch}static type(obj){const t=typeof obj;if("boolean"===t||"string"===t)return t;else if("number"===t&&Number.isFinite(obj))return t;else if("object"===t){if(Array.isArray(obj))return"array";else if("Set"in kh_global&&obj instanceof Set)return"array";else if("Map"in kh_global&&obj instanceof Map)return"object";else if(null===obj)return"null";else if("object"===t)return"object"}}static toArray(set){return Array.from(set)}static toObject(map){return Object.fromEntries(map)}static equal(a,b){const ta=JSON8MergePatch.type(a);const tb=JSON8MergePatch.type(b);if(ta!==tb)return false;const t=ta;switch(t){case"number":if(a===0&&1/a===-Infinity)return b===0&&1/b===-Infinity;return a===b;case"string":case"null":case"boolean":return a===b}if(t==="array"){if("Set"in kh_global){if(a instanceof Set)a=JSON8MergePatch.toArray(a);if(b instanceof Set)b=JSON8MergePatch.toArray(b)}if(a.length!==b.length)return false;for(let i=0,l=a.length;i<l;++i)if(!JSON8MergePatch.equal(a[i],b[i]))return false;return true}if(t==="object"){if("Map"in kh_global){if(a instanceof Map)a=JSON8MergePatch.toObject(a);if(b instanceof Map)b=JSON8MergePatch.toObject(b)}const keys=Object.keys(a);if(keys.length!==Object.keys(b).length)return false;for(let i=0,l=keys.length;i<l;++i){const key=keys[i];if(b.hasOwnProperty&&!b.hasOwnProperty(key))return false;if(!JSON8MergePatch.equal(b[key],a[key]))return false}return true}return true}}kh_global.LoadedScripts.get(mf).resolve(ms);