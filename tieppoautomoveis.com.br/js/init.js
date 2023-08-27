$(document).ready(function(){ 

    $('.example-multiple-selected').multiselect(
		{numberDisplayed: 1}
	);
	
	/* ----------- Toggle ----------- */
	$('.menu-icon').click(function(){
		$('.navigation ul').slideToggle();
		return false;
	});
	/* ----------- Toggle ----------- */
	
	/* ----------- Flex Slider ----------- */
	$('.hero-slider').flexslider({
		animation: "fade",
		slideshowSpeed: 3000,
		pauseOnAction: false,
		directionNav: false,
		controlNav: false,
	});
	/* ----------- Flex Slider ----------- */
	
	/* ----------- Tab Jquery ----------- */		
	$(".tab-content").hide(); //Hide all content
	$(".tab-nav li:first").addClass("active").show(); //Activate first tab
	$(".tab-content:first").show(); //Show first tab content
	//On Click Event
	$(".tab-nav li").click(function() {
		$(".tab-nav li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab-content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});
	/* ----------- Tab Jquery ----------- */

});