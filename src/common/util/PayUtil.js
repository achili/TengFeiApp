//支付工具类
import md5 from 'js-md5';
import urlencode from 'urlencode';

export function getPayParamsText(obj, MD5key) {
  // for(let i in obj) {
  //   console.log(i);
  // }
  let paramsText = "";
  let keys = Object.keys(obj);
  keys.sort();
  keys.forEach(key => {
    let str = "";
    if(obj[key] instanceof Array) {
      str = JSON.stringify(obj[key]);
    } else if(obj[key] instanceof Object) {
      str = JSON.stringify(obj[key]);
      console.log(str);
    } else {
      str = obj[key];
    }
    paramsText += key + "=" + str + "&";
  });
  paramsText = paramsText.substring(0, paramsText.length - 1);
  let signSource = paramsText + MD5key;
  console.log("签名前字段:", signSource);

  paramsText = "";
  keys.forEach(key => {
    let str = "";
    if(obj[key] instanceof Array) {
      str = JSON.stringify(obj[key]);
    } else if(obj[key] instanceof Object) {
      str = JSON.stringify(obj[key]);
      console.log(str);
    } else {
      str = obj[key];
    }
    if(obj[key] instanceof Array) {
      paramsText += key + "=" + urlencode(str) + "&";
    } else {
      paramsText += key + "=" + str + "&";
    }

  });
  paramsText = paramsText.substring(0, paramsText.length - 1);
  //生成签名：
  let sign = md5(signSource);
  console.log("签名:", sign);
  paramsText += "&sign=" + sign;
  // paramsText = urlencode(paramsText);
  console.log(paramsText);
  return paramsText;
}
