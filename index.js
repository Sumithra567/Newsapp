let API_KEY="44fdfeba797c4cbc9acc56a0811e6f1a"
let url="https://newsapi.org/v2/everything"
let searchInput=document.getElementById("searchInput")
let newsContainer=document.getElementById("newsContainer")
let loading=document.getElementById("loading")
let noData=document.getElementById("noData")
let displayNewsData=(data)=>{
    // console.log(data)
    let div=document.createElement("div")
    div.classList.add("cart");

    let image=document.createElement("img");
    image.src=data.urlToImage
    image.style.width="100%"
    image.style.height="50%"
    div.appendChild(image);

    let h3=document.createElement("h3");
    h3.innerHTML=data.author;
    h3.classList.add("author");
    div.appendChild(h3);

    let p=document.createElement("p");
    p.innerHTML=data.content;
    p.classList.add("content")
    div.appendChild(p);

    let a=document.createElement("a")
    a.innerHTML="View More"
    a.href=data.url;
    a.target="_blank";
    div.appendChild(a);
    newsContainer.appendChild(div)


}

let allNewsData=(data)=>{
    console.log(data.length==0)
    if(data.length==0){
        console.log(newsContainer)
        // noData.style.display="block";
        noData.hidden=data.length!==0;
        newsContainer.innerHTML=noData.innerHTML;

    }else{
         for(let item of data){
            
            displayNewsData(item)
        }
   
    }
}
let fetchData =async(search)=>{
    try{
        loading.style.display="block";
        let data=await fetch(`${url}?q=${search}&apiKey=${API_KEY}`)
        let jsonData=await data.json();
        loading.style.display="none";
        console.log(jsonData)
        allNewsData(jsonData.articles)
        
    }catch(error){
        console.log(error);

    }
    
}

window.onload=()=>{
    fetchData("cinema");   //to show default data when window is refreshed 
}

searchInput.addEventListener("keydown",(event)=>{
    if(event.key=="Enter"){
        newsContainer.innerHTML="";
        fetchData(searchInput.value)
        searchInput.value="";
        }
})