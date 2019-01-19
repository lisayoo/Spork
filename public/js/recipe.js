// Source: https://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest
// function formatParams(params) {
//   return Object
//     .keys(params)
//     .map(function(key) {
//       return key+'='+encodeURIComponent(params[key])
//     })
//     .join('&');
// }

// // params is given as a JSON
// function get(endpoint, params, successCallback, failureCallback) {
//   const xhr = new XMLHttpRequest();
//   const fullPath = endpoint + '?' + formatParams(params);
//   xhr.open('GET', fullPath, true);
//   xhr.onload = function(err) {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         if (successCallback)
//           successCallback(JSON.parse(xhr.responseText));
//       } else {
//         if (failureCallback)
//         failureCallback(xhr.statusText);
//       }
//     }
//   };
//   xhr.onerror = function(err) {
//     failureCallback(xhr.statusText);
//   }
//   xhr.send(null);
// }

// function post(endpoint, params, successCallback, failureCallback) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', endpoint, true);
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.withCredentials = true;
//   xhr.onload = function(err) {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         if (successCallback)
//           successCallback(JSON.parse(xhr.responseText));
//       } else {
//         if (failureCallback)
//           failureCallback(xhr.statusText);
//       }
//     }
//   };
//   xhr.onerror = function(err) {
//     reject(xhr.statusText);
//   };
//   xhr.send(JSON.stringify(params));
// }


function submitNewRecipe() {
  // TO BE IMPLEMENTED:
  // submit the story to our newly implemented database
  console.log("submitting");
  const rtitle = document.getElementById('recipetitle');
  const rdesc = document.getElementById('recipedescriptions');
  const ringr = document.getElementById('ingredients');
  const rsteps = document.getElementById('steps');

  const data = {
    "rt": rtitle,
    "rd": rdesc,
    "ri": ringr,
    "rs": rsteps  };

  post('/api/newrecipe', data);
}

document.addEventListener("submit", submitNewRecipe);