const userData = {
	'USD': 1000,
	'EUR': 900,
	'UAH': 15000,
	'BIF': 20000,
	'AOA': 100
};

const bankData = {
	'USD': { max: 3000, min: 100, img: '💵' },
	'EUR': { max: 1000, min: 50, img: '💶' },
	'UAH': { max: 0, min: 0, img: '💴' },
	'GBP': { max: 10000, min: 100, img: '💷' }
};

function getMoney(userData, bankData) {
	return new Promise((resolve, reject) => {
		const userResponse = confirm('Посмотреть баланс карты?');
		userResponse ? resolve(userData) : reject({ userData, bankData });
	});
}

getMoney(userData, bankData)
	.then(userData => {
		let currency;
		do {
			currency = prompt('Введите валюту в формате USD, EUR, UAH, BIF, AOA', 'USD');
		} while (!(currency in userData));

		console.log(`Баланс: ${userData[currency]} ${currency}`);
	})
	.catch(({ userData, bankData }) => {
		let currency;
		do {
			currency = prompt('Введите валюту в формате USD, EUR, UAH, BIF, AOA', 'USD');
		} while (!(currency in userData) || !(currency in bankData));

		const amount = prompt('Введите сумму', '100');
		if (amount > bankData[currency].max) {
			console.log(`Введенная сумма больше разрешенного максимума. Максимальная сумма снятия: ${bankData[currency].max}`);
		} else if (amount < bankData[currency].min) {
			console.log(`Введенная сумма меньше разрешенного минимума. Минимальная сумма снятия: ${bankData[currency].min}`);
		} else {
			console.log(`*ЖЖЖжжж* Вот ваши денешки ${amount} ${currency} ${bankData[currency].img}`);
			userData[currency] -= amount;
		}
	})
	.finally(() => {
		console.log('Спасибо, хорошего дня 😊');
	});
