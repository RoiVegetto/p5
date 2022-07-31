// Récupération des articles de l'API
async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
  }

getArticles("http://localhost:3000/api/products")
  .catch(alert);


// Répartition des données de l'API dans le DOM
async function Kanap() {
  let result = await getArticles()
      .then(function (resultatAPI) {
          const articles = resultatAPI;
          console.table(articles);
          for (let article in articles) {

              let productLink = document.createElement("a");
              document.querySelector(".items").append(productLink);
              productLink.href = "product.html?id=" + resultatAPI[article]._id;

              let productArticle = document.createElement("article");
              productLink.append(productArticle);

              let productImg = document.createElement("img");
              productArticle.append(productImg);
              productImg.src = resultatAPI[article].imageUrl;
              productImg.alt = resultatAPI[article].altTxt;

              let productName = document.createElement("h3");
              productArticle.append(productName);
              productName.innerText = resultatAPI[article].name;
              productName.className = ("productName");

              let productDescription = document.createElement("p");
              productArticle.append(productDescription);
              productDescription.innerText = resultatAPI[article].description;
              productDescription.className = ("productDescription")
          }
      })
      .catch(function (error) {
          return error;
      });
}

Kanap();