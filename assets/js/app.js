import jqueryui from 'jquery-ui';
import axios from 'axios';

/*
$(function() {
    $("#userSearchBar").autocomplete({
        source: function(request, response){
            axios.post('/autocomplete', {term: this.value}),
            {term:request.term},function(data){
                response($.map(data, function(item){
                    return{
                        label: item.username,
                        value: item,
                        id: item.id
                    }
                }))
            }, "json";
        },minLength: 1,
        messages: {
            noResults: '',
            results: function(){}
        },
        dataType: "json",
        select: function(event, ui){
            var render = `<a href='/viewProfile/${ui.id}'>${ui.item.label}</a>`
            $('#outputcontent').html(render);
        }
    });
});
*/

document.getElementById('userSearchBar').onkeyup = function() {
    var $data = this.value;
    axios
        .post('/autocomplete', { term: this.value })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
};
