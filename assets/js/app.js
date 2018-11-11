import axios from 'axios';

// functioning fuzzy search with axios, output to console


document.getElementById('userSearchBar').onkeyup = function() {
    axios
        .get('/autocomplete/'+this.value)
        .then(function(response) {
            autocomplete(document.getElementById("userSearchBar"), response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
};

function showResults(results){
   for (var x=0; x<results.length; x++){
      console.log(results[x]);
   }
}

function autocomplete(inp, arr) {
   var currentFocus;
   inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);

      for (i = 0; i < arr.length; i++) {
         if (arr[i][0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i][0].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i][0].substr(val.length)+"";
            var uID = arr[i][1];
            b.addEventListener("click", function(e) {
               window.location.href = "/profile/"+uID;
            });
            a.appendChild(b);
         }
      }
   });

   function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
   }
   function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
         x[i].classList.remove("autocomplete-active");
      }
   }
   function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
         if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
         }
      }
   }
   /*execute a function when someone clicks in the document:*/
   document.addEventListener("click", function (e) {
      closeAllLists(e.target);
   });
}