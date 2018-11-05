import axios from 'axios';

window.restoreUser = function (el) {
    console.log(el.parentElement.parentElement);
    const url = '/restore_user';
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