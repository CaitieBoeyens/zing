import axios from 'axios';

window.vote = function(el, value) {
    el.classList.add('is-pink');
    el.classList.remove('is-inactive');
    console.log(el.parentElement);
    if (el.parentElement.classList.contains('clicked')) {
        el.parentElement.childNodes;
    } else {
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
        el.parentElement.classList.add('clicked');
        if (value === -1) {
            el.style.pointerEvents = 'none';
            el.nextElementSibling.style.pointerEvents = 'none';
        }
        if (value === 1) {
            el.style.pointerEvents = 'none';
            el.previousElementSibling.style.pointerEvents = 'none';
        }
    }
};
