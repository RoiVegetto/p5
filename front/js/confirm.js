const params = new URLSearchParams(window.location.search);

const orderId = params.get("commande");

let orderIdElt = document.querySelector("#orderId");
orderIdElt.innerHTML = '<br>'+orderId+'<br>Merci pour votre achat';

sessionStorage.clear();
localStorage.clear();