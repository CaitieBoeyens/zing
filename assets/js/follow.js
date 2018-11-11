import axios from 'axios';

window.follow = function(el, user_id) {
    const url = '/follow';
    const data = {
        user_id: user_id
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

    document.getElementById('following').style.display = 'block';
    el.style.display = 'none';
};

window.unfollow = function(el, user_id) {
    const url = '/unfollow';
    const data = {
        user_id: user_id
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

    document.getElementById('follow').style.display = 'block';
    el.style.display = 'none';
};
