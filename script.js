var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $('.cart-list').empty();
    
    var listValue = 0
    for (let i=0; i < cart.length; i++){
      icart = cart[i]
      listValue += (icart.price*icart.qty);
      var source = $('#cart-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(icart);
      $('.cart-list').append(newHTML);
    }
    $('.total').text(listValue)
    
  
  
  }

  var _findItem = function(item){

    
    var obj = cart.find(o => o.name === item.name);
    return obj;

  }

  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    var existItem = app._findItem(item);
    if(existItem != undefined){
      item.qty += 1
    }
    else{
      item.qty = 1;
      cart.push(item);
    }
    
  }

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    
    cart = [];
    app.updateCart();
  }

  var removeItem = function (item) {
    // TODO: Write a function that clears the cart ;-)
    var index = cart.map((o) => o.name).indexOf(item);
    if (cart[index].qty === 1){
        cart.splice(index,1)
    }
    else
       cart[index].qty -= 1
    app.updateCart();
  }

  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    _findItem: _findItem,
    removeItem: removeItem
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page
  var item = $(this).parents().closest('.card.item').data();
  app.addItem(item);
  app.updateCart();
});

$('.clear-cart').on('click', function () {
  app.clearCart();
});

$('.cart-list').on('click', '.remove' , function () {
  itemName = $(this).parent().data().iname
  app.removeItem(itemName);
});