import numbro from 'numbro';
import moment from 'moment';

export const formatXksAmount = (amount, digits = 2, round = false) => {
	if (amount === 0) return '0.00';
	if (!amount) return '-';

	return numbro(amount).format({
		average: round,
		mantissa: amount > 1000 ? 2 : digits,
		abbreviations: {
			million: 'M',
			billion: 'B'
		}
	});
};

export function checkIfNewBlock(prevBlock, newBlock) {
	if (prevBlock.height < newBlock.height) {
		return true;
	}
}

export const calcTime = (ms) => {
	const s = ('0' + Math.floor((ms / 1000) % 60)).substr(-2);
	const m = ('0' + Math.floor((ms / (60 * 1000)) % 60)).substr(-2);
	return m + ':' + s;
};

export function prettifyHashrate(value, decimal) {
	var kilo = 1000,
		mega = 1000000,
		giga = 1000000000,
		tera = 1000000000000;

	if (value < kilo) return String(value.toFixed(decimal) + ' H/s');
	if (value >= kilo && value <= mega) return (value / kilo).toFixed(decimal) + ' KH/s';
	if (value >= mega && value <= giga) return (value / mega).toFixed(decimal) + ' MH/s';
	if (value >= giga && value <= tera) return (value / giga).toFixed(decimal) + ' GH/s';
	else return (value / tera).toFixed(decimal) + ' TH/s';
}

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function timeConvert(timestamp) {
	return moment(timestamp * 1000).format('lll');
}

export function localizeNumber(number) {
	let numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.
	return numberFormatter.format(number);
}

export function getReadableHashRateString(hashrate) {
	var i = 0;
	var byteUnits = [' H', ' kH', ' MH', ' GH', ' TH', ' PH', ' EH', ' ZH', ' YH'];
	while (hashrate > 1000) {
		hashrate = hashrate / 1000;
		i++;
	}
	return localizeNumber(hashrate.toFixed(2)) + byteUnits[i];
}

export function getReadableDifficultyString(difficulty, precision) {
	if (isNaN(parseFloat(difficulty)) || !isFinite(difficulty)) return 0;
	if (typeof precision === 'undefined') precision = 0;
	var units = ['', 'k', 'M', 'G', 'T', 'P'],
		number = Math.floor(Math.log(difficulty) / Math.log(1000));
	if (units[number] === undefined || units[number] === null) {
		return 0;
	}
	return (
		localizeNumber((difficulty / Math.pow(1000, Math.floor(number))).toFixed(precision)) +
		' ' +
		units[number]
	);
}
