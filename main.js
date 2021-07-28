


//selecting elements from the DOM
const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const movieSearchable = document.querySelector("#movies-searchable");
const moviesContainer = document.querySelector("#movies-container");

const message = document.querySelector("#result-message");






function movieSection(movies){
    const section = document.createElement('section');
    section.classList = 'section';
    section.classList.add('splide__list');
   
 
   
   movies.map((movie) =>{
       if(movie.poster_path) {
            const img = document.createElement('img');
            img.src = IMAGE_URL+ movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);
            img.classList.add('splide__slide')
       
           section.appendChild(img);
       }
     
   })
       return section;
}



function createMovieContainer(movies, title ='') {
const movieElement = document.createElement('div');
movieElement.setAttribute('class','movie');
movieElement.classList.add('splide__track');


const header = document.createElement("h2");
header.innerHTML = title;


const content = document.createElement('div');
content.classList = 'content';

const contentClose = `<p id="content-close">Close</p>`

content.innerHTML = contentClose;

const section = movieSection(movies);


movieElement.appendChild(header);
movieElement.appendChild(section);
movieElement.appendChild(content);
return movieElement;

}


function renderSearchMovies(data){
  //data.result[]
  movieSearchable.innerHTML="";

  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  movieSearchable.appendChild(movieBlock);
  console.log('Data:', data);
    
}

function renderMovies(data){
    //data.result[]
    
    movieSearchable.innerHTML="";
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock);
    
      
  }






function handleError(error){
    console.log('Error: ', error)
}


buttonElement.onclick = function(event){
    event.preventDefault();
    var value = inputElement.value; 
    const path = '/search/movie';
    

  const newUrl = generateUrl(path) + "&query=" + value;

  fetch(newUrl)
  .then((res) => res.json())
  .then(renderSearchMovies)
  .catch((error) => {
      console.log('Error:', error);
  });


if(value == "" || value == undefined){
    message.innerHTML= "Please enter a movie name."
    }
    else {

           message.innerHTML = "Here are some matching results"
     }
  



   inputElement.value = "";

   
}


function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen =true;

    return iframe
}

function createVideoTemplate(data, content){
    //TODO
       //Display movie videos
       content.innerHTML = '<p id="content-close" style="font-size: bold; color:white;">X</p>';
       console.log('Videos: ', data);
       const videos = data.results;
       
       const length = videos.length > 4 ? 4 :videos.length;

       const iframeContainer = document.createElement('div');

       for(let i = 0; i < length; i++)
       {
         const video = videos[i]; //video
         const iframe = createIframe(video);
         iframeContainer.appendChild(iframe);
         content.appendChild(iframeContainer);
       }

       if (length === 0 || length === null)
       {
         
         content.innerHTML = '<p id="content-close" style="font-size: bold; color:white;">X <br> <br> Sorry! No videos found for this movie.</p>'
       }

}

//event delegation
document.onclick = function(event) {
    const target = event.target;
    

    if(target.tagName.toLowerCase() === 'img')
    {
        const movieId = target.dataset.movieId;
        console.log('MovieID:', movieId)
        const section = event.target.parentElement; //targetting the section
        const content = section.nextElementSibling; //targetting content
        content.classList.add('content-display');

        
        
    const path =`/movie/${movieId}/videos`    
    const url = generateUrl(path)


    //fetch movie videos

    fetch(url)
   .then((res) => res.json())
   .then((data) => createVideoTemplate(data, content))
       
  
   .catch((error) => {
       console.log('Error:', error);
   })
        



    }
     
    if(target.id ==='content-close'){
        const content = target.parentElement;
        content.classList.remove('content-display');

    }

}


getUpcomingMovies();
getTopratedMovies();
getPopularMovies();