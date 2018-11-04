import axios from 'axios';
import { Croppie } from 'croppie';

const avatarCropper = new Croppie(document.getElementById('avatar_preview'), {
    viewport: { width: 200, height: 200, type: 'circle' },
    boundary: { width: 300, height: 300 }
});

function readFile({ target: input }) {
    document.getElementById('avatar_preview').classList.add('is-visible');
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            /* display ready */

            avatarCropper.bind({ url: e.target.result });
        };

        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('avatar_file').onchange = readFile;
document.getElementById('avatar_submit').onclick = function() {
    let avatar;
    avatarCropper.result({ type: 'blob' }).then(blob => {
        avatar = blob;
        avatarUpload(avatar);
    });
};

document.getElementById('avatar_form').onsubmit = function(event) {
    event.preventDefault();
};

function avatarUpload(blob) {
    const url = '/image';
    const data = new FormData();
    data.append('avatar', blob);

    axios({
        method: 'post',
        url: url,
        data: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        .then(response => {
            window.location.assign('/success');
        })
        .catch(error => {
            console.error(error);
        });
}
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

export function vote(value) {
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
