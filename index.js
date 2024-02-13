
//527567c1305a4f4585f5eed4f593de16
// Fetching Data Through Promise

const sports = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=527567c1305a4f4585f5eed4f593de16"
const technology = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=527567c1305a4f4585f5eed4f593de16"
const science = "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=527567c1305a4f4585f5eed4f593de16"
const entertainment = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=527567c1305a4f4585f5eed4f593de16"
const breakingnews = "https://newsapi.org/v2/top-headlines?country=in&apiKey=527567c1305a4f4585f5eed4f593de16"
const health = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=527567c1305a4f4585f5eed4f593de16"
const business = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=527567c1305a4f4585f5eed4f593de16"

let topics = [health, science, technology, sports, breakingnews, entertainment, business];
let topics_name = ["Health", "Science", "Technology", "Sports", "Breaking News", "Entertainment", "Business"];

for (let k = 0; k < topics.length; k++) {
    let new_header = document.createElement('h2');
    let new_div = document.createElement('div');
    let btn_id = `btn${k}`;
    new_header.id = `topic${k}`;
    new_div.className = `${topics_name[k]}`
    new_header.innerHTML = `${topics_name[k]} <hr> <button type="button" class="btn btn-outline-warning" id = "${btn_id}" onclick = "Display('${btn_id}','${topics_name}_card')">Show More</button>`;
    new_header.style = "margin:20px; font-weight:700;font-family: sans-serif;"
    new_div.style = "display:grid; grid-template-columns: repeat(3, 1fr); grid-gap: 20px; margin: 20px;"
    new_div.innerHTML = ``;
    let content = document.querySelector('div.main_container');
    content.appendChild(new_header);
    content.appendChild(new_div);

}

for (let j = 0; j < topics_name.length; j++) {
    if(j>6){
        break;
    }
    const myPromise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${topics[j]}`, true);
        xhr.getResponseHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let jsonData = JSON.parse(xhr.responseText);
                resolve(jsonData);
            }
            else {
                console.log("ERROR !!!");
                reject();
            }
        }
        xhr.send();
    })
    myPromise.then(function (jsonData) {
        addData(jsonData);
    })
        .catch(function () {
            console.log("Error Occured");
        })

    function addData(jsonData) {
        for (let i = 0; i < jsonData.articles.length; i++) {

            let modified = jsonData.articles[i].publishedAt;
            modified = modified.substring(0, 10) + " at" + " " + modified.substring(12, 19);
            let new_elem = document.createElement('div');
            new_elem.className = `${topics_name}_card`;
            new_elem.innerHTML =
                `<div class = "card" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${jsonData.articles[i].urlToImage}" class="img-fluid rounded-start" height = "100%" >
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"><b>${jsonData.articles[i].title}</b></h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card-body">
                        <p class="card-text">${jsonData.articles[i].description}</p>
                        <center><a class="btn btn-primary" href="${jsonData.articles[i].url}" target="_blank">Read More</a>
                        <p class="card-text"><small class="text-body-secondary">Last updated: ${modified}</small></p></center>
                    </div>
                </div>
            </div>
            </div>`

            let cont = document.querySelector(`div.${topics_name[j]}`); // selecting div element of class container
            cont.appendChild(new_elem);
        }
    }
}

/*function Display(id, class_name) {
    
}*/


