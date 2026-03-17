const anime=[

{
title:"Naruto",
category:"shonen",
rating:4.8,
img:"https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg",
episodes:[
"https://www.youtube.com/embed/-G9BqkgZXRA",
"https://www.youtube.com/embed/-G9BqkgZXRA"
]
},

{
title:"Attack on Titan",
category:"action",
rating:4.9,
img:"https://upload.wikimedia.org/wikipedia/en/7/70/Shingeki_no_Kyojin_manga_volume_1.jpg",
episodes:[
"https://www.youtube.com/embed/MGRm4IzK1SQ",
"https://www.youtube.com/embed/MGRm4IzK1SQ"
]
},

{
title:"Demon Slayer",
category:"fantasy",
rating:4.7,
img:"https://upload.wikimedia.org/wikipedia/en/4/4b/Demon_Slayer_volume_1_cover.jpg",
episodes:[
"https://www.youtube.com/embed/VQGCKyvzIM4",
"https://www.youtube.com/embed/VQGCKyvzIM4"
]
},

{
title:"Jujutsu Kaisen",
category:"action",
rating:4.8,
img:"https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen.jpg",
episodes:[
"https://www.youtube.com/embed/pkKu9hLT-t8",
"https://www.youtube.com/embed/pkKu9hLT-t8"
]
}

];

const app=document.getElementById("app");
const search=document.getElementById("search");
const category=document.getElementById("category");
const favFilter=document.getElementById("favFilter");

let favorites=JSON.parse(localStorage.getItem("favAnime"))||[];

function toggleFav(title){

if(favorites.includes(title)){
favorites=favorites.filter(a=>a!==title);
}else{
favorites.push(title);
}

localStorage.setItem("favAnime",JSON.stringify(favorites));

filter();

}

function showAnime(list){

app.innerHTML="";

list.forEach(a=>{

const fav=favorites.includes(a.title)?"❤️":"🤍";

const card=document.createElement("div");
card.className="card";

card.innerHTML=`

<div class="fav">${fav}</div>

<img src="${a.img}">

<h3>${a.title}</h3>

<div class="rating">⭐ ${a.rating}</div>

<button class="watch">Смотреть</button>

`;

card.querySelector(".fav").onclick=()=>toggleFav(a.title);
card.querySelector(".watch").onclick=()=>openAnime(a);

app.appendChild(card);

});

}

function openAnime(anime){

app.innerHTML=`

<div class="player">

<h2>${anime.title}</h2>

<iframe id="player" src="${anime.episodes[0]}"></iframe>

<div class="episodes"></div>

<button class="back" onclick="showAnime(animeList)">⬅ Назад</button>

</div>

`;

const ep=document.querySelector(".episodes");

anime.episodes.forEach((video,i)=>{

const btn=document.createElement("button");

btn.textContent="Серия "+(i+1);

btn.onclick=()=>{
document.getElementById("player").src=video;
};

ep.appendChild(btn);

});

}

const animeList=[...anime];

function filter(){

const text=search.value.toLowerCase();
const cat=category.value;
const fav=favFilter.value;

let result=animeList.filter(a=>a.title.toLowerCase().includes(text));

if(cat!=="all"){
result=result.filter(a=>a.category===cat);
}

if(fav==="fav"){
result=result.filter(a=>favorites.includes(a.title));
}

showAnime(result);

}

search.oninput=filter;
category.onchange=filter;
favFilter.onchange=filter;

showAnime(animeList);

