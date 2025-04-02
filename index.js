
const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');

form.addEventListener('submit', async e => {

    e.preventDefault();
    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;

    try { 
        coinInfo.innerHTML = `<div class="loader"></div>`;
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOURS;
        const pricelow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        console.log(response.RAW[cryptoSelected][coinSelected].PRICE);
      
      
        if (amountValue != "") {
            const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
            coinInfo.innerHTML = ` 
            <p class="info">El Precio es: <span class="price">${price}</span></p>
            <p class="info">El Precio mas alto es: <span class="price">${priceHigh}</span></p>
            <p class="info">El Precio mas bajo es: <span class="price">${pricelow}</span></p>
            <p class="info"> Variacion 24h: <span class="price"></span>${variation}%</p>
            <p class="info"> Puede Comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span></p> `; 
        }
        else{

            
            coinInfo.innerHTML = ` 

            <p class="info">El Precio es: <span class="price">${price}</span></p>
            <p class="info">El Precio mas alto es: <span class="price">${priceHigh}</span></p>
            <p class="info">El Precio mas bajo es: <span class="price">${pricelow}</span></p>
            <p class="info"> Variacion 24h: <span class="price"></span>${variation}%</p>
           `;

        }

    }
    catch (error) {
        console.error();
    }

}
);

// // const response = await (await fetch(https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected})).json();
// //     const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE ;
// const response = await (await fetch(https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected})).json();
