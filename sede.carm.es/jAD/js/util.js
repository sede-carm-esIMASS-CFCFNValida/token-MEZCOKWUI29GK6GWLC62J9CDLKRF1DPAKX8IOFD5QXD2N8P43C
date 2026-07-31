	var clickDefinition = false;
	
	try {
		if (!(!HTMLElement || HTMLElement.prototype.click)) clickDefinition = true;
	} catch(e) {}
	
	if (clickDefinition) {
		HTMLElement.prototype.click = function() {
			var evt = this.ownerDocument.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.dispatchEvent(evt);
		};
	}
	
	//Indica si una cadena contiene otra cadena
	function containsStr(inputString, findme){
		if ( inputString.indexOf(findme) > -1 ) {
		    return true;
		} else {
		    return false;
		}
	}
	
	//Muestra el icono "loading" dependiente del tipo de boton que lo invoca.
	//Cuando es de exportación, listado u otros tipos indicados, no lo mostrará.
	//Si la propiedad "disabled" es true tampoco mostrará.
	function loadingShowByClass(styleClass, disabled){
		
		if (disabled == true ||
			containsStr(styleClass, 'excelButton') || 
			containsStr(styleClass, 'reportButton') ||
			containsStr(styleClass, 'reportsButton') ||
			containsStr(styleClass, 'noLoading') ||
			containsStr(styleClass, 'cancelButton') ||
			containsStr(styleClass, 'deleteButton') ||
			containsStr(styleClass, 'fileDownload') ||
			containsStr(styleClass, 'okButton')
		){
			//no hacer nada, porque no se consigue desactivar el loading en estos casos
		}else{
			loadingShow();
		}
	}
	
	//Muestra el icono "loading" 
	function loadingShow(){
		//mostrar progreso
		//$('loading').show();
		//document.getElementById('loading').style='display:true;position:fixed;height:100%;width:100%;';
		
		if ( document.getElementById("loading").classList.contains('loadingStyleHide') ){
			document.getElementById('loading').classList.remove('loadingStyleHide');
		}
		if ( ! document.getElementById("loading").classList.contains('loadingStyleShow') ){
			document.getElementById('loading').classList.add('loadingStyleShow');
		}
	}

	//Oculta el icono "loading" 
	function loadingHide(){
		//limpiar progreso
		//$('loading').hide();
		//document.getElementById('loading').style='display:none;position:fixed;height:100%;width:100%;';
		if ( document.getElementById("loading").classList.contains('loadingStyleShow') ){
			document.getElementById('loading').classList.remove('loadingStyleShow');
		}
		if ( ! document.getElementById("loading").classList.contains('loadingStyleHide') ){
			document.getElementById('loading').classList.add('loadingStyleHide');
		}
		
	}

	function fadeOut() {
		for (i = 0; 1 >= i; i += (1 / 30)) {
			if (i > 0.95){
				i = 1;
			}
		    setTimeout("setOpacity(" + (1 - i) + ")", i * 750);
		}
	}
	
	function setOpacity(level) {
		element = document.getElementById('messages');
		if (element) {
			element.style.opacity = level;
			element.style.MozOpacity = level;
			element.style.KhtmlOpacity = level;
			element.style.filter = "alpha(opacity=" + (level * 100) + ");";
			if (level  == 0) {
				element.style.display = 'none';
			}
		}
	}

	String.prototype.trim = function() {
		return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
	}

	function setText(element, value) {
		if (document.body && document.body.innerText != undefined) {
			element.innerText = value;
		} else {
			element.textContent = value;
		}		
	}
	
	function getText(element) {
		if (document.body && document.body.innerText != undefined) {
			return element.innerText;
		} else {
			return element.textContent;
		}		
	}

	function showDeleteConfirm(submitter) {
		return showConfirm(submitter, '\u00BFRealmente desea borrar el registro?');
	}
	
	function trimAllInputs() {
		var inputs = document.getElementsByTagName('input');
		if (inputs) {
			for (var i=0; i<inputs.length; i++) {
				var input = inputs[i];
				if (input.type == 'text') {
					input.value = input.value.trim();
				}
			}
		}
	}
	
	function putTrimEventAllInputs() {
		var inputs = document.getElementsByTagName('input');
		if (inputs) {
			for (var i=0; i<inputs.length; i++) {
				var input = inputs[i]; 
				if (input.type == 'text' && !input.trimOnblur) {
					input.trimOnblur = true;
					var onblurOrg = input.onblur; 
					input.onblur = function (event) {
						this.value = this.value.trim();
						if (onblurOrg) {
							this.onblurOrg = onblurOrg;
							this.onblurOrg(event);
						}
					}
				}
			}
		}
	}
	
	function addtoArray(arr, collection) {
		if (arr && collection) {
			var len = arr.length; 
			for (var i=0; i<collection.length; i++) {
				arr[i+len] = collection[i];
			}
		}
	}

	function cancelAllEvents() {
		var forms = document.body.getElementsByTagName('form');
		if (forms) {
			for (var i=0; i<forms.length; i++) {
				var elements = forms[i].elements;
				for (var e=0; e<elements.length; e++) {
					var element = elements[e];
					element.onblur = function(){}
					element.onfocus = function(){}
					element.onchange = function(){}
				}				
			}
		}
	}
	
	/**
	 * Funciones de scroll
	 */
	var v_scroll_pos = 0.0;
	var h_scroll_pos = 0.0;
	
	//Guardar la posición del scroll
	function guardarPosicionScroll(){
		v_scroll_pos = getBodyScrollTop();
		h_scroll_pos = getBodyScrollLeft();
		console.log('Guardar scroll en posición x:' + v_scroll_pos + " y:" + h_scroll_pos);
	}
	
	//Restaurar la posición del scroll
	function restaurarPosicionScroll(){
		console.log('Restaurar scroll en posición x:' + v_scroll_pos + " y:" + h_scroll_pos);
		setBodyScrollTop(v_scroll_pos);
		setBodyScrollLeft(h_scroll_pos);

	}

	//Retorna la posicion vertical actual del scroll indicada por el grid editable
	function getGridScrollVerticalPosition(){
		return v_scroll_pos;
	}

	//Retorna la posicion horizontal actual del scroll indicada por el grid editable
	function getGridScrollHorizontalPosition(){
		return h_scroll_pos;
	}
	
	
	
	
	/**
	 * array contenedor de numero de eventos ejecutados 
	 * para cada formulario
	 * cuando vuelve a cero se refresca el formulario
	 */
	var formViewCountArray = new Array();
	
	var formViewLockArray = new Array();

	//Inicio de los eventos
	function initEventInfo(idFormView) {
		console.log("initEventInfo: " + idFormView);
		//console.log('Contador vale '+formViewCountArray[idFormView] + '>>>>>> '+idFormView);
		//mostrar el progreso
		//loadingShow();
		
		//Sólo guardar en grid editables
		if (containsStr(idFormView, 'gridPanel')){
			//Guardar la posición del scroll
			guardarPosicionScroll();
		}

		if (!formViewCountArray[idFormView]) {
			//console.log('Contador inicializado a 1'+ '>>>>>> '+idFormView);
			formViewCountArray[idFormView] = 1;
			formViewLockArray[idFormView] = true;
		} else {
			formViewCountArray[idFormView]++;
			//console.log('Contador aumentado. Ahora vale '+formViewCountArray[idFormView] + '>>>>>> '+idFormView);
		}		
	}

	//Fin de eventos
	function endEventInfo(idFormView, elementID) {
		console.log("endEventInfo: " + idFormView);
		//console.log('Contador vale '+formViewCountArray[idFormView] + '>>>>>> '+idFormView);
		if (formViewCountArray[idFormView]) {
			formViewCountArray[idFormView]--;
			//console.log('Contador restado. Ahora vale '+formViewCountArray[idFormView]+ '>>>>>> '+idFormView);
			if (formViewCountArray[idFormView] <= 0) {
				elementFormView = document.getElementById(idFormView);

				if (elementID != null && elementID != ""){
					var elementID = "#" + elementID.replace(":", "\\:") + "-error";
					//console.log ("Elementoid: " + elementID);
					var existe = $(elementID).length > 0;
					var visible = $(elementID).is (":visible");

					//Si la validación de jquery no se ha cumplido, no se envía el formulario al servidor.
					if (!existe || (existe && !visible)) {
						if (elementFormView) {
							formViewCountArray[idFormView] = null;
							//console.log('Invocacion oculta para reRender')
							elementFormView.onclick();
						}
					}
				}
				else{
					console.log ("Elementoid: " + elementID);
					if (elementFormView) {
						formViewCountArray[idFormView] = null;
						//console.log('Invocacion oculta para reRender')
						elementFormView.onclick();
					}
				}
				
				
				
				
				
			}
		}
		
		//Sólo restaurar en grid editables
		if (containsStr(idFormView, 'gridPanel')){
			//Restaurar la posición del scroll
			restaurarPosicionScroll();
		}
		
		//limpiar progreso
		//loadingHide();
	}

	function isFocusInElements(elementFocusId, elements){
		var encontrado = false;
		if(elementFocusId){
			if(elements){
				for (var i=0; i<elements.length; i++) {
					if(elementFocusId == elements[i].id){
						encontrado = true;
						break;
					}
				}
			}	
		}
		return encontrado;
	}
	
