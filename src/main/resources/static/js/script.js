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

        document.getElementById("status").innerText =
            "🚨 Accident Detected";

        fetch("/alert", {
            method: "POST"
        });

        window.removeEventListener(
            "devicemotion",
            detectAccident
        );
    }
}

setInterval(checkStatus, 1000);

function checkStatus() {

    fetch("/status")
        .then(response => response.text())
        .then(data => {

            if (data === "ACCIDENT") {

                const status =
                    document.getElementById("status");

                status.innerText =
                    "🚨 Accident Detected";

                if (data === "ACCIDENT") {

                    const status =
                        document.getElementById("status");

                    status.innerText =
                        "🚨 Accident Detected";

                    status.classList.add("accident");
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}