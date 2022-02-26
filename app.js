require('dotenv').config();
const { inquirerMenu, pause, readInput, readSelectLocation, showLocation } = require("./helpers/inquirer");
const Searcher = require("./models/searcher");

const main = async() => {
    let opt;
    const searcher = new Searcher();

    do {
        opt = await inquirerMenu();
        switch(opt) {
            case 1:
                const query = await readInput('Enter the name of the city: ');
                const locations = await searcher.seachLocation(query);
                let location  = await readSelectLocation(locations);
                if (location !== 0) {
                    location = await searcher.searchWeather(location);
                    searcher.history = location.name;
                    showLocation(location);
                }
            break;
            case 2:
                searcher.history.forEach((name, i) => {
                    console.log(`${((i+1) + '.').green} ${name}`);
                });
            break;
        }

        if (opt !== 0) {
            await pause();
        }
    } while (opt !== 0);
}

main();