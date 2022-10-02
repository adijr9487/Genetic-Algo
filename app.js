import pick from 'pick-random-weighted';

const colors = [
	['Red', 30],
	['Green', 20],
	['Blue', 40]
];
const color = pick(colors);
console.log(color)
