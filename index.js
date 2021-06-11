/////////////////////////////////////////////////////////////
/////////////          Declare Variables            /////////
/////////////////////////////////////////////////////////////
const api_key ="e715ac37017f63f7b72de0dfd9f91f58";
let movies = document.querySelector("#movies");
const btn = document.querySelector("#loadBtn");
const movie_page =document.getElementById("movie-page");
let page=1;
let closeBtn=movie_page;//Stops the errors
let query=document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////          Declare Functions            ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////
/////////////             Popular                   /////////
/////////////////////////////////////////////////////////////
async function getPopularData() {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page="+page);



    const data = await response.json();



    
    data.results.forEach(element => {

        addMovies(element.title,element.poster_path, element.vote_average , element.id);
    });

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
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=1page=1&include_adult=false
    let searchquery=query.value;
    console.log("this" + searchquery)
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=en-US&query="+ searchquery);
    const data = await response.json();
    console.log(data);
    data.results.forEach(element => {

        console.log(element.title,element.poster_path, element.vote_average , element.id);
        addMovies(element.title,element.poster_path, element.vote_average , element.id);
    });

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
    console.log(movieId);
    const response = await fetch("https://api.themoviedb.org/3/movie/"+ movieId+"?api_key=" + api_key + "&language=en-US&page="+page);
    const element = await response.json();
    console.log(element)
    let paths = [element.poster_path, element.backdrop_path];
    generateMoviePage(paths, element.genres, element.title, element.runtime, element.release_date, element.vote_average,element.overview );
}
function generateMoviePage(paths,genre,title, runtime, release, score, description){
    movie_page.style.display="flex";
    let poster=getImage(paths[0],"poster");
    let backdrop=getImage(paths[1],"wide");
    let genres 

    movie_page.innerHTML='<button id="closeBtn">Close</button><div id="movie-details"><img class="backdrop" alt="' + title + ' backdrop" src="' + backdrop + '"><div id="info"><img class="poster" alt="' + title + 'movie poster" src="' + poster + '"><span class= "genre">' + genres + '</span><h2 class= "movie-title">' + title + '</span><span class= "run-time">' + runtime + '</span><span class="release-date">' + release + '</span><img class= "star" alt="stars-png" src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png" /><span class="score">' + score + '</span></div><p class="description">' + description + '</p></div></div>';
    closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", closeMoviePage);
}
function closeMoviePage(){


    document.getElementById("movie-page").style.display="none";
}



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
btn.addEventListener( "click", loadmore);
closeBtn.addEventListener("click",closeMoviePage)

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log(query.value);
    document.getElementById("movies").innerHTML="";
    getsearchData();
});


