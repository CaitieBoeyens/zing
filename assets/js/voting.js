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

            el.nextElementSibling.nextElementSibling.style.color = '#ff4f6f';
            el.nextElementSibling.nextElementSibling.classList.remove(
                'is-inactive'
            );
            var votes = el.nextElementSibling.nextElementSibling.innerHTML;
            votes = parseInt(votes) - 1;
            console.log(votes);
            el.nextElementSibling.nextElementSibling.innerHTML = votes;
        }
        if (value === 1) {
            el.style.pointerEvents = 'none';
            el.previousElementSibling.style.pointerEvents = 'none';

            el.nextElementSibling.style.color = '#ff4f6f';
            el.nextElementSibling.classList.remove('is-inactive');
            var votes = el.nextElementSibling.innerHTML;
            votes = parseInt(votes) + 1;
            console.log(votes);
            el.nextElementSibling.innerHTML = votes;
        }
    }
};
