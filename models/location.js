
class Location {
    name;
    latitude;
    longitude;
    currentTemperature;
    maxTemperature;
    minTemperature;

    constructor(
        name, 
        latitude, 
        longitude,
        currentTemperature = null,
        maxTemperature = null,
        minTemperature = null
    ) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.currentTemperature = currentTemperature;
        this.maxTemperature = maxTemperature,
        this.minTemperature = minTemperature
    }

    toString() {
        return `${this.name} - (${this.latitude},${this.longitude})`;
    }
}

module.exports = Location;