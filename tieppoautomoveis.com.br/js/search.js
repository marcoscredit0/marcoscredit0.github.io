function slugify(text)
{
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
/**************************************/
/*** FormulÃ¡rio de busca com select ***/
/**************************************/
$(function(){
	
	if($("#map").length>0) setCoveredAreaGeolocation($("#map").attr("latitude"), $("#map").attr("longitude"));
	
	$('.pagination li a').click(function(){
		var page = $(this).attr('page');
		search(page);
	});
	
    /*
    $('#formBusca').on('change', function(){}, function(){
        var data = $('#formBusca').serialize()
        $('.loader').show()
        $.post($('base').attr('href') + 'get-filter-list', data, function(response){
            $('#formBusca').html(response);   
            $('.loader').hide()
        });
    })
    */


    $('#formBusca').submit(function(e){
        e.preventDefault()
        var url = $(this).attr('action')
        
        var maker = 'brand=id_' + $('#maker').val()
        var maker_name = slugify($('#maker option:selected').text())

        var model = 'brand=model=id_' + $('#model').val()
        var model_name = slugify($('#model option:selected').text())
		
		var year_min = 'year=model=min_'+$('#year_min').val()
        var year_min_name = slugify($('#year_max option:selected').text().toLowerCase())

        var year_max = 'year=model=max_'+$('#year_max').val()
        var year_max_name = slugify($('#year_max option:selected').text().toLowerCase())

        var price = $('#price').val()		
        var price_name = slugify($('#price option:selected').text().toLowerCase())

        var args = '';
        var fake_args = ''

        if (maker) {
            args += maker;
            fake_args += maker_name;
        }

        if (model) {
            if (args != '') {
                args += '-' + model;
                fake_args += '-' + model_name;
            }else{
                args += model;
                fake_args += model_name;
            }                
        }
		
		if (year_min) {
            if (args != '') {
                args += '-' + year_min;
                fake_args += '-' + year_min_name;
            }else{
                args += year_min;
                fake_args += year_min_name;
            }        
		}
		
        if (year_max) {
            if (args != '') {
                args += '-' + year_max;
                fake_args += '-' + year_max_name;
            }else{
                args += year_max;
                fake_args += year_max_name;
            }                
        }

        if (price) {
            if (args != '') {
                args += '-' + price;
                fake_args += '-' + price_name;
            }else{
                args += price;
                fake_args += price_name;
            }                
        }


        url = url.replace('{args}', args)
        url = url.replace('{fake_args}', fake_args)

        location.href = url;
        return false;
      
    })
    

    //generalValidation();
    loadSearch();

}); 




function setCoveredAreaGeolocation(latitude, longitude){
	var map;
	var marker;
	var latlng = new google.maps.LatLng(latitude, longitude);

	var options = {
		zoom: 13,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map"), options);

	marker = new google.maps.Marker({
		map: map,
		draggable: true,
	});

	marker.setPosition(latlng);
}


function search(page){
        var url = $('#formSearch').attr('action');
        
        if ($('.year:checked').val()!=undefined){
            var year = $('.year:checked').val()
            var year_name = slugify($('.year:checked').parents('label').text().toLowerCase())

            var year_min = 'year=model=min_'+year;
            var year_min_name = year_name;

            var year_max = 'year=model=max_'+year;
            var year_max_name = year_name;
        }
        
        if ($('.maker:checked').val()!=undefined){
            var maker = $('.maker:checked').val()
            var maker_name = slugify($('.maker:checked').parents('label').text())
        }
        
        if ($('.model:checked').val()!=undefined){
            var model = $('.model:checked').val()
            var model_name = slugify($('.model:checked').parents('label').text())
        } 

        if ($('.price:checked').val()!=undefined){
            var price = $('.price:checked').val().split("-");
            var price_min = 'price=min_'+price[0]
            var price_max = 'price=max_'+price[1]


            var price_name = $('.price:checked').parents('label').text()
            price_name = price_name.split("-")
            var price_min_name = slugify(price_name[0])
            var price_max_name = slugify(price_name[1])
        }

        if ($('.odometer:checked').val()!=undefined){
            var odometer = $('.odometer:checked').val().split("-");
            var odometer_min = 'odometer=min_'+odometer[0]
            var odometer_max = 'odometer=max_'+odometer[1]


            var odometer_name = $('.odometer:checked').parents('label').text()
            odometer_name = odometer_name.split("-")
            var odometer_min_name = slugify(odometer_name[0])
            var odometer_max_name = slugify(odometer_name[1])
        }

    

        var args = '';
        var fake_args = ''


        if (page) {
            args += 'page_';
            args += page;
            fake_args += 'pagina-';
            fake_args += page;
        }

        if ($('.maker:checked').val()!=undefined){
            if (args != '') {
                args += '-' + maker;
                fake_args += '-' + maker_name;
            }else{
                args += maker;
                fake_args += maker_name;
            }         
        }

        
        if ($('.model:checked').val()!=undefined){
            if (args != '') {
                args += '-' + model;
                fake_args += '-' + model_name;
            }else{
                args += model;
                fake_args += model_name;
            }                
        }

        if ($('.year:checked').val()!=undefined){
            if (args != '') {
                args += '-' + year_min;
                fake_args += '-' + year_min_name;
            }else{
                args += year_min;
                fake_args += year_min_name;
            }                
        }

        if ($('.year:checked').val()!=undefined){
            if (args != '') {
                args += '-' + year_max;
                fake_args += '-' + year_max_name;
            }else{
                args += year_max;
                fake_args += year_max_name;
            }                
        }

        if ($('.price:checked').val()!=undefined){
            if (args != '') {
                args += '-' + price_min;
                fake_args += '-' + price_min_name;

                args += '-' + price_max;
                fake_args += '-' + price_max_name;
            }else{
                args += price_min;
                fake_args += price_min_name;

                args += '-' + price_max;
                fake_args += '-' + price_max_name;
            }                
        }

        if ($('.odometer:checked').val()!=undefined){
            if (args != '') {
                args += '-' + odometer_min;
                fake_args += '-' + odometer_min_name;

                args += '-' + odometer_max;
                fake_args += '-' + odometer_max_name;
            }else{
                args += odometer_min;
                fake_args += odometer_min_name;

                args += '-' + odometer_max;
                fake_args += '-' + odometer_max_name;
            }                
        }



        url = url.replace('{args}', args)
        url = url.replace('{fake_args}', fake_args)

        location.href = url
}

/*****************************************/
/*** FormulÃ¡rio de busca com checkbox ****/
/*****************************************/
function loadSearch(){
    $('#order').on('change', function(e){
        var url = $('#formSearch').attr('action');

        var order = $('#order option:selected').val();
        order = order.split("-");
        var order_field = 'order+field_'+order[0];
        var order_type = 'order+type_'+order[1];

        var order_name = $('#order option:selected').text().toLowerCase();
        order_name = order_name.split("-");
        var order_field_name = slugify(order_name[0]);
        var order_type_name = slugify(order_name[1]);

        var args = '';
        var fake_args = ''

        if ($('#order').val()) {
            if (args != '') {
                args += '-' + order_field;
                fake_args += '-' + order_field_name;

                args += '-' + order_type;
                fake_args += '-' + order_type_name;
            }else{
                args += order_field;
                fake_args += order_field_name;

                args += '-' + order_type;
                fake_args += '-' + order_type_name;
            }                
        }

        url = url.replace('{args}', args)
        url = url.replace('{fake_args}', fake_args)

        location.href = url


    });



    $('#formSearch input[type=checkbox]').click(function(){

    }, function(e){
        // e.preventDefault();

        var url = $('#formSearch').attr('action');
        
        if ($('.year:checked').val()!=undefined){
            var year = $('.year:checked').val()
            var year_name = slugify($('.year:checked').parents('label').text().toLowerCase())

            var year_min = 'year=model=min_'+year;
            var year_min_name = year_name;

            var year_max = 'year=model=max_'+year;
            var year_max_name = year_name;
        }
        
        if ($('.maker:checked').val()!=undefined){
            var maker = $('.maker:checked').val()
            var maker_name = slugify($('.maker:checked').parents('label').text())
        }
        
        if ($('.model:checked').val()!=undefined){
            var model = $('.model:checked').val()
            var model_name = slugify($('.model:checked').parents('label').text())
        } 

        if ($('.price:checked').val()!=undefined){
            var price = $('.price:checked').val().split("-");
            var price_min = price[0]
            var price_max = price[1]


            var price_name = $('.price:checked').parents('label').text()
            price_name = price_name.split("-")
            var price_min_name = slugify(price_name[0])
            var price_max_name = slugify(price_name[1])
        }

        if ($('.odometer:checked').val()!=undefined){
            var odometer = $('.odometer:checked').val().split("-");
            var odometer_min = odometer[0]
            var odometer_max = odometer[1]


            var odometer_name = $('.odometer:checked').parents('label').text()
            odometer_name = odometer_name.split("-")
            var odometer_min_name = slugify(odometer_name[0])
            var odometer_max_name = slugify(odometer_name[1])
        }

    

        var args = '';
        var fake_args = ''


        if ($('.maker:checked').val()!=undefined){
            if (args != '') {
                args += '-' + maker;
                fake_args += '-' + maker_name;
            }else{
                args += maker;
                fake_args += maker_name;
            }         
        }

        
        if ($('.model:checked').val()!=undefined){
            if (args != '') {
                args += '-' + model;
                fake_args += '-' + model_name;
            }else{
                args += model;
                fake_args += model_name;
            }                
        }

        if ($('.year:checked').val()!=undefined){
            if (args != '') {
                args += '-' + year_min;
                fake_args += '-' + year_min_name;
            }else{
                args += year_min;
                fake_args += year_min_name;
            }                
        }

        if ($('.year:checked').val()!=undefined){
            if (args != '') {
                args += '-' + year_max;
                fake_args += '-' + year_max_name;
            }else{
                args += year_max;
                fake_args += year_max_name;
            }                
        }

        if ($('.price:checked').val()!=undefined){
            if (args != '') {
                args += '-' + price_min;
                fake_args += '-' + price_min_name;

                args += '-' + price_max;
                fake_args += '-' + price_max_name;
            }else{
                args += price_min;
                fake_args += price_min_name;

                args += '-' + price_max;
                fake_args += '-' + price_max_name;
            }                
        }

        if ($('.odometer:checked').val()!=undefined){
            if (args != '') {
                args += '-' + odometer_min;
                fake_args += '-' + odometer_min_name;

                args += '-' + odometer_max;
                fake_args += '-' + odometer_max_name;
            }else{
                args += odometer_min;
                fake_args += odometer_min_name;

                args += '-' + odometer_max;
                fake_args += '-' + odometer_max_name;
            }                
        }



        url = url.replace('{args}', args)
        url = url.replace('{fake_args}', fake_args)

        location.href = url

    })
}

/*****************************************/
/***             ValidaÃ§Ãµes           ****/
/*****************************************/

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function generalValidation(){
    $('form').each(function(){
        var form = $(this); 
        // alert('dsds')

        $(this).on('submit', function(){

            var error = false;
            $(form).find('.error-input').removeClass('error-input');

            $(form).find('input[required=true]').each(function(){
                if ($(this).val() == ''){
                    error = true;
                    $(this).addClass('error-input');
                    // alert('Please, fill the field ' + $(this).attr('placeholder'));
                    // return false;
                }

                if ($(this).attr('name') == 'email') {
                    if (!validateEmail($(this).val())) {
                        error = true;
                        $(this).addClass('error-input');
                    }
                }
            });

            return !error;
        });
    });
}
