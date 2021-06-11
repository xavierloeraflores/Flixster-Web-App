/////////////////////////////////////////////////////////////
/////////////          Declare Variables            /////////
/////////////////////////////////////////////////////////////
const api_key ="e715ac37017f63f7b72de0dfd9f91f58";
const loadBtn = document.querySelector("#loadBtn");
const movie_page =document.getElementById("movie-page");
const movie_details =document.getElementById("movie-details");
const searchBtn = document.getElementById("searchBtn");
let closeBtn=document.getElementById("closeBtn");
let movies = document.querySelector("#movies");
let query=document.getElementById("searchInput");





let page=1;
let YOUTUBEID = 'M7lc1UVf-VE';



/////////////////////////////////////////////////////////////
/////////////             YOUTUBE                   /////////
/////////////////////////////////////////////////////////////
//YOUTUBE CODE https://developers.google.com/youtube/iframe_api_reference
//YOUTUBE CODE https://developers.google.com/youtube/iframe_api_reference
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player; 
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: YOUTUBEID,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
function onPlayerReady(event) {
    // event.target.playVideo(); 

    //This autoplays video if uncommented
}
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      done = true;
    }
  }
function stopVideo() {
    player.stopVideo();
  }





/////////////////////////////////////////////////////////////
/////////////             Popular                   /////////
/////////////////////////////////////////////////////////////
async function getPopularData() {
    loadBtn.style.display="block";
    // API CALLS
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page="+page);
    const data = await response.json();
    //Calls movie data for each element
    data.results.forEach(element => {

        addMovies(element.title,element.poster_path, element.vote_average , element.id);
    });
    //Gets movie page if clicked
    document.querySelectorAll(".movie").forEach(item =>{
        item.addEventListener("click", event =>{
            getMoviePage(item.firstChild.id)
        });
    });
}
function addMovies(title, path, score, movieId) {
    let url=getImage(path, "poster");
    movies.innerHTML += ' <div class="movie"><img class="poster" alt="'+title+'" src="' + url +'"id="'+ movieId+'"/><div class="movie-bar"><span class= "movie-title">' + title + '</span><div class="rating"><img class= "star" alt="stars-png" src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"/><span class="score">'+score+ '</span></div></div></div>';
}



/////////////////////////////////////////////////////////////
/////////////             Search                /////////
/////////////////////////////////////////////////////////////
async function getsearchData() {

    let searchquery=query.value;
    //API Calls
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query="+ searchquery);
    const data = await response.json();
    //Add Movies to Grid
    data.results.forEach(element => {  
        console.log(element.title,element.poster_path, element.vote_average , element.id);
        addMovies(element.title,element.poster_path, element.vote_average , element.id);
    });
    //Allow each movie to open movie page
    document.querySelectorAll(".movie").forEach(item =>{
        item.addEventListener("click", event =>{
            getMoviePage(item.firstChild.id)
        });
    });
}



/////////////////////////////////////////////////////////////
/////////////             Movie Page                /////////
/////////////////////////////////////////////////////////////
async function getMoviePage(movieId){
    //Fetches Movie Data
    const response = await fetch("https://api.themoviedb.org/3/movie/"+ movieId+"?api_key=" + api_key + "&language=en-US&page="+page);
    const element = await response.json();
    //Calls Video API & Sets YoutubeID
    const videoresponse = await fetch("https://api.themoviedb.org/3/movie/"+ movieId+"/videos?api_key=" + api_key + "&language=en-US");
    const videoelement = await videoresponse.json();
    YOUTUBEID=videoelement.results[0].key;
    player.loadVideoById(YOUTUBEID); 
    //Generates Movie Page
    console.log(element.genres)
    let paths = [element.poster_path, element.backdrop_path]; 
    generateMoviePage(paths, element.genres, element.title, element.runtime, element.release_date, element.vote_average,element.overview 
        );

}
function generateMoviePage(paths,genre,title, runtime, release, score, description){
    movie_page.style.display="block";
    let poster=getImage(paths[0],"poster");
    let backdrop=getImage(paths[1],"wide");
    let genres=genre["0"].name;
    console.log("Genre:"+genres);

    movie_details.innerHTML='<img class="backdrop" alt="' + title + ' backdrop" src="' + backdrop + '"><div id="row2"><img class="poster" alt="' + title + 'movie poster" src="' + poster + '"><div id="info"><span class="genres">' + genres + '</span><h2 class= "movie-title">' + title + '</h2><div id="subrow"><span class= "run-time">' + runtime + ' min</span><span id="divider">|</span><span class="release-date">' + release + '</span></div><div id="rating"><img class= "star" alt="stars-png" src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" /><span class="score">' + score + '</span></div></div><span class="description">' + description + '</span></div>';
    closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", closeMoviePage);
    
}
function closeMoviePage(){

    stopVideo();
    document.getElementById("movie-page").style.display="none";
}

// https://api.themoviedb.org/3/movie/637649/video?api_key=e715ac37017f63f7b72de0dfd9f91f58&language=en-US

function getImage(path, type){
    let imgWide ="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
    let imgSmall ="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/";
    let imgPoster ="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

    if(type==="poster"){
        console.log(imgPoster+path)
        return imgPoster+path;
    }
    else if(type==="wide"){
        return imgWide+path;
    }
    else {
        return imgSmall + path;
    }

}
function loadmore(){
    page+=1;
    getPopularData();
}







/////////////////////////////////////////////////////////////
/////////////             Call Functions            /////////
/////////////////////////////////////////////////////////////

getPopularData();
loadBtn.addEventListener( "click", loadmore);
closeBtn.addEventListener("click",closeMoviePage)

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(query.value);
    document.getElementById("movies").innerHTML="";
    loadBtn.style.display="none";
    getsearchData();
});

