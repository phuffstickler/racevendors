/*$(window).scroll(function() {
   //$('#debug').text($(window).scrollTop()  + $(window).height() + " vs. " + $(document).height());
   $('#debug').text($(window).scrollTop()  + $(window).innerHeight() + " vs. " + $(document).height());

   if($(window).scrollTop() + $(window).height() == $(document).height()) {
   
       alert("top!");
   }
   
   if($(window).scrollTop() + $(window).innerHeight() >= $(document).scrollHeight) {
       alert("bottom!");
   }
   
   
});
*/

document.write(unescape("%3Cscript src='" + "http://www.racevendors.com/js/fastclick.js' type='text/javascript'%3E%3C/script%3E"));


var racetrack = getURLParameter('venue');

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

			 
var failCount = 0;
var isNativeApp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
var uploadedFile;

$(document).ready(function() {
	//var photoSlide = document.getElementById('slider');
	//window.slider = new Swipe(photoSlide);
	//var photoSliderInterval = setInterval(function(){transitionPhoto("next")},7000);
	
	/*top.$('#refreshBtn').css('right','18px');
	top.$('#header').css("position","fixed");
	top.$('#header').css("width","100%");
	top.$('#mainSponsors').css("margin-top","67px");
	*/
		
	getPhotos(racetrack);
	
	/**/
	
});

function transitionPhoto(){
	slider.next();
}





function getData(type,url,callback,data,errorCallback,errorCallbackArgs){ $.ajax({ type: type, url: url, data:data,  cache: false, jsonp: true, contentType: false, processData: false, jsonpCallback: callback, dataType: 'jsonp', error:function (xhr, ajaxOptions, thrownError){ if(ajaxOptions == "error" || ajaxOptions == "timeout" || ajaxOptions == "abort") {  racevendorsError(); if(thrownError == "OK" || thrownError.replace(/\s/g, "") == "NotFound" || thrownError.replace(/\s/g, "") == "InternalServerError"){racevendorsError(); return} }
    if(errorCallback) {  onDataError(errorCallback,[errorCallbackArgs,xhr, ajaxOptions, thrownError]); /**/} } });}
  
function onDataError(fn,arg) { fn = (typeof fn == "function") ? fn : window[fn]; fn.call(this,arg); }


function getPhotos(venue){
	getData("GET", "http://www.racevendors.com/upload/photos.php?venue="+venue,"loadPhotos","callback=loadPhotos"+"&errorCallBackName=loadPhotosError","loadPhotosError");
}

function loadPhotosError(){
	if(failCount < 3){
		failCount++;
		getPhotos(racetrack);
	}else{
		alert('Please check your connection and try again.');
	}
}

function closeUploadContainer(){
	$('#galleryUploadContainer').fadeOut();
	//top.$('#refreshBtn').show();
	//top.$('#header').css("height","33px");
}



function getData(type,url,callback,data,errorCallback){ $.ajax({ type: type, url: url, data:data,  cache: false, processData: false, contentType:false, jsonp: true, jsonpCallback: callback, dataType: 'jsonp', error:function (xhr, ajaxOptions, thrownError){ if(ajaxOptions == "error" || ajaxOptions == "timeout" || ajaxOptions == "abort") {  racevendorsError(); if(thrownError == "OK" || thrownError.replace(/\s/g, "") == "NotFound" || thrownError.replace(/\s/g, "") == "InternalServerError"){racevendorsError(); return} }
    if(errorCallback) {  onDataError(errorCallback,[errorCallbackArgs,xhr, ajaxOptions, thrownError]); /**/} } });}
  
function onDataError(fn,arg) { fn = (typeof fn == "function") ? fn : window[fn]; fn.call(this,arg); }


function loadPhotos(obj){
	$('#photosList').empty();
	var photo;
	var shareEvent = isNativeApp ? 'onclick="javascript:sharePhoto(this.src)"':'';
	
	$(obj).each(function() {
		photo = '<img '+shareEvent+' width="100%" src="http://www.racevendors.com/upload/photos/'+this.file+this.type+'" alt="photo" />'; //'+mainSponsorArray[i]+'
		iconShare = isNativeApp ? '<div style="position:relative; z-index:4; float:right; font-size:35px; color:#fff; top:45px; margin-right:10px"><i class="icon-share"></i></div>':'';
		
		$('#photosList').append('<div style="margin-top:20px">'+iconShare+photo+'</div>');
	});
	
}



