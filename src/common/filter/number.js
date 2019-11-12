export function twoDigital(num) {

	if (num) {
		if (parseInt(num) === num) {
			return num;
		} else {
			return num.toFixed(2);
		}
	} else {
		return num;
	}

}

export function toFixed(number, precision) {
  let times = Math.pow(10, precision);
  let des = number * times + 0.5;
  des = parseInt(des, 10) / times;
  return String(des);
}
