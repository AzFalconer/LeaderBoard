$(document).ready(function() {
  //Variables
  var users = [],
      display = [],
      i = 0,
      sortBy = "day30",
      lookUp = 'https://www.freecodecamp.com/',
      URL30 = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      URLLife = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

  //Listen
  $("#day30").click(function(){sortBy = "day30";sortArray('day30');});
  $("#life").click(function(){sortBy = "life";sortArray('life');});
  //Execute
  getInfo(URL30);

  //Functions
  function getInfo(link) {
    fetch(link)
      .then(function(response){return response.json();})
      .then(function(j){for (i = 0; i < j.length; i++) {users.push([j[i].img,j[i].username,j[i].recent,j[i].alltime]);}})
      .then(function(){display = users;displayUsers();})
  }

  function comparator(a, b) {
    if (sortBy === "day30") {
      if (a[2] > b[2]) return -1;
      if (a[2] < b[2]) return 1;
      return 0;
    }
    else {
      if (a[3] > b[3]) return -1;
      if (a[3] < b[3]) return 1;
      return 0;
    }
  }

  function sortArray(element) {
    //$("debug").append('sortCalled');
    display = display.sort(comparator);
    $('.built').remove();
    displayUsers();
  }

  function displayUsers() {
    if (sortBy === "day30") {$("#life").removeClass("highlight");$("#day30").addClass("highlight");}
    else {$("#life").addClass("highlight");$("#day30").removeClass("highlight");}
    for (i = 0; i < display.length; i++) {
      $("#userList").append('<tr class="built"><td class="num">' + (i+1) + '</td><td>' + '<a href="' + lookUp + display[i][1] + '" target="_blank"><img src="' + display[i][0] + '"> ' + display[i][1] + '</td><td class="num">' + display[i][2] + '</a></td><td class="num">' + display[i][3] + '</td></tr>');
    }
  }

});
