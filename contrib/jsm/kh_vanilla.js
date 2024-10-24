const kh_global=Function("return globalThis;")()||Function("return this;")()||Function("return self;")();const as_module=undefined==this;const asWorker="undefined"===typeof window&&"undefined"===typeof process&&self;const cf="kh_vanilla";const mf="kh_vanilla_esm";kh_global.kh??={};kh_global.kh.context??="undefined"!==typeof window?kh_global.parent==kh_global?"window":"iframe":"undefined"!==typeof process?"node.js":"undefined"!==typeof self?self.name??"worker":"unknown";kh_global.kh.storage??={};const cs=kh_global.kh.storage[cf]??={cf,ms:new Set};const ms=kh_global.kh.storage[mf]??={mf,cs};cs.ms.add(ms);import*as kh_js_e from"/contrib/jsm/kh_earlybird.js";import*as kh_js_c from"/contrib/jsm/kh_classes.js";import*as kh_js_c2 from"/contrib/jsm/kh_classes2.js";import*as kh_js_f from"/contrib/jsm/kh_functions.js";const kh_js=Object.assign({...kh_js_e},{...kh_js_c},{...kh_js_c2},{...kh_js_f});const name=MF`${mf}`;const print_level=undefined;import{Logger}from"/contrib/jsm/kh_log.js";const kh_log=new Logger(print_level,(()=>name));function unpack1(element){const typename=element?.__proto__.constructor.name;if("HTMLCollection"==typename)return[...element];if(" NodeList"==typename)return[...element];if(/^(HTML)?Document/.test(typename))return element;if("Window"==typename||/^HTML.*Element/.test(typename))return element;if(element instanceof EventTarget||kh_js.isString(element))return element;if(Array.isArray(element))return element.map(unpack1).flat().filter(kh_js.isValid);if(kh_js.isValid(element?.Șdom))return unpack1(element.Șdom);return undefined}const unpack=kh_global.jQuery||kh_global.$?element=>element?.constructor.prototype.jquery?element.toArray():unpack1(element):element=>unpack1(element);export function vjs(element,selector,get_all=false){element=unpack(element);if(kh_js.isString(element)){const ret=vjs(document,element,selector??true);return kh_js.isString(selector)&&kh_js.isValid(ret)?vjs(ret,selector,get_all):ret}if(!kh_js.isValid(element)||Array.isArray(element)&&kh_js.isEmpty(element))return undefined;if(kh_js.isEmpty(selector)||!kh_js.isString(selector)){if(!Array.isArray(element))return[element];if(!kh_js.isString(element[0]))return element;get_all=true}if(Array.isArray(element)){const ret_elements=element.map((elem=>vjs(elem,selector,get_all))).flat().filter(kh_js.isValid);return get_all?ret_elements:ret_elements?.[0]}if(window==element)element=window.document;try{return get_all?[...element.querySelectorAll(selector).values()]:element.querySelector(selector)}catch(error){debugger}}vjs.ȘȘ=function(array){if(!Array.isArray(array))return array;return array.map(vjs).flat()};vjs.html=kh_global.document?.documentElement;vjs.head=kh_global.document?.documentElement?.children?.[0];vjs.body=kh_global.document?.documentElement?.children?.[1];function createPostMessageQueue(w){if("Window"!=w.__proto__.constructor.name)return;kh_log.assert?.(globalThis==w,`must call within context ${w.kh_id}`);const topW=globalThis.top;const topStorage=topW.kh.storage[cf];w.kh??={};w.kh.storage??={};w.kh.storage[cf]??={};const wStorage=w.kh.storage[cf];const event_map=topStorage.PostMessageQueue_EventMap??=new Map;if(kh_global.kh_id!==wStorage.PostMessageQueue){const postMessage=w.postMessage;w.postMessage=function(message,targetOrigin,transfer){kh_log.assert?.(!message?.key,"resolve double chained postMessage");if(!kh_js.isEmpty(message?.event_type)){const key=kh_js.getRandomArbitrary()|0;event_map.set(key,message);return postMessage({key},targetOrigin||"*",transfer)}else postMessage(message,targetOrigin,transfer)};w.addEventListener("message",(function(event){const targetOrigin=event.origin;kh_log.trace?.(`in message listener @ ${kh_global.kh_id}`);const key=event.data?.key;if(kh_js.isValid(key)){const{event_type,target,options,broker_id,key:key_from_key}=event_map.get(key);if(!kh_js.isEmpty(event_type)&&kh_js.isValid(target)){kh_log.assert?.(kh_global.document==(target.ownerDocument??target[0].ownerDocument),`wrong context @ ${kh_global.kh_id}, expected ${broker_id??"???"}`);vjs.postEvent(event_type,target,options);event_map.delete(key)}else if(kh_js.isValid(key_from_key))debugger}}));wStorage.PostMessageQueue=kh_global.kh_id}}globalThis.kh_id??=`kh/${kh_global.kh.context}`;createPostMessageQueue(globalThis);const cvt_event_type=event_type=>kh_js.isString(event_type)?event_type.split(/(?:,\s*)|[ ]+/g):event_type??[];const false_listener=event=>{event.stopPropagation();event.preventDefault();return false};const test_seperate=function(element){return kh_js.isDOMNode(element)||kh_global.document==element||kh_global.window==element};const mapOL2PL=new Map;cs.ns_map??=new class{constructor(){}add(ns_key,entry){const ok=!kh_js.isEmpty(ns_key)&&kh_js.isValid(entry)&&kh_js.isValid(entry.target)&&kh_js.isValid(entry.type)&&kh_js.isValid(entry.listener);kh_log.assert?.(ok,`invalid parameters in entry in ${kh_js.currentFunctionName()} => ${ns_key} / ${entry}`);let ns_listener=this[ns_key]??=new kh_js.Map2Array;ns_listener.add(entry.target,entry)}remove(ns_key,entry){if(ns_key?.startsWith("."))ns_key=ns_key.substring(1);const ok=!kh_js.isEmpty(ns_key)&&kh_js.isValid(entry);kh_log.assert?.(ok,`invalid parameters in entry in ${kh_js.currentFunctionName()} => ${ns_key} / ${entry}`);const valid_target=kh_js.isValid(entry.target);const valid_type=!kh_js.isEmpty(entry.type);const valid_listener=kh_js.isValid(entry.listener);const ns_key_splitted=ns_key.split(".");for(let ns_entry of Object.entries(this)){const cur_ns_key=ns_entry[0];const cur_ns_listener=this[cur_ns_key];const cur_ns_key_splitted=cur_ns_key.split(".");if(ns_key_splitted.length>cur_ns_key_splitted.length)continue;if(!ns_key_splitted.every((ns_key_part=>-1!=cur_ns_key_splitted.indexOf(ns_key_part))))continue;const ns_listener_entries=[...cur_ns_listener?.entries()];if(!valid_target&&!valid_type&&!valid_listener){ns_listener_entries.forEach((nsl_entry=>{nsl_entry[1]?.forEach((nsl_sub_entry=>nsl_entry[0].removeEventListener(nsl_sub_entry.type,nsl_sub_entry.listener,nsl_sub_entry.options)))}));delete this[cur_ns_key]}else{ns_listener_entries.forEach(((nsl_entry,nsl_index)=>{if(!valid_target||entry.target==nsl_entry[0]){let ns_target_arr=nsl_entry[1];ns_target_arr=ns_target_arr?.filter((nsl_sub_entry=>{const remove=(!valid_type||entry.type==nsl_sub_entry.type)&&(!valid_listener||entry.listener==nsl_sub_entry.listener);if(remove)nsl_entry[0].removeEventListener(nsl_sub_entry.type,nsl_sub_entry.listener,nsl_sub_entry.options);return!remove}));cur_ns_listener.set(nsl_entry[0],ns_target_arr)}}));const targets=[...cur_ns_listener.keys()];targets.forEach((target=>{if(kh_js.isEmpty(cur_ns_listener.get(target)))cur_ns_listener.delete(target)}));if(kh_js.isEmpty(cur_ns_listener))delete this[cur_ns_key]}}}};vjs.on=function(type,listener,element,selector,get_all=false,options){const has_selector=kh_js.isString(selector);element=vjs(element,has_selector?selector:undefined,get_all);if(!has_selector)options=selector;if(false===listener)listener=false_listener;let proxy_listener=false_listener!=listener?mapOL2PL.get(listener):listener;if(!kh_js.isValid(proxy_listener)){const ori_listener=listener;mapOL2PL.set(ori_listener,proxy_listener=async event=>{let ret=ori_listener(event);if(kh_js.isPromise(ret))ret=await ret;return false===ret?false_listener(event):ret})}listener=proxy_listener;if(!Array.isArray(element))element=[element];element.forEach((elem=>{cvt_event_type(type).forEach((event_type=>{let[et,...ns]=event_type.split(".");if(kh_js.isEmpty(et))return;if(!kh_js.isEmpty(ns)){ns=ns.join(".");cs.ns_map.add(ns,{target:elem,type:et,listener,options})}elem.addEventListener(et,listener,options)}))}));return listener};vjs.off=function(type,listener,element,selector,get_all=false,options){const has_selector=kh_js.isString(selector);element=vjs(element,has_selector?selector:undefined,get_all);if(!has_selector)options=selector;if(false===listener)listener=false_listener;listener=mapOL2PL.get(listener)??listener;if(!kh_js.isValid(element)&&!kh_js.isEmpty(selector))kh_log.warn?.(T9`possible incorrect element selection in ${kh_js.currentFunctionName()} / selector(${selector})`);if(!Array.isArray(element))element=[element];element.forEach((elem=>{cvt_event_type(type).forEach((event_type=>{let[et,...ns]=event_type.split(".");if(kh_js.isEmpty(ns)){if(!kh_js.isEmpty(et)){if(kh_js.isValid(elem))elem.removeEventListener(et,listener,options);else kh_log.warn?.(T9`possible incorrect element / event_type pair in ${kh_js.currentFunctionName()} / selector(${selector} / event_type(${et}))`)}}else{ns=ns.join(".");cs.ns_map.remove(ns,{target:elem,listener,type:et})}}))}));return listener};vjs.one=function(type,listener,element,selector,get_all=false,options){const has_selector=kh_js.isString(selector);element=vjs(element,has_selector?selector:undefined,get_all);if(!has_selector)options=selector;const onebyone=options?.every;delete options?.every;if(false===listener)listener=false_listener;let proxy_listener;let promise=onebyone?new kh_js.Deferred:undefined;const real_listener=vjs.on(type,proxy_listener=event=>{const result=listener(event);if(onebyone){vjs.off(type,proxy_listener,event.target,options);element.splice(element.indexOf(event.target),1);if(kh_js.isEmpty(element))promise.resolve()}else vjs.off(type,proxy_listener,element,options);return result},element,options);mapOL2PL.set(listener,real_listener);return promise??proxy_listener};vjs.onc=function(type,listener,element,selector,options){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;if(false===listener)listener=false_listener;const callListenerForElement=true==options?.forElement;delete options?.forElement;const real_listeners=element.map(((elem,elem_index)=>{let proxy_listener;vjs.on(type,proxy_listener=event=>{let selector_target;if(callListenerForElement&&event.target==elem)selector_target=elem;else{let elems="function"===typeof selector?selector(elem,event):vjs(elem,selector,true);if(!kh_js.isEmpty(elems)){selector_target=elems?.find((one_elem=>one_elem==event.target));if(!kh_js.isValid(selector_target)){elems=elems?.filter((one_elem=>one_elem.contains(event.target)));elems=elems?.filter((one_elem=>{const one_elem_is_parent=-1!=elems.findIndex((one_elem2=>one_elem2!=one_elem&&one_elem.contains(one_elem2)));return!one_elem_is_parent}));selector_target=elems?.[0]}}}let result;if(kh_js.isValid(selector_target))result=listener(event,selector_target!=event.target?selector_target:undefined,elem_index);return result},elem,options);return proxy_listener}));return must_seperate?real_listeners[0]:real_listeners};vjs.onec=function(type,listener,element,selector,options){if(false===listener)listener=false_listener;const proxy_listeners=vjs.onc(type,((event,real_target,index)=>{const ret=listener(event,real_target,index);vjs.off(type,proxy_listeners[index]??proxy_listeners,element,options);return ret}),element,selector,options);return proxy_listeners};vjs.once=vjs.onec;vjs.onoff=function(type,listener,element,canceler){let proxy_listener;vjs.on(type,proxy_listener=event=>{const result=listener(event,canceler);if(true===canceler||"function"==typeof canceler&&canceler(event))vjs.off(type,proxy_listener,element);return result},element)};vjs.trigger=function(type,element,{bubbles=true,cancelable=false,composed=false,detail}={}){const must_seperate_element=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const options=arguments[2]??{};const event_name=options.event_name||"Event";delete options.event_name;detail??=options;if(!kh_js.isPrimitive(detail)){delete detail.bubbles;delete detail.cancelable;delete detail.composed;if(kh_js.isPlainObject(detail)&&0==Object.keys(detail).length)detail=undefined}let event_types=cvt_event_type(type);if(!Array.isArray(event_types))event_types=[event_types];const must_seperate_event_type=1==event_types.length;const event_types_result=event_types.map((event_type=>{let[et,...ns]=event_type instanceof Event?[event_type]:event_type.split(".");let element_result;if(!kh_js.isValid(detail)){const event=et instanceof Event?et:new kh_global[event_name](et,{bubbles,cancelable,composed,...options});element_result=element.map((elem=>elem.dispatchEvent(event)))}else{const event=new CustomEvent(et,{bubbles,cancelable,composed,detail,...options});element_result=element.map((elem=>elem.dispatchEvent(event)))}return must_seperate_element?element_result[0]:element_result}));return must_seperate_event_type?event_types_result[0]:event_types_result};vjs.sendEvent=vjs.trigger;vjs.postEvent=function(type,element,{bubbles=true,cancelable=false,composed=false,detail}={}){const use_argz=!kh_js.isValid(detail)||kh_js.isPlainObject(detail)&&kh_js.isEmpty(detail);return kh_js.yieldToMain().then((async()=>vjs.trigger(type,element,!use_argz?{bubbles,cancelable,composed,detail}:arguments[2])))};vjs.postMessage=function(type,from,to,options){const iframe_from=vjs.getIFrameAbove(from);const iframe_to=vjs.getIFrameAbove(to);if(kh_js.isValid(iframe_from))createPostMessageQueue(window);if("register"==type)return;if(iframe_from==iframe_to)return vjs.postEvent(type,to,options);const broker=kh_js.isValid(iframe_to)?iframe_to.contentWindow:window.parent;kh_log.debug?.(`push post message trigger @ ${window.kh_id} receiver= ${broker.kh_id}`);broker.postMessage({event_type:type,target:to,options,broker_id:broker.kh_id})};vjs.forwardEvent=function(event,element){const event_copy=new event.constructor(event.type,event);vjs.trigger(event_copy,element);event.preventDefault();event.stopPropagation()};vjs.empty=function(element){element=vjs(element);if(kh_js.isEmpty(element))return;element.forEach((elem=>elem.replaceChildren()))};vjs.style1=function(element,styleName,newVal){if(kh_js.isEmpty(styleName)||!kh_js.isValid(element))return undefined;styleName=kh_js.toKebabCase(styleName);if(undefined===newVal||"undefined"===newVal){const varValue="computedStyleMap"in element?element.computedStyleMap().get(styleName)?.toString():window.getComputedStyle(element).getPropertyValue(styleName);return varValue||undefined}else{if(!kh_js.isChromium()&&"attributeStyleMap"in element){function set(e,sN,nV){nV=nV.toString();try{e.attributeStyleMap.set(sN,nV)}catch(error){e.style.setProperty(sN,nV)}}null===newVal||"null"===newVal?element.attributeStyleMap.delete(styleName):set(element,styleName,newVal)}else{null===newVal||"null"===newVal?element.style.removeProperty(styleName):element.style.setProperty(styleName,newVal.toString())}}};function handle_props(element,propertyName,newVal,funcName="style1"){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(propertyName)||kh_js.isEmpty(element))return undefined;if(must_seperate&&kh_js.isString(propertyName))return vjs[funcName](element[0],propertyName,newVal);let was_style_object=true;if(!kh_js.isPlainObject(propertyName)){propertyName={[propertyName]:newVal};was_style_object=false}const ret=element.map((elem=>{const elem_ret=Object.entries(propertyName).map((([sN,nV])=>[sN,vjs[funcName](elem,sN,nV)]));return was_style_object?Object.fromEntries(elem_ret):elem_ret[0][1]}));return must_seperate?ret[0]:ret}vjs.inlineStyle2CSS=function(style=""){if(!kh_js.isString(style))return style;return Object.fromEntries(style.split(";").map((entry=>entry.trim())).filter((entry=>!kh_js.isEmpty(entry)&&`''`!=entry)).map((entry=>entry.split(":"))).map((arr=>arr.map((e=>e.trim())))))};vjs.CSS2inlineStyle=function(style={}){if(kh_js.isString(style)){try{style=JSON.parse(style)}catch(error){kh_log.debug?.(T9`error in ${kh_js.currentFunctionName()} => ${error}`);return""}}style=Object.entries(style).map((key_value=>key_value.join(":"))).join(";");return style+(!kh_js.isEmpty(style)?";":"")};vjs.style=function(element,styleName,newVal){if(!kh_js.isValid(element))return undefined;if(!kh_js.isValid(styleName)&&!kh_js.isValid(newVal)){const must_seperate=test_seperate(element);element=vjs(element);const styles=element.map((elem=>vjs.inlineStyle2CSS(elem.getAttribute("style"))));return must_seperate?styles[0]:styles}if(kh_js.isString(styleName)&&kh_js.isEmpty(newVal)&&-1!=styleName.indexOf(":")){styleName=vjs.inlineStyle2CSS(styleName)}return handle_props(element,styleName,newVal,"style1")};vjs.cssvar=function(element=vjs?.body,varName,newVal){return vjs.style(element,varName,newVal)};vjs.insertAdjacentHTML=function(element,position,content){element.insertAdjacentHTML(position,content);vjs(element,"script",true).forEach((script=>{const newScript=document.createElement("script");Array.from(script.attributes).forEach((attr=>newScript.setAttribute(attr.name,attr.value)));newScript.appendChild(document.createTextNode(script.innerHTML));script.parentNode.replaceChild(newScript,script)}))};vjs.offset=function(element,fromTop=true){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{let x=0;let y=0;if(true==fromTop){const bcr_elem=vjs.boundingRect(elem);const bcr_body=vjs.boundingRect(vjs.body);x=bcr_elem.left-bcr_body.left|0;y=bcr_elem.top-bcr_body.top|0}else{while(elem){if("BODY"==elem.tagName){const xScroll=elem.scrollLeft||document.documentElement.scrollLeft;const yScroll=elem.scrollTop||document.documentElement.scrollTop;x+=elem.offsetLeft-xScroll+elem.clientLeft;y+=elem.offsetTop-yScroll+elem.clientTop}else{x+=elem.offsetLeft-elem.scrollLeft+elem.clientLeft;y+=elem.offsetTop-elem.scrollTop+elem.clientTop}elem=elem.offsetParent}}return{top:y,y,left:x,x}}));return must_seperate?ret[0]:ret};vjs.MousePos=function(event={},defPos={x:-1,y:-1}){return{x:event.touches?.[0]?.clientX??event.clientX??event.pageX??event.center?.x??event.left??event.x??defPos.x,y:event.touches?.[0]?.clientY??event.clientY??event.pageY??event.center?.y??event.top??event.y??defPos.y}};const RectBase="undefined"!==typeof process?Object:kh_global.DOMRect;export class Rect extends RectBase{constructor({x=0,y=0,width=0,height=0}={}){super(x,y,width,height)}clone(){return new Rect(this)}get size(){return{width:this.width,height:this.height}}inside({x=-1,y=-1}={},{top=0,left=0,bottom=0,right=0}={}){const event=kh_js.getDOMEvent(arguments[0],true);if(kh_js.isValid(event)){({x,y}=vjs.MousePos(event))}return x>=this.left+left&&x<this.right-right&&y>=this.top+top&&y<this.bottom-bottom}intersect(other_rect){const x=Math.max(this.x,other_rect.x);const y=Math.max(this.y,other_rect.y);const width=Math.min(this.x+this.width,other_rect.x+other_rect.width)-x;const height=Math.min(this.y+this.height,other_rect.y+other_rect.height)-y;if(0>=width||0>=height)return false;return new Rect({x,y,width,height})}toFixedPoint(){return new Rect({x:Math.ceil(this.x)|0,y:Math.ceil(this.y)|0,width:Math.floor(this.width)|0,height:Math.floor(this.height)|0})}static styleFlag=Object.freeze({sF_border:new kh_js.EnumValue("border",1<<0>>>0),sF_margin:new kh_js.EnumValue("margin",1<<1>>>0),sF_padding:new kh_js.EnumValue("padding",1<<2>>>0),valueOf:(obj,sF)=>kh_js.EnumValue.valueOf(obj,sF,Rect.styleFlag),map(sF){return kh_js.EnumValue.map(sF,Rect.styleFlag)}});#considerStyle(elem,sF,add_value=true){sF=kh_js.EnumValue.map2Array(sF,Rect.styleFlag);const factor=add_value?1:-1;sF.forEach((value=>{const style=value.name;const stylePF="border"!==style?"":"Width";let styleObj={[`${style}Top${stylePF}`]:undefined,[`${style}Bottom${stylePF}`]:undefined,[`${style}Left${stylePF}`]:undefined,[`${style}Right${stylePF}`]:undefined};styleObj=vjs.style(elem,styleObj);this.x-=factor*Number.parseFloat(styleObj[`${style}Left${stylePF}`]);this.y-=factor*Number.parseFloat(styleObj[`${style}Top${stylePF}`]);this.width+=factor*(Number.parseFloat(styleObj[`${style}Left${stylePF}`])+Number.parseFloat(styleObj[`${style}Right${stylePF}`]));this.height+=factor*(Number.parseFloat(styleObj[`${style}Top${stylePF}`])+Number.parseFloat(styleObj[`${style}Bottom${stylePF}`]))}));return this}removeStyle(elem,sF){return this.#considerStyle(elem,sF,false)}considerStyle(elem,sF){return this.#considerStyle(elem,sF)}considerMargin(elem){return this.considerStyle(elem,Rect.styleFlag.sF_margin)}}vjs.boundingRect=function(element,include_margin=false){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{const rect=new Rect(elem.getBoundingClientRect());if(true==include_margin)rect.considerMargin(elem);return rect}));return must_seperate?ret[0]:ret};vjs.innerSize=function(element){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{if(window==elem){return{width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}}else{return{width:elem?.clientWidth??elem?.width??elem?.canvas?.width,height:elem?.clientHeight??elem?.height??elem?.canvas?.height}}}));return must_seperate?ret[0]:ret};vjs.outerSize=function(element,include_margin=false){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{const sz={width:elem?.offsetWidth??0,height:elem?.offsetHeight??0};if(true==include_margin){const{marginTop,marginBottom,marginLeft,marginRight}=vjs.style(elem,{marginTop:undefined,marginBottom:undefined,marginLeft:undefined,marginRight:undefined});sz.width+=Number.parseFloat(marginLeft)+Number.parseFloat(marginRight);sz.height+=Number.parseFloat(marginTop)+Number.parseFloat(marginBottom)}return sz}));return must_seperate?ret[0]:ret};vjs.outerRect=function(element,include_margin=false){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{const rect=new Rect({x:elem?.offsetLeft??0,y:elem?.offsetTop??0,width:elem?.offsetWidth??0,height:elem?.offsetHeight??0});if(true==include_margin)rect.considerMargin(elem);return rect}));return must_seperate?ret[0]:ret};vjs.scrollSize=function(element){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>({width:elem?.scrollWidth,height:elem?.scrollHeight})));return must_seperate?ret[0]:ret};vjs.size=function(element){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map((elem=>{const sz=vjs.innerSize(elem);if(window==elem)return sz;const{paddingTop,paddingBottom,paddingLeft,paddingRight}=vjs.style(elem,{paddingTop:undefined,paddingBottom:undefined,paddingLeft:undefined,paddingRight:undefined});return{width:sz.width-Number.parseFloat(paddingLeft)-Number.parseFloat(paddingRight),height:sz.height-Number.parseFloat(paddingBottom)-Number.parseFloat(paddingTop)}}));return must_seperate?ret[0]:ret};vjs.hasScrollBar=function(element){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const size=vjs.size(element);const ret=vjs.scrollSize(element).map(((scroll_sz,idx)=>({horizontal:scroll_sz.width>size[idx].width,vertical:scroll_sz.height>size[idx].height})));return must_seperate?ret[0]:ret};const cacheName=`__kh_data`;vjs.data1=function(element,prop,newVal){const acceptData=elem=>1===elem.nodeType||9===elem.nodeType||!("nodeType"in elem);if(kh_js.isEmpty(prop)||!kh_js.isValid(element)||!acceptData(element))return undefined;prop=kh_js.toKebabCase(prop);let cache=element[cacheName];if(!kh_js.isValid(cache)){if(kh_js.isValid(element.nodeType))element[cacheName]=new Map;else{Object.defineProperty(element,cacheName,{value:new Map,configurable:true})}cache=element[cacheName]}if(undefined===newVal||"undefined"===newVal)return cache.get(prop)??(!element[cacheName].has(`${prop}-forbid-data-attribute`)?element.getAttribute?.(`data-${prop}`):undefined);else if(null===newVal||"null"===newVal){cache.set(`${prop}-forbid-data-attribute`,true);return cache.delete(prop)}else return cache.set(prop,newVal)};vjs.data=function(element,prop,newVal){if(!kh_js.isValid(element))return undefined;if(!kh_js.isValid(prop)&&!kh_js.isValid(newVal)){const must_seperate=test_seperate(element);element=vjs(element);const data=element.map((elem=>Object.fromEntries(elem[cacheName]??[])));return must_seperate?data[0]:data}return handle_props(element,prop,newVal,"data1")};if(true!=ms["jQ_data_overrided"]&&(kh_global.jQuery||kh_global.$)){const ori_data=(kh_global.jQuery||kh_global.$).prototype.data;(kh_global.jQuery||kh_global.$).prototype.data=function(prop,newData){if(!kh_js.isValid(newData)){return vjs.data(this.get(0),prop)??ori_data.apply(this,arguments)}else{vjs.data(vjs(this),...arguments);return ori_data.apply(this,arguments)}};ms["jQ_data_overrided"]=true}vjs.attr1=function(element,prop,newVal){const acceptAttribute=elem=>1===elem.nodeType||9===elem.nodeType||window==element;if(kh_js.isEmpty(prop)||!kh_js.isValid(element)||!acceptAttribute(element))return undefined;prop=kh_js.toKebabCase(prop);if(1===element.nodeType){if("style"==prop)return vjs.style(element,newVal);if("data"==prop)return vjs.data(element,newVal);if("class"==prop&&kh_js.isPlainObject(newVal))return vjs.class(element,newVal);if(undefined===newVal||"undefined"===newVal)return element.getAttribute(prop);else if(null===newVal||"null"===newVal)return element.removeAttribute(prop);else return element.setAttribute(prop,newVal.toString())}else return vjs.data1(element,prop,newVal)};vjs.attr=function(element,prop,newVal){return handle_props(element,prop,newVal,"attr1")};vjs.class1=function(element,className,newVal){const acceptData=elem=>1===elem.nodeType||9===elem.nodeType;if(kh_js.isEmpty(className)||!kh_js.isValid(element)||!acceptData(element))return undefined;if(undefined===newVal||"undefined"===newVal)return element.classList.contains(className);else if(null===newVal||"null"===newVal)return element.classList.remove(className);else return element.classList.add(className)};vjs.class=function(element,className,newVal){return handle_props(element,className,newVal,"class1")};vjs.contains=function(element,text){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element)||kh_js.isEmpty(text))return undefined;const xpath=`//*[contains(., '${text}')]`;const ret=element.map((elem=>{const res=document.evaluate(xpath,elem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);if(-1==[XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,XPathResult.ORDERED_NODE_ITERATOR_TYPE].indexOf(res.resultType))return[];const nextNode=function*(xpathRes){if(-1!=[XPathResult.UNORDERED_NODE_ITERATOR_TYPE,XPathResult.ORDERED_NODE_ITERATOR_TYPE].indexOf(xpathRes.resultType)){let val;while(val=xpathRes.iterateNext())yield val}else{for(let idx=0;idx<xpathRes.snapshotLength;++idx)yield xpathRes.snapshotItem(idx)}};const nodes=[...nextNode(res)];if(kh_js.isEmpty(nodes))return[];for(let i=0;i<nodes.length-1;++i){const cur_node=nodes[i];const own_text_node_with_text=-1!=[...cur_node.childNodes.values()].findIndex((cN=>"#text"===cN.nodeName&&-1!=cN.nodeValue.indexOf(text)));if(!own_text_node_with_text){for(let j=i+1;j<nodes.length;++j){if(cur_node.contains(nodes[j])){nodes.splice(i,1);--i;break}}}}return nodes}));return must_seperate?ret[0]:ret};vjs.isOnScreen=function(element,partial_ok=true){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const width=window.innerWidth||document.documentElement.clientWidth;const height=window.innerHeight||document.documentElement.clientHeight;const detail="detail"===partial_ok;const ret=element.map((elem=>{const rect=elem.getBoundingClientRect();if(!detail){return 0<rect.height&&0<rect.width&&(partial_ok?(0<=rect.left||width>rect.right)&&(0<=rect.top||height>=rect.bottom):0<=rect.top&&0<=rect.left&&height>=rect.bottom&&width>=rect.right)}else{return{vertical:0<rect.height&&0<=rect.top&&height>=rect.bottom,horizontal:0<rect.width&&0<=rect.left&&width>=rect.right}}}));return must_seperate?ret[0]:ret};vjs.isVisible=function(element,opacity_check=false){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const elem_styles=vjs.style(element,{position:undefined,display:undefined,opacity:undefined});const elem_rects=vjs.boundingRect(element);const ret=element.map(((elem,idx)=>{if("function"==typeof elem.checkVisibility)return elem.checkVisibility({opacityProperty:opacity_check});const{position,display,opacity}=must_seperate?elem_styles:elem_styles[idx];const rect=must_seperate?elem_rects:elem_rects[idx];if(!kh_js.isValid(elem.offsetParent)&&"fixed"!=position)return false;if(0==rect.height&&0==rect.width)return false;if("none"==display)return false;if(opacity_check&&0==opacity)return false;if(0==elem.getClientRects().length)return false;return true}));return must_seperate?ret[0]:ret};vjs.nextAll=function(element,selector,next="nextElementSibling"){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map(((elem,idx)=>{let nextSiblings=[];for(let nextSibling=elem[next];nextSibling;nextSibling=nextSibling[next]){if(kh_js.isEmpty(selector)||"function"==typeof selector&&selector(nextSibling))nextSiblings.push(nextSibling);else if(kh_js.isString(selector)){if(Node.ELEMENT_NODE==nextSibling.nodeType&&nextSibling.matches(selector))nextSiblings.push(nextSibling)}}return nextSiblings}));return must_seperate?ret[0]:ret};vjs.nextUntil=function(element,selector,next="nextElementSibling",include_match=false){if(kh_js.isEmpty(selector))return vjs.nextAll(element,undefined,next);const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map(((elem,idx)=>{let nextSiblings=[];const is_selector_function="function"==typeof selector;for(let nextSibling=elem[next];nextSibling;nextSibling=nextSibling[next]){if(!is_selector_function&&Node.ELEMENT_NODE!==nextSibling.nodeType)continue;const match=is_selector_function?selector(nextSibling):nextSibling.matches(selector);if(!match||include_match)nextSiblings.push(nextSibling);if(match)break}return nextSiblings}));return must_seperate?ret[0]:ret};vjs.nextOne=function(element,selector,next="nextElementSibling"){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const ret=element.map(((elem,idx)=>{let nextSiblingOne=undefined;let nextSibling=elem[next];while(kh_js.isValid(nextSibling)&&!kh_js.isValid(nextSiblingOne)){if(kh_js.isEmpty(selector)||"function"==typeof selector&&selector(nextSibling))nextSiblingOne=nextSibling;else if(kh_js.isString(selector)){if(Node.ELEMENT_NODE==nextSibling.nodeType&&nextSibling.matches(selector))nextSiblingOne=nextSibling}nextSibling=nextSibling[next]}return nextSiblingOne}));return must_seperate?ret[0]:ret};vjs.commonParent=function(element,...elements){if(!kh_js.isValid(element))return undefined;elements=elements.filter(kh_js.isValid);if(kh_js.isEmpty(elements))return undefined;function test(cur){let i=elements.length;while(i--){if(!cur.contains(elements[i]))return false}return true}do{if(test(element))return element}while(element=element.parentNode);return undefined};function all_parents(elem){if(!kh_js.isValid(elem))return undefined;const ret=[];while((elem=elem.parentNode)&&document!==elem){ret.push(elem)}return ret}vjs.parents=function(element,selector,only_direct=false){element=vjs(element);if(kh_js.isEmpty(element))return undefined;let parents=element.map((elem=>true!=only_direct?all_parents(elem):elem.parentNode));parents=kh_js.make_unique(parents.flat());return!kh_js.isEmpty(selector)?parents.filter((parent=>parent.matches(selector))):parents};vjs.isParent=function(element,parents,strict=false){element=vjs(element);if(kh_js.isEmpty(element))return false;parents=vjs(parents);if(kh_js.isEmpty(parents))return false;const element_parents=vjs.parents(element);if(1==element.length||!strict){for(let ep of element_parents)if(-1!=parents.indexOf(ep))return true;return false}else{for(let ep of element_parents)if(-1==parents.indexOf(ep))return false;return true}};vjs.index=function(element,selector,incl_textNodes=false){const must_seperate=test_seperate(element);element=vjs(element);if(kh_js.isEmpty(element))return undefined;const childs=p=>!incl_textNodes?[...p?.children??[]]:[...p?.childNodes.values()??[]];if(!kh_js.isValid(selector)){const ret=element.map((elem=>{const parent=elem.parentNode;return childs(parent).indexOf(elem)}));return must_seperate?ret[0]:ret}else{if(1!=element.length)return-1;element=element[0];const elems=kh_js.isString(selector)?vjs(element,selector,true):kh_js.isDOMElement(selector)?selector:vjs(selector);if(kh_js.isEmpty(elems))return-1;const must_seperate_real=1==elems.length;const children=childs(element);const ret=elems.map((elem=>children.indexOf(elem)));return must_seperate_real?ret[0]:ret}};vjs.create=function(tagName,attributes,element,options){if(kh_js.isEmpty(tagName))return undefined;const must_seperate=test_seperate(element)||!kh_js.isValid(element);const parents=vjs(element)??[...new Array(1)].map(((_,idx)=>undefined));const nodes=parents.map((parent=>{const node=document.createElement(tagName,options);if(!kh_js.isEmpty(attributes?.text)){node.textContent=attributes.text;delete attributes.text}if(!kh_js.isEmpty(attributes?.content)){vjs.setContent(node,attributes.content);delete attributes.content}if(!kh_js.isEmpty(attributes))vjs.attr(node,attributes);if(kh_js.isValid(parent))parent.append(node);return node}));return must_seperate?nodes[0]:nodes};vjs.div=(attributes,element,options)=>vjs.create("div",attributes,element,options);vjs.p=(attributes,element,options)=>vjs.create("p",attributes,element,options);vjs.a=(attributes,element,options)=>vjs.create("a",attributes,element,options);vjs.setContent=function(elem,content="",clean_data=false){vjs.empty(elem);if(clean_data)delete elem[cacheName];if(kh_js.isNumber(content))content=content.toString();if(kh_js.isString(content)){try{elem.insertAdjacentHTML("beforeend",content)}catch(error){elem.insertAdjacentText("beforeend",content)}}else{content=vjs(content);elem.append(...content)}};vjs.getIFrameAbove=function(elem){elem=vjs(elem)?.[0];if(!kh_js.isValid(elem))return undefined;if(window.parent.document===elem.ownerDocument)return undefined;const all_iframes=vjs(window.parent.document,"iframe",true);return all_iframes?.filter((frame=>kh_js.isValid(frame.contentDocument?.body)&&frame.contentDocument?.contains(elem)))?.[0]};Object.assign(cs,{vjs});kh_global.LoadedScripts?.get(mf).resolve(ms);