/** 
  @copyright Copyright (C) 2014 coord.cn All rights reserved. 
  @overview JsonML.js
  @author QianYe(coordcn@163.com)
  @reference http://www.jsonml.org/
             https://github.com/trevnorris/jqml
             https://github.com/evilstreak/markdown-js
 */

function isType(type){
  return function(obj){
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}
  
var isObject = isType('Object');
var isString = isType('String');
var isNumber = isType('Number');
var isArray = Array.isArray || isType('Array');
var isFunction = isType('Function');
var isBoolean = isType('Boolean');
  
function escapeHtml(text){
  if(!text) return '';
    
  return String(text).replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#39;');
}

function html(jsonml, data, flag){
  if(isString(jsonml) || isNumber(jsonml)){       
    return flag ? jsonml : escapeHtml(jsonml);
  }
    
  if(isFunction(jsonml)){
    var res = jsonml(data);
    if(!res) return '';
    var entity = res.entity ? res.entity : res;
      
    return html(entity, data, res.flag);
  }
    
  if(isArray(jsonml) && jsonml.length){
    var length = jsonml.length;
    var tag = jsonml[0];
    var start = 0;
    var content = [];
    var attributes = null;
      
    if(isArray(tag) || isFunction(tag)){ // [function(){}, [a, {href:'http://www.coord.cn'}, 'COORD'],['div', 'QianYe']]
      tag = ''; 
    }else if(isString(tag)){ // ['div', [a, {href:'http://www.coord.cn'}, 'COORD'],['div', 'QianYe']]
      switch(tag){
        case '':
        case 'document':
        case 'doctype': // no attributes
          start = 1;
          break;
        default:
          start = 1;
          if(length > 1 && isObject(jsonml[1]) && !isArray(jsonml[1])){
            attributes = jsonml[1];
            start = 2;
          }
          break;
      }
    }else{
      return '';
    }
      
    for(var i = start; i < length; i++){
      content.push(html(jsonml[i], data));
    }
      
    var attrs = '';
    if(attributes){
      for(var name in attributes){
        if(attributes.hasOwnProperty(name)){
          var value = attributes[name];
          var escaped = '';
          if(isString(value)){
            escaped = escapeHtml(value);
          }else if(isFunction(value)){
            var val = value(data);
            if(val){
              var v = val.entity ? val.entity : val;
              if(val.flag) escaped = v;
              escaped = escapeHtml(v);
            }
          }
        
          if(escaped){
            attrs += ' ' + name + '="' + escaped + '"'; // <div class="css"></div>
          }else{
            attrs += '' + name; // <input type="text" required>
          }
        }
      }
    }
      
    switch(tag){
      case '':
      case 'document':
        return content.join('');
      case 'doctype':
        return '<!DOCTYPE html>' + content.join('');
      case 'base':
      case 'link':
      case 'meta':
      case 'hr':
      case 'br':
      case 'wbr':
      case 'img':
      case 'embed':
      case 'param':
      case 'source':
      case 'track':
      case 'area':
      case 'option':
      case 'input':
        return '<' + tag + attrs + '>';
      default:
        return '<' + tag + attrs + '>' + content.join('') + '</' + tag + '>';
    }
  }
    
  return '';
}

exports.html = html;