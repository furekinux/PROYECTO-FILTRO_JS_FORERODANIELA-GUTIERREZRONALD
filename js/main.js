setTimeout(() => {
    arrayRockets= []
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
    const apiUrlRockets = 'https://api.spacexdata.com/v4/rockets';
    let xhr = new XMLHttpRequest();
    xhr.open("GET",apiUrlRockets,true);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status ===200){
            let response = JSON.parse(this.responseText)
            console.log(response)
            i=1
            fetchDefault(response)
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
                            let extra_L = document.getElementById("extra_left")
                            let extra_R = document.getElementById("extra_right")
                            let deco_ro = document.getElementById("deco_rocket").innerHTML = `<img class="appear" src="../storage/img/rocket_boost.svg">`
                            let deco_en = document.getElementById("deco_engine").innerHTML = `<img class="appear" src="../storage/img/engine.svg">`


                            extra_R.innerHTML = `
                            <table class="table_R appear">
                                <tr>
                                    <th>
                                        <h3>Description</h3>
                                        <p style="margin-top:1vh; font-size: 0.9vi;" class="color_w">${rocket.description}</p>
                                    </th>
                                </tr>
                            </table>
                            `
                            extra_L.innerHTML = `
                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">ALL SYSTEMS CHECK</li>
                                            <li class="color_v">Normal</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">RENDEZVOUS BURN SLOW</li>
                                            <li class="color_v">Normal</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">PREPARE RENDEZVOUS BURN</li>
                                            <li class="color_v">Normal</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir_v.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">THERMAL SHIELD</li>
                                            <li class="color_w">Applied</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">BURN GO/NO-GO</li>
                                            <li class="color_v">Normal</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir_o.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">POWER COMPLETION</li>
                                            <li class="color_w">Awaiting</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>

                            <table class="table_R appear">
                                <tr>
                                    <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
                                    <th>
                                        <ul>
                                            <li class="color_v">STATION</li>
                                            <li class="color_w">Normal</li>
                                        </ul>
                                    </th>
                                </tr>
                            </table>
                            `

                            if(rocket.landing_legs.material === null){
                                rocket.landing_legs.material = "none"
                            }else{}
                            if(rocket.active === false){
                                rocket.active = "no"
                            }else{
                                rocket.active = "yes"
                            }
                            if(rocket.engines.engine_loss_max === null){
                                rocket.engines.engine_loss_max = "none"
                            }
                            if(rocket.engines.layout===null){
                                rocket.engines.layout = "none"
                            }
                            let rocketN = document.getElementById("header__title").innerHTML = `<rocket class="appear">${rocket.name}</rocket>`
                            rocketIn.innerHTML = `
                            <h3 class="appear">ROCKET INFORMATION</h3>
                            <table class="appear table_R">
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
                                    <th class="color_v">Number of propellants</th><th class="color_w">${rocket.stages}</th><!--Hello-->
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
                            <h3 class="appear">ENGINE INFORMATION</h3>
                            <table class="appear table_R">
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
                            let imagesArr = rocket.flickr_images
                            imgIn.innerHTML = ""
                            imagesArr.forEach(image => {

                                let newimg = document.createElement("img")
                                newimg.setAttribute("src",image)
                                newimg.classList.add("imgRo")
                                newimg.classList.add("appear")
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
}, 5000);
function fetchDefault(data){
    let rocket = data[0]
    let rocketIn = document.getElementById("rocketInfo")
    let engineIn = document.getElementById("engineInfo")
    let imgIn = document.getElementById("images")
    let extra_L = document.getElementById("extra_left")
    let extra_R = document.getElementById("extra_right")

    let deco_ro = document.getElementById("deco_rocket").innerHTML = `<img class="appear" src="../storage/img/rocket_boost.svg">`

    let deco_en = document.getElementById("deco_engine").innerHTML = `<img class="appear" src="../storage/img/engine.svg">`

    extra_R.innerHTML = `
    <table class="table_R appear">
        <tr>
            <th>
                <h3>Description</h3>
                <p style="margin-top:1vh; font-size: 0.9vi;" class="color_w">${rocket.description}</p>
            </th>
        </tr>
    </table>
    `
    extra_L.innerHTML = `
    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
            <th>
                <ul>
                    <li class="color_v">ALL SYSTEMS CHECK</li>
                    <li class="color_v">Normal</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
            <th>
                <ul>
                    <li class="color_v">RENDEZVOUS BURN SLOW</li>
                    <li class="color_v">Normal</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
            <th>
                <ul>
                    <li class="color_v">PREPARE RENDEZVOUS BURN</li>
                    <li class="color_v">Normal</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir_v.svg"></th>
            <th>
                <ul>
                    <li class="color_v">THERMAL SHIELD</li>
                    <li class="color_w">Applied</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
            <th>
                <ul>
                    <li class="color_v">BURN GO/NO-GO</li>
                    <li class="color_v">Normal</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir_o.svg"></th>
            <th>
                <ul>
                    <li class="color_v">POWER COMPLETION</li>
                    <li class="color_w">Awaiting</li>
                </ul>
            </th>
        </tr>
    </table>

    <table class="table_R appear">
        <tr>
            <th><img class="vinieta" src="../storage/img/check_cir.svg"></th>
            <th>
                <ul>
                    <li class="color_v">STATION</li>
                    <li class="color_w">Normal</li>
                </ul>
            </th>
        </tr>
    </table>
    `
    if(rocket.landing_legs.material === null){
        rocket.landing_legs.material = "none"
    }else{}
    if(rocket.active === false){
        rocket.active = "no"
    }else{
        rocket.active = "yes"
    }
    if(rocket.engines.engine_loss_max === null){
        rocket.engines.engine_loss_max = "none"
    }
    if(rocket.engines.layout===null){
        rocket.engines.layout = "none"
    }
    let rocketN = document.getElementById("header__title").innerHTML = `<rocket class="appear">${rocket.name}</rocket>`
    rocketIn.innerHTML = `
    <h3 class="appear">ROCKET INFORMATION</h3>
    <table class="table_R appear">
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
            <th class="color_v">Number of propellants</th><th class="color_w">${rocket.stages}</th><!--Hello-->
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
    let imagesArr = rocket.flickr_images
    imgIn.innerHTML = ""
    imagesArr.forEach(image => {
        let newimg = document.createElement("img")
        newimg.setAttribute("src",image)
        newimg.setAttribute("referrerpolicy","no-referrer")
        newimg.classList.add("imgRo")
        newimg.classList.add("appear")
        imgIn.appendChild(newimg)
    });
}