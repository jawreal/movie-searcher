async function API(myInput, div, image, director, awards, box_off, dir_lbl, aw_lbl, box_lbl, divElement, info, isNotDesktop){
  const myKey = process.env.API_KEY;
  const title = document.getElementById("title");
  const plot = document.getElementById("plot");
  const search = myInput.value.toLowerCase();
  const rate = document.getElementById("ratings");
  const char = document.getElementById("characters");
  const type = document.getElementById("type");
  const released = document.getElementById("released");
  const runtime = document.getElementById("runtime");
  const language = document.getElementById("lang");
  const genre = document.getElementById("genre");
  const country = document.getElementById("country")
  try{
    const response = await fetch(`http://www.omdbapi.com/?apikey=${myKey}&t=${search}`)
    const data = await response.json();
    if(data.Response === "False"){
      throw new Error ("Failed to fetch the API")
    }
    image.src = data.Poster;
    image.style.display = "block";
    image.style.opacity = "1"
    title.textContent = data['Title'];
    plot.textContent = data.Plot;
    div.style.opacity = "1";
    rate.textContent = data.imdbRating;
    char.textContent = `Actors: ${data.Actors}`;
    type.textContent = data.Type.toUpperCase();
    released.textContent = data.Released.toUpperCase();
    runtime.textContent = data.Runtime.toUpperCase();
    language.textContent = data.Language.toUpperCase();
    genre.textContent = data.Genre.toUpperCase();
    country.textContent = data.Country.toUpperCase();
    console.log(data)
    data_info(data, director, awards, box_off, dir_lbl, aw_lbl, box_lbl);
   
    const isOverflowingVertically = divElement.scrollHeight > divElement.clientHeight;
    
    
    if (isNotDesktop && isOverflowingVertically) {
      divElement.style.height = "500px";
      
    }
    
    
   /*const isOverflowingHorizontally = divElement.scrollWidth > divElement.clientWidth*/
    
/*    let height = 550;
    do{
      divElement.style.height = `${height}px`
      height += 20;
    }while (isOverflowingVertically);*/
 /*   if (isOverflowingHorizontally) {
    console.log("Horizontal overflow detected!");
}*/

/*
   if (data.Title.length > 15) {
     divElement.style.height = "560px";
   } */

  }catch(error){
    console.error(error);
  }
}


function data_info(data, director, awards, box_off, dir_lbl, aw_lbl, box_lbl){

  if (data.Type === "movie" && data.Awards !== "N/A" && data.BoxOffice !== "N/A"){
    director.textContent = data.Director.toUpperCase();
    awards.textContent = data.Awards.toUpperCase();
    box_off.textContent = data.BoxOffice.toUpperCase();
    director.style.display = "inline";
    awards.style.display = "inline";
    boxoff.style.display = "inline";
    dir_lbl.style.display = "inline";
    aw_lbl.style.display = "inline";
    box_lbl.style.display = "inline";
    director.style.opacity = "1";
    awards.style.opacity = "1";
    boxoff.style.opacity = "1";
    dir_lbl.style.opacity = "1";
    aw_lbl.style.opacity = "1";
    box_lbl.style.opacity = "1";
    return 
  }else{
    return
  }

  /*
  const myList = [
    [dir_lbl, director], 
    [aw_lbl, awards], 
    [box_lbl, box_off]
  ]
  
  for (let i = 0; i<myList.length; i++){
    const elements = myList[i];
    for (let elm of elements){
      cont.appendChild(elm);
    }
    cont.appendChild(break_line);
  }
  */
}


function disable(button, myInput){
  myInput.addEventListener('input', event => {
    if (!event.target.value || event.target.value.length < 0){
      document.removeEventListener('keydown', shortCutkey);
      return button.disabled = true;
    }else{
      document.removeEventListener('keydown', shortCutkey);
      return button.disabled = false;
    }
  });
}

function shortCutkey(event){
  if(event.key === 'Enter'){
    API();
  }
}


document.addEventListener('DOMContentLoaded', event => {
  const isNotDesktop = window.matchMedia("(max-width: 767px)").matches;
  const info = document.querySelector(".info");
  const divElement = document.querySelector(".imgWrap");
  const director = document.getElementById("director");
  const awards = document.getElementById("awards");
  const box_off = document.getElementById("boxoff");
  const dir_lbl = document.getElementById("director_");
  const aw_lbl = document.getElementById("awards_");
  const box_lbl = document.getElementById("boxoff_");
  const image = document.getElementById("movieImg");
  const div = document.querySelector(".imgWrap");
  const button = document.getElementById("Button");
  const myInput = document.getElementById("myInput");
  button.disabled = true;
  disable(button, myInput);
  button.addEventListener('click', event =>{
    if (div.style.opacity === "1" && image.style.display === "block"){
      image.style.display = "none"
      div.style.opacity = "0";
      director.style.display = "none";
      awards.style.display = "none";
      boxoff.style.display = "none";
      dir_lbl.style.display = "none";
       aw_lbl.style.display = "none";
      box_lbl.style.display = "none";
      director.style.opacity = "0";
      awards.style.opacity = "0";
      boxoff.style.opacity = "0";
      dir_lbl.style.opacity = "0";
      aw_lbl.style.opacity = "0";
      box_lbl.style.opacity = "0";
      if (isNotDesktop){
        divElement.style.height = "460px ";
      }else{
        divElement.style.height = "500px";
      } 
      setTimeout(() => {
       API(myInput, div, image, director, awards, box_off, dir_lbl, aw_lbl, box_lbl, divElement, info, isNotDesktop);
      }, 1000);
    }else{
      console.log(divElement.offsetHeight) 
      if (isNotDesktop) {
   divElement.style.height = "460px ";
      } else {
   divElement.style.height = "500px";
 }
      setTimeout(() => {
       API(myInput, div, image, director, awards, box_off, dir_lbl, aw_lbl, box_lbl, divElement, info, isNotDesktop);
      }, 500);
    }
  });
});
  