function sharePhoto(imgSrc){
    //alert('top: '+top);
	top.shareApp(imgSrc);
}



$('#photoVenueTitle').text(racetrack);

function readURL(input) {
            
            
            
            if (input.files && input.files[0]) {
                
                uploadedFile = $(input).val();
                
                
                
                var reader = new FileReader();

                reader.onload = function (e) {
                   top.setHeadPos();
                   $('#galleryUploadContainer').show();
                   
                   $('#testImg')
                        .attr('src', e.target.result)
                        .width('98%')
                        .height('auto');
                };
                
               

                reader.readAsDataURL(input.files[0]);
            }
        }
        

       
function getCamera(){
	$('#file').click();
}

function racevendorsPhotoUploadError(error){
	//alert("Error: "+error);
	$('#photoUploadLoader').hide();
}

function racevendorsPhotoUploadSuccess(obj){
	//alert("photoUpload: "+obj.response);
	$('#photoUploadLoader').hide();
	closeUploadContainer();
	window.parent.$('#refreshBtn').html('<i class="icon-camera" style="color:#37a8e6"></i>');   

	getPhotos(racetrack);
	
}





$('#uploadSubmitBtn').click(function(){

	//var uploadedFile = $('#file').val();
	
		
	var r=confirm('Press "OK" to continue and upload your photo to the RaceVendors app. By pressing "OK", you are confirming that your photo does not contain explicit content including pornography or lude acts. \n*Your photo is subject to removal.');
	if (r==true)
	  {
		$('#photoUploadLoader').show();
		
		$(".icon-reorder").effect("pulsate", { times:6 }, 900)
		
		/*
		$('#uploadCancelBtn').hide();
		$('#uploadSubmitBtn').css("width","92%");
		$('#uploadSubmitBtn').css("opacity",.6);
		$('#uploadSubmitBtn').unbind();
		*/
		
		
			
		
		function win(r) {
   
            //alert("SUCCESS "+r.response);
            //console.log("Code = " + r.responseCode);
            //console.log("Response = " + r.response);
            //console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            //alert("An error has occurred: Code = " + error.code);
            //console.log("upload error source " + error.source);
            //console.log("upload error target " + error.target);
        }
		
		if(isNativeApp){
			//alert(formData);
			//var options = new FileUploadOptions();
			//options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			
			var androidImageURI = window.parent.DEVTEST;
			//alert(imageURI);
			
			//var fileInput = document.getElementById('file');
			var imageURI = uploadedFile;
			//alert(imageURI);
			
			
			//var options = new FileUploadOptions();
            //options.mimeType="image/jpeg";
			
			//alert("DEVTEST: "+ window.parent.DEVTEST);
			//var ft = new FileTransfer();
			//alert(androidImageURI);
			
			var uri = androidImageURI ? androidImageURI : imageURI;
			//alert(uri);
			//fileTransferOptions.fileName=uri.substr(uri.lastIndexOf('/')+1);
			
			/*window.parent.fileTransferOptions.fileName=uri.substr(uri.lastIndexOf('/')+1);

			
			var params = {};
            params.fullpath =uri;
            params.name = window.parent.fileTransferOptions.fileName;
            */
            
			window.parent.fileTransfer.upload(uri, encodeURI('http://racevendors.com/upload/upload.php?venue='+racetrack), racevendorsPhotoUploadSuccess, fail,window.parent.fileTransferOptions,true);

		}else{
			var formData = new FormData($("#upload-form")[0]);
			getData("POST", 'http://racevendors.com/upload/upload.php?venue='+racetrack,'racevendorsPhotoUploadSuccess',formData);
		}
	
	   //$('#upload-form').attr('action','http://racevendors.com/upload/upload.php?venue='+racetrack);
	  // $('#submit').click();
	   
	   

	  }
	else
	  {
	  	
	  }	
   window.parent.hidePreloader();
   return false;
});

$('#sponsorLoader').hide();



