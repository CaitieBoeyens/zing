import axios from 'axios';
import { request } from 'https';

import jquery from 'jquery';
import jqueryui from 'jquery-ui';


function test() {   
    //$term = document.getElementById('userSearchBar').value;
    //axios.get('/search', {term: document.getElementById('userSearchBar').value}).then(function(response){console.log(response.data);});
}

$(function() {
    $("#userSearchBar").autocomplete({
        source: function(request, response){
            axios.get('/search', {term: request.term}, function(data){
                response($.map(data, function(item){
                    return {
                        label: item.username,
                        value: item,
                        id: item.id
                    }
                }))
            },"json");
        },
        minLength: 1,
        messages: {noResults: '', results: function(){}},
        dataType: "json",
        select: function(event, ui){
            var render = `<a>${ui.item.label}</a>`;
            alert(render);
        }
    });
});

document.getElementById('userSearchBar').onkeyup = test();
