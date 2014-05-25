$(function() {
	// products in our database all have unique sku value. 
	// The sku value will stored as arbitrary data in the $('li'), 
	// "sku": "9150", which can be set or retrieved with the .data method

	// As soon as the DOM is ready draw our entire shopping list
	for (var i=0; i < default_products.length; i++) {

		$('<li>')
			.append('<img src=' + default_products[i].thumbnail + '>')
			.append('<p>SKU: '+ default_products[i].sku + ': ' + default_products[i].name +'</p>')
			.append('<button>Add</button>')
			.addClass('item') 
			.data("sku", default_products[i].sku)
			.appendTo('.products');

	}
	
	// Shopping Cart Model is a simple dictionary with the 
	// product sku as the key and the value is the quantity
	// added to the cart.
	var cart = {
		// ricks: 1,
		// rolls: 1000
	};

	// Click Add in shopping list
	$('.products button').on('click', function() {
		
		// Get our sku for the product clicked
		var skuValue = $(this).parent().data('sku');
		if (cart[skuValue]) {
			cart[skuValue]++;
		} else {
		 	cart[skuValue] = 1;
		}

		renderView();

	});

	// Click Remove One
	// If your target is not going to exist until after the page is loaded,
	// Then you have to write all of your events slightly differently. The
	// way that its different, is that now the second argument is the target
	$('body').on('click', '.cart button', function() {
		var className = $(this).parent().attr('class');
		// item is always the first class, split string into array
		// and get second element
		className = className.split(' ')[1];
		
		if (cart[className] > 1) {
			cart[className]--;
		} else {
			delete cart[className];
		}

		renderView();
	});

	// Remove All
	$('.remove-all').on('click', function() {

		// loop and delete all contents
		// for (i in cart) {
		// 	delete cart[i];
		// }

		// A better way, just reset the cart object
		cart = {};

		renderView();
		
	});



	// Render the View
	var renderView = function() {

		// Wipe out whatever DOM is currently in the cart
		$('.cart').html('');
		var num_items_in_cart = 0;
		// Loop the entire cart, and build the whole thing
		// item_in_cart is the key
		for (item_in_cart in cart) {
			num_items_in_cart++;

			$('<li>')
				.append('<p>' + item_in_cart + ': ' + cart[item_in_cart] + '</p>')
				.append('<button>Remove One</button>')
				.addClass("item " + item_in_cart)
				.appendTo('.cart');

		}

		//if num_items_in_cart is empty, hide the remove-all button and 
		// print a message stating the cart is empty, as a list item
		if (num_items_in_cart==0) {
			$('<li>')
				.append("Your Cart is Empty")
				.appendTo('.cart');
			$('.remove-all').hide();
		}
		else {
			$('.remove-all').show();
		}

	}

	// As soon as the page loads, we render the whole thing
	renderView();

});