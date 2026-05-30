let accidentDetected = false;

function startDetection() {

    accidentDetected = false;

    document.getElementById("status").innerText =
        "Monitoring Started";

    window.addEventListener(
        "devicemotion",
        detectAccident
    );
}

function detectAccident(event) {

    if (accidentDetected) return;

    let acc =
        event.accelerationIncludingGravity;

    if (!acc) return;

    let x = Math.abs(acc.x || 0);
    let y = Math.abs(acc.y || 0);
    let z = Math.abs(acc.z || 0);

    let force = x + y + z;

    document.getElementById("status").innerText =
        "Force : " + force.toFixed(2);

    if (force > 18) {

        accidentDetected = true;

        navigator.geolocation.getCurrentPosition(

            function(position) {

                let latitude =
                    position.coords.latitude;

                let longitude =
                    position.coords.longitude;

                document.getElementById("status").innerText =
                    "🚨 Accident Detected";

                fetch("/alert", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        latitude: latitude,
                        longitude: longitude

                    })

                });

            },

            function(error) {

                document.getElementById("status").innerText =
                    "GPS Permission Denied";

                console.log(error);
            }

        );

        window.removeEventListener(
            "devicemotion",
            detectAccident
        );
    }
}

setInterval(checkStatus, 1000);

function checkStatus() {

    fetch("/status")
        .then(response => response.json())
        .then(data => {

            if (data.status === "ACCIDENT") {

                const status =
                    document.getElementById("status");

                status.innerText =
                    "🚨 Accident Detected";

                status.classList.add("accident");

                if (document.getElementById("location")) {

                    document.getElementById("location").innerHTML =

                        "📍 Latitude : " +
                        data.latitude +

                        "<br>📍 Longitude : " +
                        data.longitude;
                }
            }
        })
        .catch(error => {

            console.log(error);

        });
}

function checkStatus() {

    fetch("/status")
        .then(response => response.json())
        .then(data => {

            if (data.status === "ACCIDENT") {

                const status =
                    document.getElementById("status");

                status.innerText =
                    "🚨 Accident Detected";

                status.classList.add("accident");

                document.getElementById("time")
                    .innerText =
                    "🕒 Time : " + data.time;

                document.getElementById("location")
                    .innerHTML =

                    "📍 Latitude : " +
                    data.latitude +

                    "<br>📍 Longitude : " +
                    data.longitude;

                const mapLink =
                    document.getElementById("mapLink");

                mapLink.style.display =
                    "inline-block";

                mapLink.href =
                    "https://maps.google.com/?q="
                    + data.latitude +
                    "," +
                    data.longitude;
            }
        });
}

function resetSystem() {

    fetch("/reset", {
        method: "POST"
    })
    .then(() => {

        location.reload();

    });
}