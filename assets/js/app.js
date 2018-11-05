import axios from 'axios';

function test() {
    axios.get('/userList').then(function(response) {
        console.log(response.data);
    });
}

document.getElementById('userSearchBar').onkeyup = test;
