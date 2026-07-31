/* Putting jQuery into no-conflict mode. */
var $j = jQuery.noConflict();

	
$j(document).ready(main);

var contador = 1;

function main (){
	
	//Desactivar scroll de pantalla principal
    function desactivar_scroll_principal() {
		$j('body').css('overflow', 'hidden');
		$j('body').scroll(function(){
	        $j(this).scrollTop(top).scrollLeft(left);
	      });
    }
    
    //Activar scroll de pantalla principal
    function activar_scroll_principal(){
		$j('body').css('overflow', 'auto');
		$j('body').unbind('scroll');    	
    }
	
	//Menú para aplicación móvil
	$j('.menu_bar').click(function(){
		// $j('nav').toggle(); Forma Sencilla de aparecer y desaparecer
		
		if (contador == 1){
			$j('nav').animate({
				left: '0'
			});
			
			//Desactivar scroll de pantalla principal
			desactivar_scroll_principal();
			
			contador = 0;
		} else {
			contador = 1;
			$j('nav').animate({
				left: '-100%'
			});
			
			//Volver a activar scroll de pantalla principal
			activar_scroll_principal();
			
		};
		
	});
	
	//Acordeón
    function close_accordion_section() {
        $j('.accordion .accordion-section-title').removeClass('active');
        $j('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }
 
    $j('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $j(this).attr('href');
 
        if($j(e.target).is('.active')) {
            close_accordion_section();
            
			//Desactivar scroll de pantalla principal
			desactivar_scroll_principal();
        }else {
            close_accordion_section();
 
            // Add active class to section title
            $j(this).addClass('active');
            // Open up the hidden content panel
            $j('.accordion ' + currentAttrValue).slideDown(300).addClass('open'); 
            
			//Desactivar scroll de pantalla principal
			desactivar_scroll_principal();
            
        }
 
        e.preventDefault();
    });
	
};


