setTimeout(() => {
    arrayHistory= []
    let items = document.querySelectorAll("div")
    let items2 = document.querySelectorAll("section")
    items.forEach(element => {
        element.classList.remove("load")
    });
    items2.forEach(element => {
        element.classList.remove("load")
    });
    items.forEach(element => {
        element.classList.add("appear")
    });
    items2.forEach(element => {
        element.classList.add("appear")
    });
    const apiUrlRockets = 'https://api.spacexdata.com/v4/history';
    let xhr = new XMLHttpRequest();
    xhr.open("GET",apiUrlRockets,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status ===200){
            let response = JSON.parse(this.responseText)
            console.log(response)
            i=1
            fetchDefault(response)
        } else if(this.readyState ===4){
            console.log("Error :(",this.statusText)
        }
    }
    xhr.send();
}, 0);
function fetchDefault(data){
    let title = document.getElementById("title").innerHTML=`HISTORY`
    data.forEach(element => {
        let date=element.event_date_utc
        let newdate=date.slice(0,10).replaceAll("-","/")
        let newdiv = document.createElement("div");
        newdiv.classList.add("square")
        newdiv.innerHTML = `
        <h2 style="font-size: 1.7vi" class="color_w">${element.title}</h2>
        <p class="color_v"><b>${newdate}</b></p>
        <p style="margin-bottom:2vh; margin-left: 1vw; font-size: 1.3vi" class="color_v">${element.details}</p>
        <a href="${element.links.article}">LEARN MORE.</a>
        `;
        let historyS =document.getElementById("history");
        historyS.appendChild(newdiv)
        arrayHistory.push(element)
    })
}