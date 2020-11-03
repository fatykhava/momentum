//DOM elements
const time = document.querySelector('.time'),
	wholeDate = document.querySelector('.day'),
	greeting = document.querySelector('.greeting'),
	name = document.querySelector('.name'),
	focus = document.querySelector('.focus'),
	base = './assets/images/',
	btnUpdateBg = document.querySelector('.btn-update'),
	weatherIcon = document.querySelector('.weather-icon'),
	temperature = document.querySelector('.temperature'),
	weatherHumidity = document.querySelector('.weather-humidity'),
	weatherWind = document.querySelector('.weather-wind'),
	weatherDescription = document.querySelector('.weather-description'),
	city = document.querySelector('.city'),
	blockquote = document.querySelector('blockquote'),
	figcaption = document.querySelector('figcaption'),
	btnQuoteUpdate = document.querySelector('.btn-quote');

let memoryName,
	memoryFocus,
	partOfDay,
	i = 1,
	dayFirst = true,
	arrImage = [];

// ShowTime

function showTime() {
	let dateToday = new Date(),
		month = dateToday.getMonth(),
		day = dateToday.getDate(),
		dayOfTheWeek = dateToday.getDay(),
		hours = dateToday.getHours(),
		min = dateToday.getMinutes(),
		sec = dateToday.getSeconds();

	time.innerHTML = `${hours}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

	wholeDate.innerHTML = `${getWeekDay(dayOfTheWeek)}<span>, </span>${day}` + ' ' + `${getMonth(month)}`;

	setTimeout(showTime, 1000);
}

//Get Week Day
function getWeekDay(m) {
	switch (m) {
		case 1: return 'Monday';
		case 2: return 'Tuesday';
		case 3: return 'Wensday';
		case 4: return 'Thuersday';
		case 5: return 'Friday';
		case 6: return 'Saturday';
		default: return 'Sunday';
	}
}

//Get Month
function getMonth(p) {
	switch (p) {
		case 0: return 'january';
		case 1: return 'febriary';
		case 2: return 'marth';
		case 3: return 'april';
		case 4: return 'may';
		case 5: return 'june';
		case 6: return 'july';
		case 7: return 'august';
		case 8: return 'september';
		case 9: return 'october';
		case 10: return 'november';
		default: return 'december';
	}
}

//AddZero
function addZero(n) {
	return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//randomArr
function randomArr() {
	for (let i = 0; i < 6; i++) {
		arrImage.push(getRandomInt(12));
	}
}

const getRandomInt = (max) => {
	let number = Math.floor(Math.random() * Math.floor(max)) + 1;
	return number < 10 ? `0${number}` : number;
}

// change BG and Greetings
function changeBgAndGreeting() {
	let today = new Date(),
		hours = today.getHours(),
		src,
		img = document.createElement('img');

	if (hours < 6) {
		greeting.innerHTML = 'Good Night, ';
		document.body.classList.add('night');
		partOfDay = 'night';
		i = hours % 6;
		src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
		img.src = src;
		img.onload = () => {
			document.body.style.backgroundImage = `url(${src})`;
		};
	}
	else if (hours < 12) {
		greeting.innerHTML = 'Good Morning, ';
		document.body.classList.remove('night');
		partOfDay = 'morning';
		i = hours % 6;
		src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
		img.src = src;
		img.onload = () => {
			document.body.style.backgroundImage = `url(${src})`;
		};
	}
	else if (hours < 18) {
		greeting.innerHTML = 'Good Afternoon, ';
		document.body.classList.remove('night');
		partOfDay = 'day';
		i = hours % 6;
		src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
		img.src = src;
		img.onload = () => {
			document.body.style.backgroundImage = `url(${src})`;
		};
	}
	else {
		greeting.innerHTML = 'Good Evening, ';
		document.body.classList.add('night');
		partOfDay = 'evening';
		i = hours % 6;
		src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
		img.src = src;
		img.onload = () => {
			document.body.style.backgroundImage = `url(${src})`;
		};
	}

	setTimeout(changeBgAndGreeting, 300000);
}

function getImage() {
	let src,
		img = document.createElement('img');

	if (i === 5) {
		if (partOfDay === 'day') {
			partOfDay = 'evening';
			i = 0;
			src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
			img.src = src;
			img.onload = () => {
				document.body.style.backgroundImage = `url(${src})`;
			};
		}
		else if (partOfDay === 'evening') {
			partOfDay = 'night';
			i = 0;
			src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
			img.src = src;
			img.onload = () => {
				document.body.style.backgroundImage = `url(${src})`;
			};
		}
		else if (partOfDay === 'night') {
			partOfDay = 'morning';
			i = 0;
			src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
			img.src = src;
			img.onload = () => {
				document.body.style.backgroundImage = `url(${src})`;
			};
		}
		else if (partOfDay === 'morning') {
			partOfDay = 'day';
			i = 0;
			src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
			img.src = src;
			img.onload = () => {
				document.body.style.backgroundImage = `url(${src})`;
			};
		}
	}
	else {
		i++;
		src = `${base}${partOfDay}/${arrImage[i]}.jpg`;
		img.src = src;
		img.onload = () => {
			document.body.style.backgroundImage = `url(${src})`;
		};
	}
}

//check time 
function checkTime() {
	let today = new Date();
	sec = today.getSeconds();
	min = today.getMinutes();
	if (min === 59 && sec === 59) {
		changeBgAndGreeting();
	}

	setTimeout(checkTime, 1000);
}

//Get Name
function getName() {
	if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
		name.textContent = '[Enter name]';
	}
	else {
		name.textContent = localStorage.getItem('name');
	}
}

//Set Name
function setName(e) {
	if (e.type === 'keypress') {
		//make sure enter is pressed
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('name', e.target.innerText);
			name.blur();
		}
	}
	else {
		localStorage.setItem('name', e.target.innerText);
	}
}

//Get Focus
function getFocus() {
	if (localStorage.getItem('focus') === null || localStorage.getItem('name') === '') {
		focus.textContent = '[Enter focus]';
	}
	else {
		focus.textContent = localStorage.getItem('focus');
	}
}

//Set Focus
function setFocus(e) {
	if (e.type === 'keypress') {
		//make sure enter is pressed
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('focus', e.target.innerText);
			focus.blur();
		}
	}
	else {
		localStorage.setItem('focus', e.target.innerText);
	}
}

name.onfocus = function () {
	memoryName = name.innerHTML;
	name.textContent = '';
}

name.onblur = function () {
	if (name.innerHTML === '') {
		name.textContent = memoryName;
	}
}

focus.onfocus = function () {
	memoryFocus = focus.innerHTML;
	focus.textContent = '';
}

focus.onblur = function () {
	if (focus.innerHTML === '') {
		focus.textContent = memoryFocus;
	}
}

//Weather 
async function getWeather() {
	try {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=7855be89de72b6ea0540164aea4c0922&units=metric`;
		const res = await fetch(url);
		const data = await res.json();

		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent = Math.round(data.main.temp) + '°C';
		weatherDescription.textContent = data.weather[0].description;
		weatherHumidity.textContent = 'Humidity: ' + data.main.humidity + ' %';
		weatherWind.textContent = 'Wind: ' + data.wind.speed + ' km/h';
	} catch (err) {
		city.textContent = 'Error: City not found';
		weatherDescription.textContent = '';
		temperature.textContent = '';
		weatherHumidity.textContent = '';
		weatherWind.textContent = '';
	}
}

//Get City
function getCity() {
	if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
		city.textContent = '[Enter name]';
	}
	else {
		city.textContent = localStorage.getItem('city');
	}
}

function setCity(e) {
	if (e.type === 'keypress') {
		//make sure enter is pressed
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('city', e.target.innerText);
			getWeather();
			city.blur();
		}
	}

	else {
		localStorage.setItem('city', e.target.innerText);
		getWeather();
	}
}

city.onfocus = function () {
	memoryName = city.innerHTML;
	city.textContent = '';
}

city.onblur = function () {
	if (city.innerHTML === '') {
		city.textContent = memoryName;
	}
}

//Change Quote
async function getQuote() {
	const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
	const res = await fetch(url);
	const data = await res.json();
	blockquote.textContent = data.quoteText;
	figcaption.textContent = data.quoteAuthor;
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
btnUpdateBg.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getQuote);
btnQuoteUpdate.addEventListener('click', getQuote);

randomArr();
showTime();
changeBgAndGreeting();
getName();
checkTime();
getFocus();
getCity();
