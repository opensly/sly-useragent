/**
 * Utility method to detect the user's browser
 * @returns 
 */
function detectBrowser() {
  let ua = window.navigator.userAgent;
  if (ua.indexOf('Edg') > -1) {
    let M = ua.match(/(Edg)\/?\s*(\.?\d+(\.\d+)*)/i);
    return 'Edge '+ M[2];
  } else if (ua.indexOf('OPR') > -1) {
    let M = ua.match(/(OPR)\/?\s*(\.?\d+(\.\d+)*)/i);
    return 'Opera '+ M[2];
  } else {
    let tem;
    let M = ua.match(/(chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M = M? [M[1], M[2]]: [window.navigator.appName, window.navigator.appVersion, '-?'];
    return M[0]+' '+M[1];
  }
}

/**
 * Utility method to detect the user's operating system
 * @returns 
 */
function detectOs() {
  let userAgt = navigator.userAgent;
  let os = '';
  let version;
  let regOsVersion;
  let osMap = [
    { s : 'Windows', r:/(Windows 10.0|Windows NT 10.0|Windows 8.1|Windows NT 6.3|Windows 8|Windows NT 6.2|Windows 7|Windows NT 6.1)/},
    { s : 'Linux', r:/(Linux|X11(?!.*CrOS))/},
    { s : 'Mac OS X', r:/Mac OS X/},
    { s : 'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/}
  ];
  for (let id in osMap) {
    let cs = osMap[id];
    if (cs.r.test(userAgt)) {
      os = cs.s;
      regOsVersion = cs.r;
      break;
    }
  }
  switch(os) {
    case 'Windows':
      if (regOsVersion.exec(userAgt)[0].indexOf('NT 10.0') || regOsVersion.exec(userAgt)[0].indexOf('10.0') ) {
        version = '10';
      } else if (regOsVersion.exec(userAgt)[0].indexOf('8.1') || regOsVersion.exec(userAgt)[0].indexOf('NT 6.3')) {
        version = '8.1';
      } else if (regOsVersion.exec(userAgt)[0].indexOf('8') || regOsVersion.exec(userAgt)[0].indexOf('NT 6.2')) {
        version = '8';
      } else if (regOsVersion.exec(userAgt)[0].indexOf('7') || regOsVersion.exec(userAgt)[0].indexOf('NT 6.1')) {
        version = '7';
      }
      break;
    case 'Mac OS X':
      version = userAgt.split('Mac OS X ')[1].split(')')[0];
      version = version.split(';')[0].replace(/_/g, '.');
      break;
    case 'Mac OS':
      version = '';
      break;
    case 'Linux':
      version = '';
      break;
  }
  return os + ' ' + version;
}