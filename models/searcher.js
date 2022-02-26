const axios = require('axios');
const Location = require('./location')
const {read, save} = require('../helpers/repository')

const NOMINATIM_MAX_RESULTS = 5;
const OPENWEATHER_UNITS = 'metric';
class Searcher {
    _history = [];

    constructor() {
        const data = read();
        if (data !== null) {
            this._history = data;
        }
    }

    async seachLocation(query) {
        try  {
            const axiosInstance = axios.create({
                baseURL: 'https://nominatim.openstreetmap.org/search',
                params: {
                    'format': 'json',
                    'limit': NOMINATIM_MAX_RESULTS,
                    'q': query
                }
            });

            const response = await axiosInstance.get();
            if (response.status == 200 && response.data) {
                let list = [];
                response.data.forEach((element) => {
                    list.push(
                        new Location(
                            element.display_name,
                            element.lat,
                            element.lon
                        )
                    )
                });

                return list;
            }

            return [];
        } catch(error) {
            console.log(error);

            return [];
        }
    }

    async searchWeather(location) {
        const token = process.env.OPENWEATHER_TOKEN;
        if (!token) {
            throw new Error('Missing OpenWeather API token!');
        }

        try {
            const axiosInstance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {
                    'lat': location.latitude,
                    'lon': location.longitude,
                    'units': OPENWEATHER_UNITS,
                    'appid': token
                }
            });

            const response = await axiosInstance.get();
            if (response.status == 200 && response.data.main) {
                location.currentTemperature = response.data.main.temp;
                location.maxTemperature = response.data.main.temp_max;
                location.minTemperature = response.data.main.temp_min;
            }
        } catch(error) {
            console.log(error);
        }

        return location;
    }

    set history(location) {
        const index = this._history.findIndex(element => {
            return element.toLowerCase() === location.toLowerCase();
        });

        if (index === -1) {
            this._history.push(location);
        }

        save(this._history);
    }

    get history() {
        return this._history;
    }

}

module.exports = Searcher;