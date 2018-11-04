import axios from 'axios';

document.getElementsByName('downvote').onclick = function() {
    vote(-1);
    this.classList.add('is-pink');
};

document.getElementById('test').onclick = function() {
    alert('test');
    this.classList.add('is-pink');
};

document.onload = function() {
    const upvotes = Array.from(document.getElementsByClassName('upvote'));
    console.log(upvotes);

    upvotes.forEach((element, index) => {
        debugger;
        element.addEventListener('click', event => {
            vote(1);
            this.classList.add('is-pink');
        });
    });
};

function vote(value) {
    /* const url = '/vote';
    const data = { vote: value };

    axios({
        method: 'post',
        url: url,
        data: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(response => {})
        .catch(error => {
            console.error(error);
        }); */

    alert(value);
}
