//check whether an obj is number.
export function isInteger(obj) {
	return typeof obj === 'number' && obj % 1 === 0
}

export function isAndroid() {
	let u = navigator.memberAgent;


	//android终端
	return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

}

export function isIOS() {
	let u = navigator.memberAgent;

	//ios终端
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}


//check whether an obj is empty
export function isEmptyObject(obj) {

	for (let key in obj) {
		return false;
	}
	return true
}


//两个id是否相等
export function isIdEqual(id1, id2) {

	return (id1 + "") === (id2 + "");


}

export function isLocalStorageNameSupported() {
	let testKey = 'test';
	let storage = window.localStorage;
	try {
		storage.setItem(testKey, '1');
		storage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
}


export function readLocalStorage(key) {
  return window.localStorage[key];
}

export function saveToLocalStorage(key, content) {
  window.localStorage[key] = content;
}

export function removeLocalStorage(key) {
  window.localStorage.removeItem(key);
}


//获取一个function的名字
export function functionName(func) {
  // Match:
  // - ^          the beginning of the string
  // - function   the word 'function'
  // - \s+        at least some white space
  // - ([\w\$]+)  capture one or more valid JavaScript identifier characters
  // - \s*        optionally followed by white space (in theory there won't be any here,
  //              so if performance is an issue this can be omitted[1]
  // - \(         followed by an opening brace
  //
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString())

  return result ? result[1] : '' // for an anonymous function there won't be a match
}

/**
 * 生成随机字符串
 * @param n
 * @returns {string}
 */
export function generateId(n) {
  let result = "";
  for(let i = 0; i < n; i++){
    let ranNum = Math.ceil(Math.random() * 25);
    result += (String.fromCharCode(97 + ranNum));
  }
  return result;
}
