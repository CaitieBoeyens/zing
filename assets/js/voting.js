import axios from 'axios';

window.vote = function(el, value) {
    el.classList.add('is-pink');
    const url = '/vote';
    const data = {
        vote: value,
        reply_id: el.parentElement.id
    };

    axios({
        method: 'post',
        url: url,
        data: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(response => {})
        .catch(error => {
            console.error(error);
        });
};
