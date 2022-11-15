const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="fairusell_client";const mf="fairusell_client_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);let jsm_prefix;let common_prefix;if("undefined"!==typeof process){jsm_prefix=`file:///${kh_global.kh.pathes.get("own-module")}`;common_prefix=`file:///${kh_global.kh.pathes.get("common")}`}else{jsm_prefix=nodeFN2ZK(`/contrib/jsm`)}const kh_js={...await import(`${jsm_prefix}/kh_earlybird${VERSION}.js`),...await import(`${jsm_prefix}/kh_functions${VERSION}.js`),...await import(`${jsm_prefix}/kh_classes${VERSION}.js`)};const print_level="debug";const{Logger}=await import(`${jsm_prefix}/kh_log${VERSION}.js`);const kh_log=new Logger(print_level,(()=>name));const kh_cms={...await import(`${jsm_prefix}/kh_cms${VERSION}.js`)};const kh_io={...await import(`${jsm_prefix}/kh_io${VERSION}.js`)};const{vjs}=await import(`${jsm_prefix}/kh_vanilla${VERSION}.js`);const name=MF`${mf}`;function unzip(label_key,element){return!kh_js.isString(label_key)?undefined:kh_cms.unzipProp(label_key,true,element||getMainWindow())}function unzipProp(prop,element){return kh_cms.unzipProp(prop,false,element||getMainWindow())}function getMainWindow(){if(kh_js.isNode())return undefined;let key=`${cf}-mainw`;if(!kh_js.isValid(cs[key])){cs[key]=vjs("#fairusell_main_win")}return cs[key]}function processTagged(strings,...keys){if(kh_js.isEmpty(strings)&&kh_js.isEmpty(keys))return"";return keys.map(((key,i)=>{let s=unzip(key);return strings[i]+(!kh_js.isEmpty(s)?s:key)})).join("")+strings[strings.length-1]}function processTaggedComplex(strings,...keys){if(kh_js.isEmpty(strings)&&kh_js.isEmpty(keys))return"";return unzipProp(processTagged(strings,...keys))}kh_global.U??=processTagged;kh_global.U2??=processTaggedComplex;export async function onReady(jq){try{await kh_cms.onReadyStd(cs,{string_tables:[strings],app_lang:"en-UK",watch_hideit:'[id^="fairusell"]'});const subRoute=cs.subRoute;window.setTimeout((()=>{const id=window.setInterval((()=>rotate()),1e3);window.setTimeout((()=>{window.clearInterval(id);vjs.on("keydown",(event=>{if(" "==event.key)rotate(true)}),window)}),24001)}),250)}catch(e){kh_log.debug?.(`error= ${e}`);cs.setStatus(e)}}function rotate(b_clockwise=false){const $divs=$('[class*="fair.block"]');const orders=[...$divs.toArray()].map((div=>$(div).attr("data-order2")));let clockwise=[orders[1],orders[3],orders[0],orders[5],orders[2],orders[4]];let counterclockwise=[orders[2],orders[0],orders[4],orders[1],orders[5],orders[3]];let as_ring=[$divs.filter(`[data-order2="${0}"]`).index(),$divs.filter(`[data-order2="${1}"]`).index()];for(let i=3;i<$divs.length;i+=2)as_ring.push($divs.filter(`[data-order2="${i}"]`).index());for(let i=$divs.length-2;0<i;i-=2)as_ring.push($divs.filter(`[data-order2="${i}"]`).index());as_ring.rotate(b_clockwise?-1:1);let new_orders=new Array($divs.length);$divs.eq(as_ring[0]).attr("data-order2",0);new_orders[as_ring[0]]=0;$divs.eq(as_ring[1]).attr("data-order2",1);new_orders[as_ring[1]]=1;for(let i=2,j=1;i<=$divs.length/2;++i,++j){$divs.eq(as_ring[i]).attr("data-order2",i+j);new_orders[as_ring[i]]=i+j}for(let i=$divs.length/2+1,j=2;i<$divs.length;++i,j+=2){$divs.eq(as_ring[i]).attr("data-order2",$divs.length-j);new_orders[as_ring[i]]=$divs.length-j}$("[data-order]").attr("data-order",JSON.stringify(new_orders))}class Error extends(kh_io.HTTPError(kh_js.Error)){constructor(){super(...arguments)}}const strings={"fair.main.text":[{label:"fair",attributes:{ui_model:"block",background:"#789e45"}},{label:"you",attributes:{ui_model:"block",background:"#ba8761"}},{label:"sell",attributes:{ui_model:"block",background:"#61ba87"}},{label:"your",attributes:{ui_model:"block",background:"#87ba61"}},{label:"carousel",attributes:{ui_model:"block",background:"#ba6187"}},{label:"🎠",attributes:{ui_model:"block",background:"#6187ba"}}],"class.app.status.stem":"fair-status-",unzip:label_key=>unzip(label_key)};Object.assign(cs,{unzip,getMainWindow});kh_global.LoadedScripts.get(mf).resolve(ms);