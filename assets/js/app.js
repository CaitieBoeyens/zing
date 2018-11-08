import axios from 'axios';

// functioning fuzzy search with axios, output to console


document.getElementById('userSearchBar').onkeyup = function() {
    axios
        .get('/autocomplete/'+this.value)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
};
