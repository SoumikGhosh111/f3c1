// apiKey = "c332cac9"; 

let container = document.querySelector(".container"); 
let search = container.querySelector(".search-bar");
let apiKey = container.querySelector(".apikey");  
let movieGrid  = container.querySelector(".movie-grid"); 
let Loader = container.querySelector(".loader"); 

search.addEventListener("keydown", (e)=>{ 
    if(e.key === "Enter"){  
        reset(); 
        Loader.classList.remove("opacity"); 
        setTimeout(() => {
            fetchMovieData(search.value.trim(), apiKey.value.trim());
        }, 1000);

    }
});
    async function fetchMovieData(str, api){ 
        try{ 
            const endPoint = `https://www.omdbapi.com/?s=${str}&apikey=${api}`; 
            const response = await fetch(endPoint); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json(); 
            if (result.Response === "False") {
                if (result.Error === "Incorrect IMDb ID.") {
                    // Handle API key mismatch error here
                    alert("Invalid API Key! Please check your API Key.");
                    location.reload(); 
                } else {
                    throw new Error(result.Error);
                    window.location.reload();
                }
            }
            console.log(result.Search);
            printMovieData(result.Search); 
            if(api === ""){ 
                alert(result.Error); 
            }else if(str === ""){ 
                alert("Movie name not provied"); 
                location.reload(); 
            }
        }
        catch(e){ 
            alert(e); 
            window.location.reload();
        }
    }

function printMovieData(data){ 
    Loader.classList.add("opacity"); 
    
    for(let i = 0; i<data.length; i++){ 
        let card = document.createElement("div"); 
        card.className = "card"
        card.innerHTML = `
        <div class="inner-card">
            <img src="${data[i].Poster}" alt="No Poster Image">
        </div>
        <h3>${data[i].Title}</h3>
        <div class="anchor">
            <a href="https://www.imdb.com/title/${data[i].imdbID}" target="_blank">More Details</a>
            <div class="underline"></div>
        </div>
        `
         movieGrid.appendChild(card); 
    }
    
    
}

function reset(){ 
    movieGrid.innerHTML = ""; 
}
{/* <div class="card">
        <div class="inner-card">
            <img src="${movie.Poster}" alt="">
        </div>
        <h3>${movie.Search.Title}</h3>
    </div> */}