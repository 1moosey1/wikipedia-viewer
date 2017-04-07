$(document).ready(function() {
                  
  $("#random").click(randomArticle);
  $("#search-button").click(searchArticles);
  $("#search").keydown(function(event) {
    
    if(event.which == 13)
      searchArticles();
  });
});

function randomArticle() {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}

function searchArticles() {
  
  var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exsentences=2&exlimit=10&exintro&explaintext&gsrsearch=";
  var search = $("#search").val() + "&callback=?";
  
  $.getJSON(url + search, displayArticles);
}

function displayArticles(data) {

  $("#insert").empty();
  
  if(data.hasOwnProperty("query")) {
    
    var articles = data.query.pages;
    var articleHTML = 
      $("<div class='col-md-8 col-md-offset-2 col-xs-8 col-xs-offset-2 listitem'></div>");
  
    Object.keys(articles).forEach(function(key) {
    
      var listItem = articleHTML.clone();
      listItem.click(function() {
        window.open("https://en.wikipedia.org/?curid=" + articles[key].pageid);
      });

      listItem.append("<h3>" + articles[key].title + "</h3>");
      listItem.append("<p>" + articles[key].extract + "</p>");
      $("#insert").append(listItem);
    });
  }
  else
    alert("No matches found");
}
