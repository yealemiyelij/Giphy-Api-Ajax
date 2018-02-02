var oldURL;
var splitStillURL;
var splitGifURL;
var newURL;
var searchTerm;
var limit;
var offset;
var rating;

var animalName = ["Weasel", "Cheetah", "owl", "Leopard", "Bear", "Dorcas gazelle", "parrot", "penguin", "woodpecker", "Duck"];

function displayInfo(searchTerm, limit, offset, rating){
    $('#animals-view').empty();
    var params= {
        "q": searchTerm,
        "limit":limit,
        "offset":offset,
        "rating": rating
    };

    var action= jQuery.param(params);
    var queryURL = "http://api.giphy.com/v1/gifs/search?" + action + "&api_key=dc6zaTOxFJmzC";
    console.log(queryURL);
    $.ajax({
        url:queryURL,
        method:'GET'
    }).done(function(response){
        var results= response.data;
        if (results == "") {
                alert("There isn't a gif for this selected button");
        }
        for(var i=0; i<results.length; i++){
            var topicDiv=$("<div>");
            topicDiv.addClass("topicDiv");

            var img= $("<img>");
            img.addClass("card-img-top");
            img.attr("src", results[i].images.fixed_height_still.url);

            var blockDiv= $("<div>");
            blockDiv.addClass("card-block");
            blockDiv.append("<h4 class='card-title'>Rating: "+ results[i].rating+ '</h4>');
            blockDiv.append('<a href=' + results[i].url+ ' class= card-link target="_blank">Link</a><br><br>');

            topicDiv.append(img);
            topicDiv.append(blockDiv);
            $('#animals-view').prepend(topicDiv);
        }
    });

};

function renderButtons(){
    $("#buttons-view").empty();
    for (var i = 0; i < animalName.length; i++) {
        var btn = $("<button>");
        btn.addClass("action");
        btn.addClass("btn btn-primary");
        btn.attr("data-name", animalName[i]);
        btn.text(animalName[i]);
        $("#buttons-view").append(btn);
    };
}
function addNewButton(){
    $('#animal-input').click(function(){
        event.preventDefault();
        var input= $('#search-animal').val().trim();
        if(input==" "){
            return false;
        }
        animalName.push(input);
        renderButtons()
    })
}

function removeLastButton() {
    $("removeGif").on("click", function () {
            animalName.pop(input);
            renderButtons();
            return false;
    });
}


$(document).on('click', '.action', function(){
     searchTerm= $(this).attr('data-name');
     limit=$('#limit').val().trim();
     offset= 0;
     rating= $('#rating').val().trim();
     displayInfo(searchTerm, limit, offset, rating);
});


$(document).on('click', 'img', function(){
    oldURL= $(this).attr('src');
    splitStillURL= oldURL.split('_');
    if(splitStillURL.length>1){
        newURL=splitStillURL[0]+ '.gif';
    } else {
        splitGifURL=splitStillURL[0].split('.gif');
        newURL= splitGifURL[0]+ '_s.gif';
    };
    $(this).attr('src', newURL);
});


renderButtons();
addNewButton();
removeLastButton();


/*

    function displayAnimals() {
        var action = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            $("#animals-view").empty();
            var results = response.data;
            if (results == "") {
                alert("There isn't a gif for this selected button");
            }
            for (var i = 0; i < results.length; i++) {

                var topicDiv = $("<div>");
                topicDiv.addClass("topicDiv");

                var topicRating = $("<p>").text("Rating: " + results[i].rating);
                topicDiv.append(topicRating);

                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height_small_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
                topicImage.attr("data-state", "still");
                topicImage.addClass("image");
                topicDiv.append(topicImage);

                $("#animals-view").prepend(topicDiv);
            }
        });
    }

    renderButtons();
    addNewButton();
    removeLastButton();

    $(document).on("click", ".action", displayAnimals);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr("src", $(this).data('animate'));
            $(this).attr("data-state", 'animate');
        } else {
            $(this).attr("src", $(this).data('still'));
            $(this).attr("data-state", 'still');
        }
    });  */
