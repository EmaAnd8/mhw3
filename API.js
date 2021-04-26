const num_res=5;
const tracks_covers=[];

//ApiKey credentials Last fm
const api_key="b26800d7f35302389d16c4cad50aed2b";
const endpoint_api_key="http://ws.audioscrobbler.com/2.0/"


//ApiKey credentials vegalume
const api_key_2="b26800d7f35302389d16c4cad50aed2b";
const enpoint_2="http://api.vagalume.com.br/hotspots.php";

//accesso ad un API di immagini per dare una cover alle tracce
const api_key_img="21268983-793773734f14eeda1fe64d1ea"
const endpoint_img="https://pixabay.com/api/"


//oAuth 2.0 credenziali ed endpoint
const enpoint="https://api.spotify.com/v1/browse/new-releases";
const get_tok="https://accounts.spotify.com/api/token";
const client_id = 'a35d910d2bce4e75a3eac2e2cd3b7bd0';
const client_secret = 'a4c1d094447941e9a57624f3cc4a32ab';


//token necessario nel protocollo oAuth
let token;



    
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

//per aggiungere alla pagina web  la top 5 delle tracce
function onJsonMusicMatch(json)
{
    if(!json){
        console.log('file non trovato');
        return;
    }
    else{
        console.log(json);
        const doc=document.querySelector("#not-static_elem_2");
        doc.innerHTML='';
        for(let i=0;i<num_res;i++)
            {
                const container=document.createElement("div");
                const img=document.createElement("img");
                img.src=tracks_covers[i];
                container.appendChild(img);
                const txt=document.createElement("h3");
                txt.textContent=json.tracks.track[i].name;
                container.appendChild(txt);
                const txt_2=document.createElement("a");
                txt_2.href=json.tracks.track[i].url;
                txt_2.textContent='clicca qui';
                container.appendChild(txt_2);
                doc.appendChild(container);
            }
        }
    }

 
//per aggiungere alla pagina web la top 5 degli artisti
function onJsonVagalume(json)
{
    if(!json){
        console.log('file non trovato');
        return;
    }
    else{
            console.log(json);
            const doc=document.querySelector("#not-static_elem_3");
            doc.innerHTML='';
            for(let i=0;i<num_res;i++)
            {
                const container=document.createElement("div");
                const img=document.createElement("img");
                img.src=json.hotspots[i].art_pic_src;
                container.appendChild(img);
                const txt=document.createElement("h3");
                txt.textContent=json.hotspots[i].title;
                container.appendChild(txt);
                const txt_2=document.createElement("a");
                txt_2.href=json.hotspots[i].link;
                txt_2.textContent='clicca qui';
                container.appendChild(txt_2);
                doc.appendChild(container);
            }
       
        }
    }

    //to add to the top five tracks cover provided by search of most famous img in music argument
    function onJsonCover(json)
    {
        if(!json){
            console.log('file non trovato');
            return;
        }
        else{
                console.log(json);
                for(let i=0;i<num_res;i++)
                {
                  tracks_covers[i]=json.hits[i].previewURL;
                }
           
            }
    }
  
    







//per aggiungere alla pagina la top five dei nuovi album usciti
function onJson(json)
{
    if(!json){
        console.log('file non trovato');
        return;
    }
    else{
        console.log(json);
        const doc=document.querySelector("#not-static_elem_1");
        doc.innerHTML='';
        for(let i=0;i<num_res;i++)
            {
                const container=document.createElement("div");
                const img=document.createElement("img");
                img.src=json.albums.items[i].images[0].url;
                container.appendChild(img);
                const txt=document.createElement("h3");
                txt.textContent=json.albums.items[i].name;
                container.appendChild(txt);
                const txt_2=document.createElement("a");
                txt_2.href=json.albums.items[i].external_urls.spotify;
                txt_2.textContent='clicca qui';
                container.appendChild(txt_2);
                doc.appendChild(container);
            }
        }
    }

    
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  
  function onTokenJson(json)
  {
    console.log(json)
    // Imposta il token global
    token = json.access_token;
  }
  
  function onTokenResponse(response)
  {
    return response.json();
  }
  
  
  
  //per richiedere il token
  fetch("https://accounts.spotify.com/api/token",
  {
 method: "post",
 body: 'grant_type=client_credentials',
 headers:
 {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
 }
}
).then(onTokenResponse).then(onTokenJson);
  // Esegui la richiesta
  



//handler per gestire la selezione del bottone
function select_discover_button(event){
 const section=document.querySelector('#populars');
 if(section.classList.contains("hidden_2")){
 section.classList.remove("hidden_2");
 }
 
 //richiesta album ultimi usciti su Spotify con oAuth 2.0 
fetch(enpoint,
  {
    headers:
    {
      'Authorization': 'Bearer ' +token
    }
  }
).then(onResponse).then(onJson);


//richiesta con apikey immagini di musica da pixabay
const request_0=endpoint_img+'?key='+api_key_img+'&q=music&image_type=photo';
fetch(request_0).then(onResponse).then(onJsonCover);

//richiesta con apikey di last.fm
const request_3=endpoint_api_key+'?method=geo.gettoptracks&country=italy'+'&api_key='+api_key+'&format=json';
fetch(request_3).then(onResponse).then(onJsonMusicMatch);

//richiesta con apikey di vagalume degli artisti più famosi
const request_1=enpoint_2+'?apikey='+api_key_2;
fetch(request_1).then(onResponse).then(onJsonVagalume);



event.currentTarget.addEventListener('click',unselect_discover_button);

event.currentTarget.removeEventListener('click',select_discover_button);
}


//per gestire la deselezione del bottone
function unselect_discover_button(event){

  const section=document.querySelector('#populars');
  if(!section.classList.contains("hidden_2")){
    section.classList.add("hidden_2");
    }
  
  event.currentTarget.addEventListener('click',select_discover_button);

}

//listner del bottone SCOPRI
const target_1=document.querySelector("#scrub-the-user");
target_1.addEventListener('click',select_discover_button);


