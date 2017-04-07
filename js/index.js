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
  
  var url = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exsentences=2&exlimit=10&exintro&explaintext&gsrsearch=";
  var search = $("#search").val() + "&callback=?";
  
  $.getJSON(url + search, displayArticles);
}

function displayArticles(data) {

  $("#insert").empty();
  
  if(data.hasOwnProperty("query")) {
    
    var articles = data.query.pages;
    var articleHTML = $("<div class='row'><div class='col-lg-8 col-lg-offset-2 listitem' id='click'></div></div>");
  
    Object.keys(articles).forEach(function(key) {
    
      var html = articleHTML.clone();
      var listItem = html.find(".listitem"); 
      listItem.click(function() {
        window.open("http://en.wikipedia.org/?curid=" + articles[key].pageid);
      });
    
      listItem.append("<h3>" + articles[key].title + "</h3>");
      listItem.append("<p>" + articles[key].extract + "</p>");
      $("#insert").append(html);
    });
  }
  else
    alert("No matches found");
}