var distance;
var card2LBtn = document.getElementById('card2LBtn');
var card2RBth = document.getElementById('card2RBtn');
var searchBtn = document.getElementById('submitBtn');
var count1 = 0;
var count2 = 0;
var apiData;
var apiData2;
var firstApiCallData;
var secondApiCallData;
var response;
let queryURL = "https://corsanywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";
const apiKey = 'wLsYlFFOEJdGUiTRil4CptoWnvddp4BlhEke6YiwNnrTMfgW4wb5pLR89f5PhynrvqSAEsRjHlaiPB8y5H4ChUcx08gx9UenAnD4ThPGe5NMpR6ARQ2Hutvlt0NeYXYx'
var data;
var data2;

function firstApiCall() {
    response = $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${apiKey}`
        },
        data
    });
    firstApiCallData = response;
    SetCard1Display();
}
function secondApiCall() {
    response = $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${apiKey}`
        },
        data2
    });
    secondApiCallData = response;
}
function SetCard1Display() {
    var getData = setInterval(() => {
        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            apiData = firstApiCallData.responseJSON;
            if (document.querySelector('.check') === null) {
                $('.display').append('<div class="card m-5 check"><div class="card-image startPoint"><figure class="image is-4by3"><img class="card1Image" src=' + apiData.businesses[count1].image_url + ' alt="Placeholder image"></figure></div><div class="card-content"><button id="card1LBtn"> < </button><button id="card1RBtn"> > </button><div class="content"><h1 class="firstCardName">' + apiData.businesses[count1].name + '</h1><h3 class="firstCardAddress">' + apiData.businesses[count1].location.display_address[0] + " " + apiData.businesses[count1].location.display_address[1] + '</h3><p class="firstCardRating"><strong>Rating: </strong>' + apiData.businesses[count1].rating + '/5<p class="firstCardPhone"><strong>Phone Number: </strong>' + apiData.businesses[count1].phone + '</p></div></div></div>')
            }
            else {
                document.querySelector('.card1Image').src = apiData.businesses[count1].image_url;
                $('.firstCardName').replaceWith('<h1 class="firstCardName">' + apiData.businesses[count1].name + '</h1></h1>');
                $('.firstCardAddress').replaceWith('<h3 class="firstCardAddress">' + apiData.businesses[count1].location.display_address[0] + " " + apiData.businesses[count1].location.display_address[1] + '</h3>');
                $('.firstCardRating').replaceWith('<p class="firstCardRating"> <strong>Rating </strong>' + apiData.businesses[count1].rating + '/5</p>');
                $('.firstCardPhone').replaceWith('<p class="firstCardPhone"><strong>Phone Number: </strong>' + apiData.businesses[count1].phone + '</p>');
                console.log(data2);
            }
            clearInterval(getData);
            setData2();
            var timer = setInterval(() => {
                if (typeof data2 !== 'undefined') {
                    clearInterval(timer);
                    secondApiCall();
                }
            }, 200);
        }
    }, 200)

}
function count1add() {
    var getData = setInterval(() => {
        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            if (count1 === apiData.businesses.length) {
            }
            else {
                count1++;
                SetCard1Display();
            }
            clearInterval(getData);
        }
    }, 1)

}
function count1subtract() {
    var getData = setInterval(() => {
        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            if (count1 === 0) {
            }
            else {
                count1--;
                SetCard1Display();
            }
            clearInterval(getData);
        }
    }, 1)

}
function count2add() {
    var getData = setInterval(() => {
        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            if (count1 === apiData.businesses.length) {
            }
            else {
                count1++;
                SetCard1Display();
            }
            clearInterval(getData);
        }
    }, 1)
}
function count2subtract() {
    var getData = setInterval(() => {
        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            if (count2 === 0) {
            }
            else {
                count2--;
                SetCard2Display();
            }
            clearInterval(getData);
        }
    }, 1)

}
function setSearch() {
    data = {
        location: $('#location').val(),
        categories: $('#catagoryList1 :selected').val(),
        limit: 25
    }
    firstApiCall();
}

// $.when(firstApiCall).done(function(){
//     data2 = {
//         latitude: apiData.businesses[count1].coordinates.latitude,
//         longitude:apiData.businesses[count1].coordinates.longitude,
//         radius: $('#distance').val(),
//         limit:25
//     }
//     console.log(data2)
// });

function setData2() {
    var getData = setInterval(() => {

        if (typeof firstApiCallData.responseJSON !== 'undefined') {
            data2 = {
                latitude: apiData.businesses[count1].coordinates.latitude,
                longitude: apiData.businesses[count1].coordinates.longitude,
                radius: $('#distance').val(),
                limit: 25
            }
            clearInterval(getData);
            console.log(data2);

        }
    }, 1);
}

searchBtn.addEventListener('click', setSearch);
$(document).on('click', '#card1LBtn', count1subtract);
$(document).on('click', '#card1RBtn', count1add);

// card1RBth.addEventListener('click', card1Right)

// //$("iframe")
// var originInput=$("#origin")
// originInput.text="text"
// console.log(originInput)
// //$(".destination")
// //"https://www.google.com/maps/embed/v1/directions?key=AIzaSyBhzc6b3tPUkEyQ9TkqRl2gCCcw5WGCQyo&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways"
// var iframe=$("#map")
// console.log(iframe)

// var origin= 32708
// var destination= 14625
// var url= "https://www.google.com/maps/embed/v1/directions?key=AIzaSyBhzc6b3tPUkEyQ9TkqRl2gCCcw5WGCQyo&origin="+origin+"&destination="+destination

// iframe.attr("src", url)
// var test = {
//     latitude: 28.4639588313221,
//     longitude: -81.3053254036602,
//     categories: "restaurants",
//     limit: 50
//     // location: "Orlando",
//     // categories: "movietheaters"
// }

// $.ajax({
//     url: queryURL,
//     method: "GET",
//     headers: {
//         "accept": "application/json",
//         "x-requested-with": "xmlhttprequest",
//         "Access-Control-Allow-Origin": "*",
//         "Authorization": `Bearer ${apiKey}`
//     },
//     test
// });
