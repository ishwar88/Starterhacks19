
function othername() {
  var yummly = "https://www.yummly.com/recipe/";
  var input = document.getElementById("userInput").value;
  document.getElementById("message").innerHTML = "";
  document.getElementById("input").style.visibility = "hidden";
  var array = input.split(", ");
  var counter = 4;
  var combine = function(a, min) {
    var fn = function(n, src, got, all) {
      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
      }
      return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
      fn(i, a, [], all);
    }
    all.push(a);
    return all;
  }
  var subsets = combine(array, 4);
  console.log(subsets);
  var url = "https://api.yummly.com/v1/api/recipes?_app_id=0167bcf9&_app_key=5387087d7c98100f1393f86f9e4fa918"
  var matchesPromises = [];
  for (i = 0; i < subsets.length; i++) {
    for (j = 0; j < subsets[i].length; j++) {
      url = url + "&allowedIngredient[]=" + subsets[i][j];
    }
    matchesPromises.push(fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(obj) {
       var matches = obj["matches"];
       // console.log(obj);
       // console.log(matches);
       // console.log(i);
       return matches;
     }));
    //   console.log(url);
    //   var xhttp = new XMLHttpRequest();
    //   xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {
    //    // Typical action to be performed when the document is ready:
    //    response = xhttp.responseText;
    //    console.log(response);
    //    var obj = JSON.parse(response);
    //    var matches = obj["matches"];
    //    // console.log(obj);
    //    // console.log(matches);
    //    // console.log(i);
    //    for (k = 0; k < matches.length; k++) {
    //     if (matches[k]["ingredients"].length == subsets[i].length) {
    //       ids.push(matches[k]["id"]);
    //     }
    //    }

    //   }
    // };
    //   xhttp.open("GET", url, true);
    //   xhttp.send();
      url = "https://api.yummly.com/v1/api/recipes?_app_id=0167bcf9&_app_key=5387087d7c98100f1393f86f9e4fa918"

  }
  Promise.all(matchesPromises).then(function(allMatches) {
     var ids = [];
     var rNames = [];
     var imgs = [];
    for (i = 0; i < allMatches.length; i++) {
      for (var match of allMatches[i]) {
        if (match["ingredients"].length == subsets[i].length) {
          ids.push(match["id"]);
          rNames.push(match["recipeName"]);
          imgs.push(match["imageUrlsBySize"]["90"]);
        }
    }
  }
    if (ids.length == 0) {
       document.getElementById("message").innerHTML = "Sorry, no results!";
    }
    else{
      for (i = 0; i < ids.length; i++) {
      var p = document.getElementById('body');
      var newA = document.createElement('a');
      var newP = document.createElement('p');
      var newI = document.createElement('img');
      newP.innerHTML = rNames[i];
      newA.setAttribute('href', yummly+ids[i]);
      newA.setAttribute('align', "center");
      newA.setAttribute('class', "pad");
      newI.setAttribute('src', imgs[i]);
      newI.setAttribute('class', 'center');
      newA.appendChild(newI);
      newA.appendChild(newP);
      p.appendChild(newA);
        document.getElementById("message").innerHTML = "Here are the delicious recipes you can make!";
      }
    }

  });




      
    


}







