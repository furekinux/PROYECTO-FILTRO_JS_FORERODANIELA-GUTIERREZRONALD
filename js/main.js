arrayRockets= []
setTimeout(() => {
    let items = document.querySelectorAll("div")
    items.forEach(element => {
        element.classList.remove("load")
    });
    const apiUrlRockets = 'https://api.spacexdata.com/v4/rockets';
    let xhr = new XMLHttpRequest();
    xhr.open("GET",apiUrlRockets,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status ===200){
            let response = JSON.parse(this.responseText)
            console.log(response)
            i=1
            response.forEach(element => {
                let newbutton = document.createElement("button");
                newbutton.innerText = `${i}`;
                newbutton.id = `${element.id}`;
                let divButton =document.getElementById("buttons");
                divButton.appendChild(newbutton)
                arrayRockets.push(element)
                i=i+1
                document.getElementById(`${element.id}`).addEventListener("click", function(){
                    let url = `https://api.spacexdata.com/v4/rockets/${element.id}`
                    console.log(url)
                    xhr.open("GET",url,true);
                    xhr.onreadystatechange = function(){
                        if (this.readyState === 4 && this.status ===200){
                            let rocket = JSON.parse(this.responseText)
                            console.log(rocket)
                            let rocketIn = document.getElementById("rocketInfo")
                            if(rocket.landing_legs.material ===null){
                                rocket.landing_legs.material = "none"
                            }
                            rocketIn.innerHTML = `
                            <table>
                                <tr>
                                    <th>Type</th><th class="color_w">${rocket.type}</th>
                                </tr>
                                <tr>
                                    <th>Rocket in service</th><th class="color_w">${rocket.active}</th>
                                </tr>
                                <tr>
                                    <th>Number of stages</th><th class="color_w">${rocket.stages}</th>
                                </tr>
                                <tr>
                                    <th>Number of propellants</th><th class="color_w">${rocket.type}</th><!--Hello-->
                                </tr>
                                <tr>
                                    <th>Landing legs</th><th class="color_w">${rocket.landing_legs.number}</th>
                                </tr>
                                <tr>
                                    <th>Leg material</th><th class="color_w">${rocket.landing_legs.material}</th>
                                </tr>
                                <tr>
                                    <th>Height</th><th class="color_w">${rocket.height.meters} m</th>
                                </tr>
                                <tr>
                                    <th>Diameter</th><th class="color_w">${rocket.diameter.meters} m</th>
                                </tr>
                                <tr>
                                    <th>Mass</th><th class="color_w">${rocket.mass.kg} kg</th>
                                </tr>
                            </table>
                            `
                        } else if(this.readyState ===4){
                            console.log("Error :(",this.statusText)
                        }
                    }
                    xhr.send();

                });

            });

        } else if(this.readyState ===4){
            console.log("Error :(",this.statusText)
        }
    }
    xhr.send();
}, 1000);
