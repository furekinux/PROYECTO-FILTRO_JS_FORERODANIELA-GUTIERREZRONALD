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
                            let engineIn = document.getElementById("engineInfo")
                            let imgIn = document.getElementById("images")


                            if(rocket.landing_legs.material === null){
                                rocket.landing_legs.material = "none"
                            }else{}
                            if(rocket.active === false){
                                rocket.active = "no"
                            }else{
                                rocket.active = "yes"
                            }
                            let rocketN = document.getElementById("header__title").innerHTML = `${rocket.name}`
                            rocketIn.innerHTML = `
                            <h3>ROCKET INFORMATION</h3>
                            <table class="table_R">
                                <tr>
                                    <th style="width: 9vw" class="color_v">Type</th><th class="color_w">${rocket.type}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Rocket in service</th><th class="color_w">${rocket.active}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Number of stages</th><th class="color_w">${rocket.stages}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Number of propellants</th><th class="color_w">${rocket.type}</th><!--Hello-->
                                </tr>
                                <tr>
                                    <th class="color_v">Landing legs</th><th class="color_w">${rocket.landing_legs.number}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Leg material</th><th class="color_w">${rocket.landing_legs.material}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Height</th><th class="color_w">${rocket.height.meters} m</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Diameter</th><th class="color_w">${rocket.diameter.meters} m</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Mass</th><th class="color_w">${rocket.mass.kg} kg</th>
                                </tr>
                            </table>
                            `
                            engineIn.innerHTML = `
                            <h3>ENGINE INFORMATION</h3>
                            <table class="table_R">
                                <tr>
                                    <th style="width: 9vw" class="color_v">Type</th><th class="color_w">${rocket.engines.type}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Maximum power loss</th><th class="color_w">${rocket.engines.engine_loss_max}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Engine availability</th><th class="color_w">${rocket.engines.layout}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Number of engines</th><th class="color_w">${rocket.engines.number}</th><!--Hello-->
                                </tr>
                                <tr>
                                    <th class="color_v">Stage 1 fuel</th><th class="color_w">${rocket.engines.propellant_1}</th>
                                </tr>
                                <tr>
                                    <th class="color_v">Stage 2 fuel</th><th class="color_w">${rocket.engines.propellant_2}</th>
                                </tr>
                            </table>
                            `
                            rocket.flickr_images.forEach(img => {
                                newimg = document.createElement("img")
                                newimg.innerHTML = `<img src="${img}"/>`
                                imgIn.appendChild(newimg)
                                
                            });
                            
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
