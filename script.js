let startWindow = document.querySelector(".start");
let payNowBtn = document.querySelector(".pay-now");
let paymentWindow = document.querySelector(".payment");
let backBtn = document.querySelector("#back");
let form = document.querySelector("form");
let result = document.querySelector(".result");
let paymentdone = document.querySelector(".payment_status");
let nav = document.querySelector(".nav");

function paymentProcess(name, amountpaid) {
    form.style.display = "none";
    nav.style.display = "none";
    paymentdone.style.display = "flex";
    setTimeout(() => {
        let promise = new Promise((res, rej) => {
            let payment = Math.random() < 0.5;
            if (payment) {
                res({ name: name, amount: amountpaid });
            } else {
                rej({ name: name, amount: amountpaid });
            }
        });
        promise
            .then((data) => {
                result.innerHTML = `
            <h3 class="status">Payment Success</h3>
            <button class="reset" onclick="window.location.reload()">make other payment</button>`;
            })
            .catch((data) => {
                result.innerHTML = `
        <h3 class="status">Payment Failed</h3>
        <button class="reset" onclick="window.location.reload()">try again</button>`;
            });
        result.style.display = "flex";
        paymentdone.style.display = "none";
        nav.style.display = "none";
    }, Math.floor(Math.random() * 1000) + 100);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.children[0].children[1].value;
    let amountpaid = e.target.children[1].children[1].value;
    paymentProcess(name, amountpaid);
});

payNowBtn.addEventListener("click", () => {
    startWindow.style.display = "none";
    paymentWindow.style.display = "block";
    result.style.display = "none";
    form.style.display = "flex";
});
backBtn.addEventListener("click", () => {
    paymentWindow.style.display = "none";
    startWindow.style.display = "block";
});