/*	function restoreFocus(elementId, onFocusFunction) {
	   	var elementFocus = document.getElementById(elementId);
	   	if (elementFocus) {
	   		if (onFocusFunction) {	   			
	   			elementFocus.onfocus = onFocusFunction;
	   		}	   		
			
	   		if(elementFocus.tagName == 'INPUT' && elementFocus.type == 'text'){
	   		
				var elementLen = elementFocus.value.length;
				
				if (document.selection) {
		            // Set focus
					elementFocus.focus();
		            // Use IE Ranges
		            var oSel = document.selection.createRange();
		            // Reset position to 0 & then set at end
		            oSel.moveStart('character', -elementLen);
		            oSel.moveStart('character', elementLen);
		            oSel.moveEnd('character', 0);
		            oSel.select();
		        }
		        else if (elementFocus.selectionStart || elementFocus.selectionStart == '0') {
		            // Firefox/Chrome
		        	elementFocus.selectionStart = elementLen;
		        	elementFocus.selectionEnd = elementLen;
		        	elementFocus.focus();
		        } // if   	
	   		}else{	   		
	   			elementFocus.focus();
	   		}
	   	}
	}

	function restoreFocusForm(formId, onFocusFunction) {
		var elementId = backupsFocus[formId];
		if (elementId) {
			restoreFocus(elementId, onFocusFunction);
		}
	}
	*/
	var backupForm = new Array();
	var backupsFocus = new Array();
	var backupsForms = new Array();
	
	
	function deleteFunctionEvent(formId) {

		var form = document.getElementById(formId);
		var elements = new Array();
		
	    var inputs = form.getElementsByTagName('input');	    
	    if (inputs) {
	    	addtoArray(elements, inputs);
	    }
	    var selects = form.getElementsByTagName('select');	    
	    if (selects) {
	    	addtoArray(elements, selects);
	    }
	    var textareas = form.getElementsByTagName('textarea');	    
	    if (textareas) {
	    	addtoArray(elements, textareas);
	    }
		for (var i=0; i<elements.length; i++) {
			var element = elements[i];
			element.onfocus = function(){};
			element.onblur = function(){};
			element.onchange = function (){};
		}			

	    backupsFocus[form.id] = document.activeElement.id;	   
	}
	
	function backupFunctionEvent(formId) {
		
		//console.log('Invocacion a backupFunctionEvent')
		
		var form = document.getElementById(formId);
		
		var elements = new Array();
		
	    var inputs = form.getElementsByTagName('input');	    
	    if (inputs) {
	    	addtoArray(elements, inputs);
	    }
	    var selects = form.getElementsByTagName('select');	    
	    if (selects) {
	    	addtoArray(elements, selects);
	    }
	    var textareas = form.getElementsByTagName('textarea');	    
	    if (textareas) {
	    	addtoArray(elements, textareas);
	    }
	   
	   if(isFocusInElements(backupsFocus[form.id], elements)){
	    	
		    var backupForm = new Array();
			for (var i=0; i<elements.length; i++) {
				var element = elements[i];
				var backupInput = {
					onfocus: element.onfocus,
					onblur: element.onblur,
					onchange: element.onchange
				}
				backupForm[element.id] = backupInput;
				element.onfocus = function(){};
				element.onblur = function(){};
				element.onchange = function (){};
			}			
		   	backupsForms[form.id] = backupForm;
		   	
		   	var onFocusFunction = null;
		   	eval("onFocusFunction = function() {restoreFunctionEvent('" + formId + "');}");
		    
		   	restoreFocusForm(form.id, onFocusFunction);
	    }

	    var idFormView = formId+":idFormView";
	    // marca que el refresco correspondiente al grupo de eventos ha finalizado
	    // si es null no existen acciones ajax pendientes
		formViewCountArray[idFormView] = null;
		formViewLockArray[idFormView] = false;
	    //console.log('Fin del procesamiento de eventos ');
	   
	}

	/*function restoreFunctionEvent(formId) {

		var form = document.getElementById(formId);
		
	    var backupForm = backupsForms[form.id];

	    var elements = new Array();
	    var inputs = form.getElementsByTagName('input');	    
	    if (inputs) {
	    	addtoArray(elements, inputs);
	    }
	    var selects = form.getElementsByTagName('select');	    
	    if (selects) {
	    	addtoArray(elements, selects);
	    }
	    var textareas = form.getElementsByTagName('textarea');	    
	    if (textareas) {
	    	addtoArray(elements, textareas);
	    }
	   
	    if (elements) {
			for (var i=0; i<elements.length; i++) {
				var element = elements[i];
				var backupElement = backupForm[element.id];				
				element.onfocus = backupElement.onfocus;
				element.onblur = backupElement.onblur;
				element.onchange = backupElement.onchange;
				backupElement = null;
			}			
	    }
	    backupForm = null
	   	backupsForms[form.id] = null;
	}
	*/
	
	function getBodyScrollTop() {
		return  Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	}
	
	
	function setBodyScrollTop(scrollTop) {
		if (scrollTop == getBodyScrollTop()){
			console.log('setBodyScrollTop: ' + scrollTop + ' (no ha cambiado)');
		}else{
			console.log('setBodyScrollTop: ' + scrollTop);
			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;
		}
	}
	
	function getBodyScrollLeft() {
		return  Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
	}
	
	
	function setBodyScrollLeft(scrollLeft) {
		if (scrollLeft == getBodyScrollLeft()){
			//console.log('setBodyScrollTop: ' + scrollTop + ' (no ha cambiado)');
		}else{		
			//console.log('setBodyScrollLeft');
			document.body.scrollLeft = scrollLeft;
			document.documentElement.scrollLeft = scrollLeft;
		}
	}
	
	function changeFormActions(application, page){		
		if (application && page) {
			var forms = document.getElementsByTagName("form");
			for (var i=0; i<forms.length; i++) {
				var action = forms[i].action;
				action = action.replace("/pages/dynamicPage.xhtml", "/" + application + "/" + page + ".xhtml");
				forms[i].action = action;
			}
		}
	}
	
	function cancelPropagation(event) {
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
	
	function addFormParam(element, paramName, paramValue) {
		var action = element.form.action;
		//modificado 29/07/2019
		action = getActionReset(action);
		//end modificado 29/07/2019
		if (action.indexOf('?') == -1) {
			action = action + "?";
		} else {
			action = action + "&";
		}			
		element.form.action = action + paramName + "=" + encodeURIComponent(paramValue);
	}
	//modificado 26/07/2019
	function getActionReset(action) {
		var primerParametro = action.indexOf('?') != -1 ? action.indexOf('?') : action.length;
		var actionReseteado = action.substring(0,primerParametro);
		return actionReseteado;
	}
	//end modificado 26/07/2019
	
	function addNewFormParam(element, paramName, paramValue) {
		var action = element.form.action;
		if (action.indexOf('?') == -1) {
			action = action + "?";
		} else {
			action = action.substring(0, action.indexOf('?')+1);
		}			
		element.form.action = action + paramName + "=" + encodeURIComponent(paramValue);
	}
	
	function muestra_oculta(id)
	{
		if (document.getElementById){ 
			var el = document.getElementById(id); 
			el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
		}
	}	
	
	
	/****************************************/
	function putClickAjaxSynchronized() {
		if (!this.clickAjaxSynchronized) {
			this.clickAjaxSynchronized = true;
			var previousOnClick = this.onclick;
			this.onclick = function(event){
				var buttonId = this.id;
				var idFormView = null;
				if (this.form) {
					idFormView = this.form.id+":idFormView";
				} else {
					idFormView = this.id.split(':')[0]+":idFormView";
				}
				//console.debug(">> formViewCountArray: " + formViewCountArray[idFormView]);
				if (formViewLockArray[idFormView]) {
	                window.setTimeout(function () {
	                	document.getElementById(buttonId).click();
	                }, 100);
	                //console.debug("esperando.......");
	                return false;
	            } else {
	            	//console.debug(">> ejecutando onClick actionButton: " + formViewCountArray[idFormView]);
		            if (previousOnClick) {
		            	this.previousOnClick = previousOnClick;
		            	return this.previousOnClick(event);
		            }
	            }
			}
		}
	}
	
	var panelBloqueoTimeout;
	
	function mostrarPanelBloqueEventosAjax(){
		console.log('mostrarPanelBloqueEventosAjax');

		//Guardar la posición del scroll
		//guardarPosicionScroll();
		
		
		var panelBloqueoEventos = document.getElementById('panelBloqueoEventosAjax');
		if (panelBloqueoEventos != null){
			panelBloqueoEventos.style.display='';
		}
		var panelBloqueoEventosOpacidad = document.getElementById('panelBloqueoEventosAjaxOpacidad');
		if (panelBloqueoEventosOpacidad != null){
			panelBloqueoEventosOpacidad.style.opacity='0.0';
			if (panelBloqueoEventosOpacidad.filters){
				panelBloqueoEventosOpacidad.filters.item(0).opacity=0;
			}
		}
		
		//console.log("Ponemos panel de bloqueo pero no se muestra");
		//panelBloqueoTimeout = window.setTimeout(function () {
			panelBloqueoTimeout = null;
			var panelBloqueoEventosOpacidad = document.getElementById('panelBloqueoEventosAjaxOpacidad');
			if (panelBloqueoEventosOpacidad != null){
				panelBloqueoEventosOpacidad.style.opacity='0.2';
				if (panelBloqueoEventosOpacidad.filters){
					panelBloqueoEventosOpacidad.filters.item(0).opacity=20;
				}
			}
			//console.log("Tras un segundo se muestra el panel de bloqueo");
		//}, 1000);
		
	}

	function ocultarPanelBloqueoEventosAjax(){
		console.log('ocultarPanelBloqueoEventosAjax');
		var panelBloqueoEventos = document.getElementById('panelBloqueoEventosAjax');
		if (panelBloqueoEventos != null){
			panelBloqueoEventos.style.display='none';	
		}
		//console.log("Se oculta el panel de bloqueo");
		//if(panelBloqueoTimeout){
		//	window.clearTimeout(panelBloqueoTimeout);
		//	panelBloqueoTimeout = null;
		//}
		
		//Restaurar la posición del scroll
		//restaurarPosicionScroll();				
	}

	function hideURLbar()  
	{  
	      setTimeout(scrollTo, 0, 0, 1);  
	}
	
	function setFocus(id) {
		console.log('setFocus: '+id);
		if(id) {
			var element = document.getElementById(id);
			var bodyRect = document.body.getBoundingClientRect();
			var elemRect = element.getBoundingClientRect();
		    var offset   = elemRect.top - bodyRect.top;
			scrollTo(0,offset);
		}

	}
	

	//Redireccionar hacia otra URL
	function redireccionar(destino){ 
		try {
			window.location.href = destino;
		} catch(e) {
			window.location = destino;
		}
	}
	
	
	
function fijarFoco (id){
		
		if(id) {
			if (document.getElementById(id) != null && document.getElementById(id) != "")
				document.getElementById(id).focus();
		}
	}

function quitarFoco (id){
	if(id) {
		if (document.getElementById(id) != null && document.getElementById(id) != "")
			document.getElementById(id).blur();
	}
	//console.log("quitarfoco");
}

var backupElement;
var activeElement;

function deleteEventFocus(formId) {
	//console.log("deleteEventFocus: " + formId);
	console.log("deleteEvent" );
	if (document.activeElement.id != null){
		activeElement = document.activeElement.id;
	

		var element = document.getElementById(document.activeElement.id);
		if (element != null && element != "")
			{
			backupElement = {
				onfocus: element.onfocus,
				onblur: element.onblur,
				onchange: element.onchange
			}
			
			element.onfocus = null;
			element.onblur = null;
			element.onchange = null;
			console.log(document.activeElement.id );
			quitarFoco(document.activeElement.id);
			
		}
	}
}

function backupEventFocus(formId) {
	//console.log("backupEventFocus" + formId);
	console.log("backupEvent");
	if (activeElement != null && activeElement != ""){
		var element = document.getElementById(activeElement);
		
		if (element != null && element != ""){
			element.onfocus = null;
			element.onblur = null;
			element.onchange = null;
						
			var onFocusFunction = null;
		    eval("onFocusFunction = function() {restoreFunctionEvent('" + activeElement + "');}");
		    
		   	restoreFocus(activeElement, onFocusFunction);
			
			
		}
	}	
}


 
function fijarFocoError(elementId) {
	//console.log("backupEventFocus" + formId);
	
	if (elementId != null && elementId != ""){
		console.log("fijarFoco");
		var element = document.getElementById(elementId);
		
		if (element != null && element != ""){
			backupElement = {
				onfocus: element.onfocus,
				onblur: element.onblur,
				onchange: element.onchange
			}
			element.onfocus = null;
			element.onblur = null;
			element.onchange = null;
			
			var onFocusFunction = null;
		    eval("onFocusFunction = function() {restoreFunctionEvent('" + elementId + "');}");
		    
		   	restoreFocus(elementId, onFocusFunction); 
		}
	}
} 


function restoreFunctionEvent(activeEleme) {

	if (activeEleme != null && activeEleme != ""){
		var element = document.getElementById(activeEleme);
		
		
		element.onfocus = backupElement.onfocus;
		element.onblur = backupElement.onblur;
		element.onchange = backupElement.onchange;
	}

}

function restoreFocus(activeEleme, onFocusFunction) {
   	var elementFocus = document.getElementById(activeEleme);
   	if (elementFocus) {
   		if (onFocusFunction) {	   			
   			elementFocus.onfocus = onFocusFunction;
   		}	   		
		
   		if(elementFocus.tagName == 'INPUT' && elementFocus.type == 'text'){
   		
			var elementLen = elementFocus.value.length;
			
			if (document.selection) {
	            // Set focus
				elementFocus.focus();
	            // Use IE Ranges
	            var oSel = document.selection.createRange();
	            // Reset position to 0 & then set at end
	            oSel.moveStart('character', -elementLen);
	            oSel.moveStart('character', elementLen);
	            oSel.moveEnd('character', 0);
	            oSel.select();
	        }
	        else if (elementFocus.selectionStart || elementFocus.selectionStart == '0') {
	            // Firefox/Chrome
	        	elementFocus.selectionStart = elementLen;
	        	elementFocus.selectionEnd = elementLen;
	        	elementFocus.focus();
	        } // if   	
   		}else{	   		
   			elementFocus.focus();
   		}
   	}
}

//Se invoca a las funciones JS definidas por el programador en el JS del cliente.
function ejecutaFuncionRecarga(){
	var funcionRecargaAjax = 'ajaxReload';

	try{
    	if(initialize() !== undefined){
    		initialize();           
    	}
    	if(ajaxReload() !== undefined){
    		ajaxReload();           
    	}

    }catch(e){
    	//console.log("Funcion ajaxReload para javascript de cliente no definida");
    }

}

//Función que envía los datos de varios formularios al servidor desde un único botón.
function envioParametrosVariosFormularios(submit){
	if (submit){
		$('input[id$="\\:idEnvioParcial"]').click();
	}
	//console.log("submit: " + submit);
}

function envioParametrosSeleccionable(submit, idFormView){
	if (submit){
		$('input[id$="\\:idEnvioParcial"]').click();
	}else {
		elementFormView = document.getElementById(idFormView);
		if (elementFormView)
			elementFormView.onclick();;
	}
}

//deselecciona los desplegables relacionados para evitar errores.
function deselect(comun, elementsID){
	if (elementsID != null && elementsID != ""){
		
		var ids = elementsID.split(" ");
		
		for (var i=0; i<ids.length; i++) {
			var id = ids[i];
			
			var elementID = "#" + comun.replace(":", "\\:") + id;
			elementID = elementID + " option:selected";
			$(elementID).removeAttr("selected")
			
		}
	}
}

//Se invoca a las funciones JS definidas por el programador en el JS del cliente.
function dateSelectCalendarPrimefaces(funcion, ejecucion){

	try{
		if (ejecucion){
			eval(funcion);
		}
    }catch(e){
    	console.log("Error en la ejecución del DataSelect en la función: " + funcion );
    }
}
