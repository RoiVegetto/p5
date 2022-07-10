// fetch va chercher le localhost

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
    console.table(objetProduits);
    Kanap(objetProduits);
  })
  // Remplace le contenu par une erreur si l'api n'est pas lancée
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur</h1>";
  });

// Fonction pour prendre une page model de canapé

function Kanap(index) {
  let zoneArticle = document.querySelector("#items");
  for (let article of index) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}