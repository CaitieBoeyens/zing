import axios from 'axios';

window.banUser = function (el) {
    console.log(el);
    const url = '/ban_user';
    const data = {
        user_id: el.parentElement.parentElement.id
    };
    axios({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => {})
        .catch(error => {
            console.error(error);
        });
        location.reload();

};