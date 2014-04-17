/*
 RequireJS text 2.0.10 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/requirejs/text for details
*/
define(["module"],function(q){var f,r,k,l,s,t=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],u=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,v=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,m="undefined"!==typeof location&&location.href,w=m&&location.protocol&&location.protocol.replace(/\:/,""),x=m&&location.hostname,y=m&&(location.port||void 0),p={},g=q.config&&q.config()||{};f={version:"2.0.10",strip:function(b){if(b){b=b.replace(u,"");var e=b.match(v);e&&(b=e[1])}else b="";return b},
jsEscape:function(b){return b.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:g.createXhr||function(){var b,e,d;if("undefined"!==typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!==typeof ActiveXObject)for(e=0;3>e;e+=1){d=t[e];try{b=new ActiveXObject(d)}catch(c){}if(b){t=[d];break}}return b},parseName:function(b){var e,
d,c=!1,a=b.indexOf(".");e=0===b.indexOf("./")||0===b.indexOf("../");-1!==a&&(!e||1<a)?(e=b.substring(0,a),d=b.substring(a+1,b.length)):e=b;b=d||e;a=b.indexOf("!");-1!==a&&(c="strip"===b.substring(a+1),b=b.substring(0,a),d?d=b:e=b);return{moduleName:e,ext:d,strip:c}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(b,e,d,c){var a,h;a=f.xdRegExp.exec(b);if(!a)return!0;b=a[2];a=a[3];a=a.split(":");h=a[1];a=a[0];return(!b||b===e)&&(!a||a.toLowerCase()===d.toLowerCase())&&(!h&&!a||h===c)},finishLoad:function(b,
e,d,c){d=e?f.strip(d):d;g.isBuild&&(p[b]=d);c(d)},load:function(b,e,d,c){if(c.isBuild&&!c.inlineText)d();else{g.isBuild=c.isBuild;var a=f.parseName(b);c=a.moduleName+(a.ext?"."+a.ext:"");var h=e.toUrl(c),n=g.useXhr||f.useXhr;0===h.indexOf("empty:")?d():!m||n(h,w,x,y)?f.get(h,function(c){f.finishLoad(b,a.strip,c,d)},function(a){d.error&&d.error(a)}):e([c],function(b){f.finishLoad(a.moduleName+"."+a.ext,a.strip,b,d)})}},write:function(b,e,d,c){p.hasOwnProperty(e)&&(c=f.jsEscape(p[e]),d.asModule(b+"!"+
e,"define(function () { return '"+c+"';});\n"))},writeFile:function(b,e,d,c,a){e=f.parseName(e);var h=e.ext?"."+e.ext:"",n=e.moduleName+h,g=d.toUrl(e.moduleName+h)+".js";f.load(n,d,function(d){d=function(a){return c(g,a)};d.asModule=function(a,b){return c.asModule(a,g,b)};f.write(b,n,d,a)},a)}};if("node"===g.env||!g.env&&"undefined"!==typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"])r=require.nodeRequire("fs"),f.get=function(b,e,d){try{var c=r.readFileSync(b,
"utf8");0===c.indexOf("\ufeff")&&(c=c.substring(1));e(c)}catch(a){d(a)}};else if("xhr"===g.env||!g.env&&f.createXhr())f.get=function(b,e,d,c){var a=f.createXhr(),h;a.open("GET",b,!0);if(c)for(h in c)c.hasOwnProperty(h)&&a.setRequestHeader(h.toLowerCase(),c[h]);if(g.onXhr)g.onXhr(a,b);a.onreadystatechange=function(c){if(4===a.readyState&&(c=a.status,399<c&&600>c?(c=Error(b+" HTTP status: "+c),c.xhr=a,d(c)):e(a.responseText),g.onXhrComplete))g.onXhrComplete(a,b)};a.send(null)};else if("rhino"===g.env||
!g.env&&"undefined"!==typeof Packages&&"undefined"!==typeof java)f.get=function(b,e){var d,c,a=new java.io.File(b),h=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a),"utf-8")),f="";try{d=new java.lang.StringBuffer;(c=a.readLine())&&c.length()&&65279===c.charAt(0)&&(c=c.substring(1));for(null!==c&&d.append(c);null!==(c=a.readLine());)d.append(h),d.append(c);f=String(d.toString())}finally{a.close()}e(f)};else if("xpconnect"===
g.env||!g.env&&"undefined"!==typeof Components&&Components.classes&&Components.interfaces)k=Components.classes,l=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in k,f.get=function(b,e){var d,c,a,f={};s&&(b=b.replace(/\//g,"\\"));a=new FileUtils.File(b);try{d=k["@mozilla.org/network/file-input-stream;1"].createInstance(l.nsIFileInputStream),d.init(a,1,0,!1),c=k["@mozilla.org/intl/converter-input-stream;1"].createInstance(l.nsIConverterInputStream),
c.init(d,"utf-8",d.available(),l.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),c.readString(d.available(),f),c.close(),d.close(),e(f.value)}catch(g){throw Error((a&&a.path||"")+": "+g);}};return f});
