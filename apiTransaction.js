//initial values
const API_KEY = "0a29519eac815e730352925081d4147e";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const url = "https://api.themoviedb.org/3/search/movie?api_key=0a29519eac815e730352925081d4147e";


function generateUrl(path){
    const url = `https://api.themoviedb.org/3${path}?api_key=0a29519eac815e730352925081d4147e`
    return url;
    }
    
    
    function requestMovies(url, onComplete, onError) {
    
        fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
    }


    function searchMovie(value){
        const path = '/search/movie';
    
        const url = generateUrl(path) + "&query=" + value;
        requestMovies(url, renderSearchMovies, handleError);
    }

    function getUpcomingMovies(){
        const path = '/movie/upcoming';
        const url = generateUrl(path);

        const render = renderMovies.bind({title: "Upcoming movies"});
        requestMovies(url, render, handleError);
    }

    function getTopratedMovies(){
        const path = '/movie/top_rated';
        const url = generateUrl(path);
        const render = renderMovies.bind({title: "Top Rated movies"});

        requestMovies(url,render, handleError);
    }

    function getPopularMovies(){
        const path = '/movie/popular';
        const render = renderMovies.bind({title: "Most Popular Movies"});

        requestMovies(url,render, handleError);
    }