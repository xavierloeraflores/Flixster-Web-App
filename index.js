const api_key ="e715ac37017f63f7b72de0dfd9f91f58";
let movies = document.querySelector("#movies");
let page=1;

async function getMovies() {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page="+page);

    const data = await response.json();
    console.log(data.results);

    // https://www.themoviedb.org/t/p/w600_and_h900_bestv2/70AV2Xx5FQYj20labp0EGdbjI6E.jpg

    data.results.forEach(element => {
        let url="https://www.themoviedb.org/t/p/w600_and_h900_bestv2"+element.poster_path;
        let score=element.vote_average;
        let title=element.title;
        addMovies(title, url, score);
        console.log(element.title);
    });


}
getMovies();

function addMovies(title, url, score) {
    movies.innerHTML += ' <div class="movie"><img class="poster" alt="movie poster" src="' + url +'" /><div class="movie-bar"><span class= "movie-title">' + title + '</span><div class="rating"><img class= "star" alt="stars-png" src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"/><span class="score">'+score+ '</span></div></div></div>';

}

function loadmore(){
    page+=1;
    getMovies();
}
const btn = document.querySelector("#loadBtn").addEventListener( "click", loadmore);
