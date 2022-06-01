// Récupération donnée serveur
fetch('http://localhost:3000/api/products').then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       console.log(json);
       let products = json;
       var itemsElt = document.getElementById('items');
       for (let i = 0; i < products.length; i++) {
        itemsElt.innerHTML += '<a href="./product.html?id='+products[i]._id+'">'
        + '<article>'
        +  '<img src="'+products[i].imageUrl+'" alt="Lorem ipsum dolor sit amet, Kanap name1">'
        +  '<h3 class="productName">'+products[i].name+'</h3>'
        +  '<p class="productDescription">'+products[i].description+'</p>'
        + '</article>'
        + '</a>';
       }
   })
   .catch(function () {
       
   })
