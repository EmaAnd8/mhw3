
const selected=[];
initialize();

//listner per i pulsanti details
const clicks=document.querySelectorAll(".onClick");
for(click of clicks)
{
    //potrei volere selezionare più elementi per volta
    click.addEventListener('click',selectedItem);
    
}

// listner per i pulsanti dei preferiti
const buttons=document.querySelectorAll("button");
for(b of buttons)
{
    b.addEventListener('click',clickedbutton);
}


//accedo alla barra di ricerca tramite un listner onKeyUp
const keyboard= document.querySelector("#search-bar");
keyboard.addEventListener("keyup",filter);




function selectedItem(event){

   

    //punto all'elemento padre del curretTarget 
    const container=event.currentTarget.parentNode;

    
    event.currentTarget.classList.add("hidden");// nascondo il current Target
    
    //aggiungere tramite appendChild()  una description e 
    //meno dettagli
    for (let i=0;i<contenuti.length;i++)
    {
        if(contenuti[i].id===container.id)
        {
            const text=document.createElement("p");
            text.classList.add("details");
            text.textContent=contenuti[i].descrizione;
            container.appendChild(text);
            const text_det=document.createElement("p");
            text_det.textContent="less details";
            text_det.classList.add("onClick");
            text_det.classList.add("button");
            container.appendChild(text_det);
            text_det.addEventListener('click',unselectedItem);
            
            break;
        }
    }
    
    //rimuove il listner corrente
    event.currentTarget.removeEventListener('click',selectedItem);
    
    
}


function unselectedItem(event){
    const  elemento=event.currentTarget.parentNode; //elemento padre del currentTarget
    const elements=document.querySelectorAll(".hidden");//verifico la presenza di elementi hidden
    const dets=document.querySelectorAll(".details");//verifico la presenza di elementi di classe details
    for(el of elements)
    {
        if(elemento.id===el.parentNode.id) //se l'id dell'current Target  è ugiale a quello dell'elemento
        {
            
            const ev=event.currentTarget;
            ev.remove(); //rimuovo la descrizione
            el.classList.remove("hidden");//rimuovo hidden dall'elemento a cui l'avevo assegnato nella funzione precedente
            el.addEventListener('click',selectedItem);
        }
    }

    for(detail of dets)
    {
        if(elemento.id===detail.parentNode.id)
        {
            detail.remove();
           
        }
    }
  
    event.currentTarget.removeEventListener('click',unselectedItem);
    
}


function clickedbutton(event)
{

    

    //rimuove la classe removable che teneva nascosta la section 
   const elem=document.querySelector("#preferiti");
  
   elem.classList.remove("removable");
   
   const elem1=document.querySelector("#favoriti")
  
    
   
   
    //id del nodo padre     
    const selectedButton=event.currentTarget.parentNode.id;
    let i=0;
    while(i<contenuti.length){
      
            //devo sapere quale elemento  è stato cliccato per  fare l'appendChild
        if(selectedButton===contenuti[i].id){
            const container=document.createElement("div");
            container.id=contenuti[i].pref;
            elem1.appendChild(container);
            const txt=document.createElement("h2");
            txt.textContent=contenuti[i].titolo;
            container.appendChild(txt);
            const img=document.createElement("img");
            img.src=contenuti[i].immagine;
            container.appendChild(img);
            const br=document.createElement("br");
            container.appendChild(br);
            const button=document.createElement("button");
            container.appendChild(button);
            button.addEventListener('click',unclickedButton);
            selected.push(contenuti[i].pref);// per sapere quale elemento si trova nella barra dei preferiti
        }
        i++;
    }

       
   
    
    event.currentTarget.removeEventListener('click',clickedbutton);
    

}


function unclickedButton(event){
   
    const padre=event.currentTarget.parentNode;
    const sec=document.querySelector("#preferiti");
    for(let i=0;i<selected.length;i++)
    {
            if(selected[i]===padre.id)//se l'id del padre è presente in selected vuol dire che si trova tra i preferiti
            {
                padre.remove();   //rimuovo l'elemento dai preferiti
                selected.splice(i,1);//rimuovo l'elemento da selected
                event.currentTarget.removeEventListener('click',unclickedButton);    //rimuovo il listner            
            }
            if(selected.length===0)//se la lista è vuota non ho più preferiti 
            {
            sec.classList.add("removable");// la sezione torna nascosta
            break;// il ciclo finisce
            }
    }

    const buttons = document.querySelectorAll(".add");

                for(button of buttons){

                    button.addEventListener('click', clickedbutton);// aggiungo il listner

                }
    
}


function hide()// la sezione delle news ritorna nuovamente visibile  e quella di ricerca scompare
{
    const mr_hide=document.querySelector("#search-grid");
    mr_hide.classList.add("removable");
    const news=document.querySelector("#news-grid");
    news.classList.remove("hidden");
    const who=document.querySelector("#who");
    who.classList.remove("hidden");
    const who_2=document.querySelector("#populars");
    if(who_2.classList.contains("hidden")){
    who_2.classList.remove("hidden");
    }

}

function showBar(hider,el){// creo i contenuti in base al testo digitato

     
                hider.classList.remove("removable");
                const news=document.querySelector("#news-grid");
                news.classList.add("hidden");
                const who=document.querySelector("#who");
                who.classList.add("hidden");
                const who_2=document.querySelector("#populars");
                if(!who_2.classList.contains("hidden")){
                who_2.classList.add("hidden");
                }
                const container=document.createElement("div");
                const txt=document.createElement("h2");
                txt.textContent=el.titolo;
                container.appendChild(txt);
                const img=document.createElement("img");
                img.src=el.immagine;
                container.appendChild(img);
                hider.appendChild(container);
              
           
    
}

function filter(event)// necessaria per gestire la barra di ricerca
{
        const textEntered=event.currentTarget.value;// ottengo il valore del current Target
        
      
     //finchè ho figli
        
      const hider=document.querySelector("#search-grid");
     
      
      while(hider.childNodes.length)
      {
         
          hider.removeChild(hider.firstChild);
      }
      
        //gestisco i casi possili
       if(textEntered!=="")// verifico la presenza di testo
       {
          for(let elem of contenuti){
            
            if(elem.titolo.toLowerCase().indexOf(textEntered.toLowerCase())!==-1)
            {
               showBar(hider,elem);
            
            }
          }

       }
       else{
                hide();
           }
      
}

//carico i contenuti nella pagina
function initialize(){
    
    const doc=document.querySelector("#news-grid #use");
    for(let cont of contenuti)
    {
            const container=document.createElement("div");
            container.id=cont.id;
            const img=document.createElement("img");
            img.src=cont.immagine;
            container.appendChild(img);
            const br=document.createElement("br");
            container.appendChild(br);
            const button=document.createElement("button");
            button.classList.add("add");
            container.appendChild(button);
            const txt=document.createElement("h2");
            txt.textContent=cont.titolo;
            container.appendChild(txt);
            const subtitle=document.createElement("p");
            subtitle.textContent=cont.sottotitolo;
            container.appendChild(subtitle);
            const t2=document.createElement("p");
            t2.textContent="details";
            t2.classList.add("onClick");
            t2.classList.add("button");
            container.appendChild(t2);
            doc.appendChild(container);
    }
}