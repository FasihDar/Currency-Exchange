document.getElementById('flip-button').addEventListener('click', () => {
    const currencyOne = document.getElementById('currency-one');
    const currencyTwo = document.getElementById('currency-two');
    const amountOne = document.getElementById('amount-one').value;
    
    const tempCurrency = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempCurrency;

    const rateOneText = document.getElementById('rate-one').innerText;
    const rateTwoText = document.getElementById('rate-two').innerText;
    document.getElementById('rate-one').innerText = rateTwoText;
    document.getElementById('rate-two').innerText = rateOneText;

    const conversionRateText = document.getElementById('conversion-rate').innerText;
    document.getElementById('conversion-rate').innerText = conversionRateText.split(' = ').reverse().join(' = ');

    convertCurrency();
});

function convertCurrency() {
    const currencyOne = document.getElementById('currency-one').value;
    const currencyTwo = document.getElementById('currency-two').value;
    const amountOne = document.getElementById('amount-one').value;
    const amountTwo = document.getElementById('amount-two');

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currencyTwo];
            amountTwo.value = (amountOne * rate).toFixed(2);

            document.getElementById('rate-one').innerText = `1 ${currencyOne}`;
            document.getElementById('rate-two').innerText = `${rate.toFixed(2)} ${currencyTwo}`;
            document.getElementById('conversion-rate').innerText = `1 ${currencyOne} = ${rate.toFixed(6)} ${currencyTwo}`;
        });
}
convertCurrency();

document.getElementById('currency-one').addEventListener('change', convertCurrency);
document.getElementById('currency-two').addEventListener('change', convertCurrency);
document.getElementById('amount-one').addEventListener('input', convertCurrency);