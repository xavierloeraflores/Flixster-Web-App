/////////////////////////////////////////////////////////////
/////////////          Declare Variables            /////////
/////////////////////////////////////////////////////////////
const api_key ="e715ac37017f63f7b72de0dfd9f91f58";
let movies = document.querySelector("#movies");
const btn = document.querySelector("#loadBtn");
let page=1;


/////////////////////////////////////////////////////////////
/////////////          Declare Functions            /////////
/////////////////////////////////////////////////////////////
async function getData() {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page="+page);

    const data = await response.json();
    console.log(data.results);

    //POSTER: https://www.themoviedb.org/t/p/w600_and_h900_bestv2/70AV2Xx5FQYj20labp0EGdbjI6E.jpg

    //SMALL https://www.themoviedb.org/t/p/w533_and_h300_bestv2/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg 
    //BIG  https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/pcDc2WJAYGJTTvRSEIpRZwM3Ola.jpg 
    getMovies(data)
}

function getMovies(data)
{
    data.results.forEach(element => {

        addMovies(element.title,getImage(element.poster_path, "poster"), element.vote_average , element.id);
    });

    document.querySelectorAll(".poster").forEach(item =>{
        item.addEventListener("click", moviePage(item.id));
    });
}
function addMovies(title, url, score, movieId) {
    movies.innerHTML += ' <div class="movie"><img class="poster" alt="'+title+'" src="' + url +'"id="'+ movieId+'"/><div class="movie-bar"><span class= "movie-title">' + title + '</span><div class="rating"><img class= "star" alt="stars-png" src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"/><span class="score">'+score+ '</span></div></div></div>';
}
function moviePage(movieId){
    console.log(movieId);
}

function getImage(path, type){
    let imgWide ="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/";
    let imgSmall ="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/";
    let imgPoster ="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/";

    if(type==="poster"){
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
    getData();
}



/////////////////////////////////////////////////////////////
/////////////             Call Functions            /////////
/////////////////////////////////////////////////////////////

getData();
btn.addEventListener( "click", loadmore);
