emailjs.init({
    publicKey: "vRr0HdSpEgBXVzjWF",
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    emailjs.sendForm(
        "service_dzsbp2b",
        "template_9vamgf1",
        this
    )
    .then(() => {

        alert("Message sent!");

        form.reset();

    })
    .catch((error) => {

        console.error(error);

        alert("Failed to send.");

    });

});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.3
    }
);

document
    .querySelectorAll(".hero2")
    .forEach(el => observer.observe(el));


function updateText(text, id){

    let delay = 200;
	let h1 = document.getElementById(id);

    h1.innerHTML = text.split("").map(letter => {
        return `<span>` + letter + `</span>`;
    }).join("");

    Array.from(h1.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
        }, index * 60 + delay);
    });
}

updateText("Currently for sale!!!", "title");
updateText("Contact me!!", "title2");
updateText("CD Burning!!", "title3");

let players = [
    {
        name : "Venturer 3CD Changer",
        subname : "A 3CD player with multiple features.",
        price : "$35 USD",
        desc : "This CD player can hold up to 3 CDs and has buttons for play/stop, disc select, and foward/rewind aswell as loop. It also comes with a functioning Radio and Cassette Player, along with two speakers. The speakers are wired into the player and there is a volume dial for turning up and down. There is also a headphone jack present. It does not come with the remote.",
    },
    {
        name : "WW Compact Disc Changer",
        subname : "A smaller 3CD player.",
        price : "$30 USD",
        desc : "This CD player can hold up to 3 CDs and has buttons for disc select, foward and rewind, stop and play, and pause, loop, aswell as a program button. It also comes with a functioning Radio. A cassette player is also present but broken (no clue how to fix those). It comes with two functioning speakers that can be unplugged from the player and a volume dial is present on the player. There is also a headphone jack. It does not come with the remote.",
    },
];

let cdItems = document.getElementsByClassName("cditem");
let curIndex = 999;

function renderPlayers(ind) {
    let str = "";

    for (var i = 0; i < players.length; i++) {
        let pl = players[i];

        if (i != ind) {
            str += `<div class='cditem' id='index${i}'>
                        <input type="image" class="cdimage" src="imgs/cdplayer${i+1}.jpg"/>
                        <h1>${pl.name}</h1>
                        <p>${pl.subname}</p>
                        <button class='cdbutton' type='button' style='display: none; position: absolute; bottom: 0; left: 20%'>I want to buy you!</button></div>`;
        } else {
            str += `<div class='cditem' id='index${i}' style='width:512px; height:1000px;'>
                        <input type="image" class="cdimage" src="imgs/cdplayer${i+1}.jpg" style='width:500px;'/>
                        <h1>${pl.name}</h1>
                        <p>${pl.subname}</p><br>
                        <div style='width:100%; height:475px; text-align:left; position:relative'>
                        <h1 style='font-size:30px; color:lime'>Price: ${pl.price}</h1>
                        <p style='margin-left:8px;'>${pl.desc}</p>
                        <button class='cdbutton' type='button' style='position: absolute; bottom: 0; left: 20%'>I want to buy you!</button></div></div>`;
        }
    }

    document.getElementsByClassName("cds")[0].innerHTML = str;

    setButtons();

    for (var i = 0; i < players.length; i++) {
        let cdItem = cdItems[i];

        cdItem.addEventListener("click", function() {
            var butts = document.getElementsByClassName("cdbutton");
            var hovered = false;

            for (var i = 0; i < butts.length; i++) {
                if (butts[i].matches(":hover")) {hovered = true;}
            }

            if (!hovered) {
                var ind = parseInt(cdItem.id.replace("index",""));
                var col = document.getElementsByClassName("collection")[0];

                if (curIndex != ind) {curIndex = ind; col.style.height = "1100px";}
                else {curIndex = 999; ind = 999; col.style.height = "700px";}

                renderPlayers(ind);
            }
        });
    }
}

renderPlayers();

function setButtons() {
    let cdButtons = document.getElementsByClassName("cdbutton");

    for (var i = 0; i < cdButtons.length; i++) {
        var cdButton = cdButtons[i];

        cdButton.addEventListener("click", function() {
            var msg = document.getElementById("message");
            var nme = document.getElementById("title2");
            if (curIndex != 999) {
                var player = players[curIndex];
                console.log("test");

                msg.value = `Hello, I would like to purchase the ${player.name} for ${player.price}.`

                nme.scrollIntoView({behavior: "smooth"});
            }
        });
    }
}

const calc = document.getElementById("lengthCalculate");

calc.addEventListener("submit", function(e) {

    e.preventDefault();

    var val = document.getElementById("length").value;
    var output = parseInt(val, 10);

    output = Math.ceil(output/80);

    var outdiv = document.getElementById("outputButton");
    outdiv.innerHTML = `
        <button id='confirmButton' type='button' style='width: auto;'>Let's buy ${output} CD${(output == 1) ? "" : "s"} for $${5*output}!</button>
    `;

    var outButton = document.getElementById("confirmButton");

    outButton.addEventListener("click", function() {

        var msg = document.getElementById("message");
        var nme = document.getElementById("title2");

        msg.value = `Hello, I would like to burn ${val} minutes of audio onto ${output} CD${(output == 1) ? "" : "s"} for $${5*output}.`

        nme.scrollIntoView({behavior: "smooth"});

    });

});