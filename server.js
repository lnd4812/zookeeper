const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const {animals} = require('./adata/animals');




function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    // save animalsArray as filteredResults:
    let filteredResults = animalsArray;
    
    if (query.personalityTraits) {
        // save personality traits as dedicated Array/ if string, place it into a new array
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop through each trait in the array:
        personalityTraitsArray.forEach(trait => {
            // check trait against each animal in array - for each trait targeted by the filter, the filteredResults
            // array will contina only entries that contain the trait so at end we'll have array of animals with every one of the traits when 
            // forEach loop is finished
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {    
        filteredResults = filterResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
 }

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on PORT ${PORT}!`);
});