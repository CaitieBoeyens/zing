import axios from 'axios';

window.deleteReply = function (el) {
    console.log(el.parentElement.id);
    const url = '/delete_reply';
    const data = {
        reply_id: el.parentElement.id
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
};