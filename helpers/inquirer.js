const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you need to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Search city`
            },
            {
                value: 2,
                name: `${'2.'.green} View search history`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    }
];

const pauseInput = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} to continue`
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('=============================='.green);
    console.log('       NODE WEATHER APP       '.white)
    console.log('==============================\n'.green);

    const {option} = await inquirer.prompt(questions);

    return option;
}

const showLocation = (location) => {
    console.log('\nLocation information:\n'.green);
    console.log(`Name: ${location.name}`);
    console.log(`Latitude: ${location.latitude}`);
    console.log(`Longitude: ${location.longitude}`);
    console.log(`Current temperature: ${location.currentTemperature}`);
    console.log(`Today max. temperature: ${location.maxTemperature}`);
    console.log(`Today min. temperature: ${location.minTemperature}`);
}

const pause = async() => {
    console.log('\n');
    await inquirer.prompt(pauseInput);
}

const readSelectLocation = async(locations) => {
    const choices = locations.map((location, i) => {
        return {
            value: location,
            name: `${((i + 1) + '.').green} ${location.name}`,
        }
    });

    choices.unshift({
        value: 0,
        name: `${'0.'.green} CANCEL`
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a location: ',
            choices
        }
    ];

    const {id} = await inquirer.prompt(question);
    
    return id;
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (desc) => {
                if (!desc || desc.trim() === '') {
                    return 'Please insert a valid value';
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc.trim();
}

module.exports = {
    inquirerMenu, 
    pause, 
    readInput, 
    readSelectLocation,
    showLocation
}