import axios from 'axios';

window.removeAdmin = function (el) {
    console.log(el.parentElement.parentElement);
    const url = '/remove_admin';
    const data = {
        admin_id: el.parentElement.parentElement.id
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