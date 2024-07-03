// URL = "https://v6.exchangerate-api.com/v6/8effd3d574e3404a4746acfc/latest/USD"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList)  {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD")  {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR")  {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === ""|| amtVal < 1) {
        amtVal =1;
        amount.value ="1";
    }
console.log(fromCurr.value,toCurr.value)
const URL= `https://v6.exchangerate-api.com/v6/8effd3d574e3404a4746acfc/latest/${fromCurr.value}`;
let response = await fetch(URL);
let data = await response.json();

console.log(data)


let fromAmount = amtVal
let toAmount = toCurr.value
let exchangerates = data.conversion_rates[toAmount];

let FinalAmount = fromAmount * exchangerates
message.innerText = `${fromAmount} ${fromCurr.value} = ${FinalAmount} ${toAmount}`
    
});
