const params = new URLSearchParams(window.location.search);

const orderId = params.get("commande");

let orderIdElt = document.querySelector("#orderId");
orderIdElt.innerHTML = '<br>'+orderId+'<br>Merci pour votre achat';
console.log("test")
console.log(orderId)

sessionStorage.clear();
localStorage.clear();