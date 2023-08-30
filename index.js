const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-detail');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {
	const APIKey = '5b304dc167e2cdf4d6f12e71abff5808';
	const city = document.querySelector('.search-box input').value;
	console.log('check', city);

	if (city === '') {
		return;
	}

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === '404') {
				container.style.height = '400px';
				weatherBox.style.display = 'none';
				weatherDetail.style.display = 'none';
				error.style.display = 'block';
				error.classList.add('fadeIn');
				return;
			}

			error.style.display = 'none';
			error.classList.remove('fadeIn');

			const image = document.querySelector('.weather-box img');
			const temp = document.querySelector('.weather-box .temp');
			const desc = document.querySelector('.weather-box .desc');
			const humidity = document.querySelector('.weather-detail .humidity span');
			const wind = document.querySelector('.weather-detail .wind span');

			switch (json.weather[0].main) {
				case 'Clear':
					image.src = 'img/clear.png';
					break;
				case 'Clouds':
					image.src = 'img/cloud.png';
					break;
				case 'Mist':
					image.src = 'img/mist.png';
					break;
				case 'Rain':
					image.src = 'img/rain.png';
					break;
				case 'Snow':
					image.src = 'img/snow.png';
					break;
				default:
					image.src = '';
			}

			temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
			desc.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

			weatherBox.style.display = '';
			weatherDetail.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetail.classList.add('fadeIn');
			container.style.height = '590px';
		});
});
