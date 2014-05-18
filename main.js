$(function() {

	// Model
	var cart = {
		// ricks: 1,
		// rolls: 1000
	};

	// Click Add
	$('.products button').on('click', function() {
		
		// Get our class name resource
		var className = $(this).parent().attr('class');
		// item is always the first class, split string into array
		// and get second element
		className = className.split(' ')[1];
		// Update our Model
		if (cart[className]) {
			cart[className]++;
		} else {
		 	cart[className] = 1;
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
		for (i in cart) {
			num_items_in_cart++;

			$('<li>')
				.append('<p>' + i + ': ' + cart[i] + '</p>')
				.append('<button>Remove One</button>')
				.addClass("item " + i)
				.appendTo('.cart');

		}

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