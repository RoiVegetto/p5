const page = document.location.href;
let produits = {}

if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
    produits = objetProduits;
    affichagePanier();
  })
  .catch((err) => {
    console.log(err)
    document.querySelector("#cartAndFormContainer").innerHTML = "<h1>ERREUR</h1>";
  });
}

function affichagePanier() {
  let panier = JSON.parse(localStorage.getItem("panierStocké"));
  console.log(panier)
  console.log(produits)
  // Si le panier est supérieur à 0
  if (panier && panier.length != 0) {
    for (let choix of panier) {
      for (let g = 0, h = produits.length; g < h; g++) {
        if (choix._id === produits[g]._id) {
          choix.name = produits[g].name;
          choix.prix = produits[g].price;
          choix.image = produits[g].imageUrl;
          choix.description = produits[g].description;
          choix.alt = produits[g].altTxt;
          choix.quantite = parseInt(choix.quantite);
        }
      }
    }
    affiche(panier);
  } else {
    document.querySelector("#totalQuantity").textContent = "0";
    document.querySelector("#totalPrice").textContent = "0";
    document.querySelector("h1").textContent = "Votre panier est vide";
    document.querySelector("#cart__items").innerHTML = "";
  }
  modifQuantite();
  suppression();
}

// Affichage d'un panier sous forme de tableau

function affiche(panier) {
  let zonePanier = document.querySelector("#cart__items");
  console.log(panier);
  console.log(zonePanier);
  zonePanier.innerHTML = panier.map((choix) => 
  `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.couleur}" data-quantite="${choix.quantite}"> 
    <div class="cart__item__img">
      <img src="${choix.image}" alt="${choix.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${choix.name}</h2>
        <span>couleur : ${choix.couleur}</span>
        <p data-prix="${choix.prix}">${choix.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.couleur}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ).join("");
  totalProduit();
}

// Fonction de modifiaction de quantité

function modifQuantite() {
  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    cart.addEventListener("change", (eq) => {
      let panier = JSON.parse(localStorage.getItem("panierStocké"));
      for (article of panier)
        if (
          article._id === cart.dataset.id &&
          cart.dataset.couleur === article.couleur
        ) {
          article.quantite = eq.target.value;
          localStorage.panierStocké = JSON.stringify(panier);
          affichagePanier();
        }
    });
  });
}
// Fonction suppression du panier
function suppression() {
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
  cartdelete.forEach((cartdelete) => {
    cartdelete.addEventListener("click", () => {
      let panier = JSON.parse(localStorage.getItem("panierStocké"));
      for (let d = 0, c = panier.length; d < c; d++)
        if (
          panier[d]._id === cartdelete.dataset.id &&
          panier[d].couleur === cartdelete.dataset.couleur
        ) {
          const num = [d];
          let nouveauPanier = JSON.parse(localStorage.getItem("panierStocké"));
          nouveauPanier.splice(num, 1);
          if (nouveauPanier && nouveauPanier.length == 0) {
            document.querySelector("#totalQuantity").textContent = "0";
            document.querySelector("#totalPrice").textContent = "0";
            document.querySelector("h1").textContent =
              "Vous n'avez pas d'article dans votre panier";
          }
          localStorage.panierStocké = JSON.stringify(nouveauPanier);
          affichagePanier();
        }
    });
  });
}
// Fonction cout et total produit

function totalProduit() {
  let panier = JSON.parse(localStorage.getItem("panierStocké"));
  let totalArticle = 0;
  let prixCombiné = 0;
  let totalPrix = 0;
  console.log(produits);
  for (let article of panier) {
    console.log(article);
    totalArticle += parseInt(article.quantite);
    prixCombiné = parseInt(article.quantite) * produits.find(x => article._id == x._id).price;
    totalPrix += prixCombiné;
  }
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrix;
}

// Données client

if (page.match("cart")) {
  var contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient);
  var prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  var nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  var ville = document.querySelector("#city");
  ville.classList.add("regex_texte");
  var adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse");
  var email = document.querySelector("#email");
  email.classList.add("regex_email");
  var regexTexte = document.querySelectorAll(".regex_texte");
  document.querySelector("#email").setAttribute("type", "text");
}
let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
if (page.match("cart")) {
  regexTexte.forEach((regexTexte) =>
    regexTexte.addEventListener("input", (e) => {
      valeur = e.target.value;
      let regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient.firstName = prenom.value;
        contactClient.lastName = nom.value;
        contactClient.city = ville.value;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regNormal, valeur, regexTexte);
      valideClic();
    })
  );
}
texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville);
if (page.match("cart")) {
  let regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regAdresse = valeur.search(regexChiffreLettre);
    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }
    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regAdresse, valeur, regexAdresse);
    valideClic();
  });
}
texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);
if (page.match("cart")) {
  let regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regValide, valeur, regexEmail);
    valideClic();
  });
}
if (page.match("cart")) {
  email.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else if ( regValide !== 0) {
      document.querySelector("#emailErrorMsg").textContent = "Caractère non valide";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").textContent = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else {
      document.querySelector("#emailErrorMsg").textContent = "Forme email conforme.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    }
  });
}
let valeurEcoute = "";
function couleurRegex(regSearch, valeurEcoute, inputAction) {
  if (valeurEcoute === "" && regSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";
  } else if (valeurEcoute !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}
function texteInfo(regex, pointage, zoneEcoute) {
      if (page.match("cart")) {
      zoneEcoute.addEventListener("input", (e) => {
      valeur = e.target.value;
      index = valeur.search(regex);
      if (valeur === "" && index != 0) {
        document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(pointage).style.color = "white";
      } else if (valeur !== "" && index != 0) {
        document.querySelector(pointage).textContent = "Reformulez cette donnée";
        document.querySelector(pointage).style.color = "white";
      } else {
      document.querySelector(pointage).textContent = "Caratères acceptés pour ce champ.";
      document.querySelector(pointage).style.color = "white";
      }
    });
  }
}
let commande = document.querySelector("#order");
function valideClic() {
  let contactRef = JSON.parse(localStorage.getItem("contactClient"));
  let somme =
    contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  if (somme === 5) {
    commande.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    commande.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}
if (page.match("cart")) {
  commande.addEventListener("click", (e) => {
    e.preventDefault();
    valideClic();
    envoiPaquet();
  });
}

// Fonction récupération ID 

let panierId = [];
function tableauId() {
let panier = JSON.parse(localStorage.getItem("panierStocké"));
if (panier && panier.length > 0) {
  for (let indice of panier) {
    panierId.push(indice._id);
  }
} else {
  document.querySelector("#order").setAttribute("value", "Panier vide!");
}
}
let contactRef;
let commandeFinale;
function paquet() {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));
  commandeFinale = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: panierId,
  };
}
// Fonction envoi validation
function envoiPaquet() {
  tableauId();
  paquet();
  let somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  if (panierId.length != 0 && somme === 5) {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandeFinale),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = "./confirmation.html?commande="+data.orderId;
      })
      .catch(function (err) {
        alert("erreur");
      });
  }
}