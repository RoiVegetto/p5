const params = new URLSearchParams(document.location.search);
const id = params.get("_id");

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((getArticles) => {
    lesProduits(getArticles);
  })
  .catch((err) => {
    document.querySelector(".item").textContent = "<h1>erreur</h1>";
  });
let articleClient = {};
articleClient._id = id;

// Fonction d'affichage du produit de l'api

function lesProduits(produit) {
  let imageAlt = document.querySelector("article div.item__img");
  let titre = document.querySelector("#title");
  let prix = document.querySelector("#price");
  let description = document.querySelector("#description");
  let couleurOption = document.querySelector("#colors");
  for (let choix of produit) {
    if (id === choix._id) {
      //let productImg = document.createElement("item__img");
      //productImg.src = choix.imageUrl;
      //productImg.alt = choix.altTxt;
      //imageAlt.append(productImg);
      imageAlt.innerHTML = `<img src="${choix.imageUrl}" alt="${choix.altTxt}">`;
      titre.textContent = `${choix.name}`;
      prix.textContent = `${choix.price}`;
      description.textContent = `${choix.description}`;
      articleClient.prix = `${choix.price}`;
      for (let couleur of choix.colors) {
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
      }
    }
  }
}
let choixCouleur = document.querySelector("#colors");
choixCouleur.addEventListener("input", (ec) => {
  let couleurProduit;
  couleurProduit = ec.target.value;
  articleClient.couleur = couleurProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
});

// Quantité des produits

let choixQuantite = document.querySelector('input[id="quantity"]');
let quantiteProduit;
choixQuantite.addEventListener("input", (eq) => {
  quantiteProduit = eq.target.value;
  articleClient.quantite = quantiteProduit;
  document.querySelector("#addToCart").style.color = "white";
  document.querySelector("#addToCart").textContent = "Ajouter au panier";
});
// Condition pour la validation
let choixProduit = document.querySelector("#addToCart");
choixProduit.addEventListener("click", () => {
  if (
    articleClient.quantite < 1 ||
    articleClient.quantite > 100 ||
    articleClient.quantite === undefined ||
    articleClient.couleur === "" ||
    articleClient.couleur === undefined
  ) {
    alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
  } else {
    Panier();
    document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
    document.querySelector("#addToCart").textContent = "Produit ajouté !";
  }
});
let choixProduitClient = [];
let produitsEnregistres = [];
let produitsTemporaires = [];
let produitsAPousser = [];

function ajoutPremierProduit() {
  // Si le produit enregistré est null c'est qu'il n'est pas créé
  if (produitsEnregistres === null) {
    choixProduitClient.push(articleClient);
    return (localStorage.panierStocké = JSON.stringify(choixProduitClient));
  }
}

function ajoutAutreProduit() {
  produitsAPousser = [];
  produitsTemporaires.push(articleClient);
  produitsAPousser = [...produitsEnregistres, ...produitsTemporaires];
  produitsAPousser.sort(function triage(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.couleur < b.couleur) return -1;
      if (a.couleur > b.couleur) return 1;
    }
    return 0;
  });
  produitsTemporaires = [];
  return (localStorage.panierStocké = JSON.stringify(produitsAPousser));
}

function Panier() {
  produitsEnregistres = JSON.parse(localStorage.getItem("panierStocké"));
  if (produitsEnregistres) {
    for (let choix of produitsEnregistres) {
      if (choix._id === id && choix.couleur === articleClient.couleur) {
        alert("RAPPEL: Vous aviez déja choisi cet article.");
        let additionQuantite = parseInt(choix.quantite) + parseInt(quantiteProduit);
        choix.quantite = JSON.stringify(additionQuantite);
        return (localStorage.panierStocké = JSON.stringify(produitsEnregistres));
      }
    }
    return ajoutAutreProduit();
  }
  return ajoutPremierProduit();
}