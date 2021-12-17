const dayjs = require('dayjs');

exports.getObjectFromData = (data) => {
	const params = data.toString().split('&');
	const obj = params.reduce((acc, param) => {
		let [key, value] = param.split('=');
		if (key === 'nb1' || key === 'nb2') value = Number(value);
		if (value === 'add') value = '+';
		if (value === 'divide') value = '/';
		return { ...acc, [key]: value };
	}, {});
	return { ...obj, date: dayjs().format('DD/MM/YYYY') };
};

exports.calculate = (nb1, nb2, operator) => {
	switch (operator) {
		case '+':
			return nb1 + nb2;
		case '-':
			return nb1 - nb2;
		case '*':
			return nb1 * nb2;
		case '/':
			return nb1 / nb2;
	}
};
