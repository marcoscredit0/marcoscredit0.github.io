/* envio de formularios do site via ajax */

var valEmail = /^[\w-]+(\.[\w-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])jQuery/;

function sendValidate(id) {
    msg = "";
    jQuery('#myModalForm #myModalLabel').html('Enviando...');
    jQuery('#myModalForm .modal-body').html('');
    jQuery('#myModalForm').modal('show');

    if (jQuery('.form' + id + ' input[type="submit"]').attr('disabled') != 'true') {
        jQuery('.form' + id + ' input, .form' + id + ' select, .form' + id + ' textarea').each(function () {
            if (jQuery(this).attr('data-required') == 'true') {
                if (jQuery(this).attr('placeholder') == jQuery(this).val() || jQuery(this).val() == '') {
                    var placeholder = jQuery(this).attr('placeholder');
                    msg += "* Campo " + placeholder + " é obrigatório. <br />";
                }
            }
        });

        if (msg != "") {
            msg = "Os seguintes campos encontram-se com problemas: <br/></br>" + msg;
            jQuery('#myModalForm #myModalLabel').html('Atenção!');
            jQuery('#myModalForm .modal-body').html(msg);
            return false;
        } else {
            jQuery('.form' + id + ' input[type="submit"]').attr("disabled", true);

            var form_validate = jQuery('.form' + id).serialize();
            jQuery.ajax({
                type: 'POST',
                url: jQuery('base').attr('href') + 'register_lead',
                data: form_validate,
                success: function (msg) {
                    if (msg == 'ok') {

                        var conversaoGoogle = "conversaoManager";
                        
                        /* <!-- Google Code for SITE Entre em Contato Agora Conversion Page --> */
                        /*
                        window.google_conversion_id = 956224666;
                        window.google_conversion_language = "en"
                        window.google_conversion_format = "3"
                        window.google_conversion_color = "ffffff"
                        window.google_conversion_label = "U7GICP_4gWEQmqn7xwM"; 
                        window.google_remarketing_only = "false";                                         
                        document.write = function(node){
                           $("body").append(node);
                        }                             
                        $.getScript("https://www.googleadservices.com/pagead/conversion.js").done(function() {  });
                        */

                        jQuery('#myModalForm #myModalLabel').html('Sucesso!');
                        jQuery('#myModalForm .modal-body').html('Solicitação enviada com sucesso.');
                        jQuery('.form' + id).trigger('reset');
                        jQuery('.modalCelular').modal('hide');
                        jQuery('.modalCotacao').modal('hide');
                    } else {
                        jQuery('#myModalForm #myModalLabel').html('Erro!');
                        jQuery('#myModalForm .modal-body').html('Erro de trasmissão tente novamente. ' + msg);
                    }
                    jQuery('.form' + id + ' input[type="submit"]').attr("disabled", false);
                }
            });
        }
    }
    return false;
}

function enviar_form(id) {
    sendValidate(id);
}

/* fim do script de envio de email */