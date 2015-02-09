  
var gaPlugin;
var pushNotification;
var StatusBar;

var DEVTEST;
var fileTransfer;
var fileTransferOptions;

var $win = $(window);

var userLocation;
var userLat;
var userLng;
var curState;
var curStateAbbr;
var sponsorSlide;
var sliderInterval;
var sponsorInterval;
var isInit = true;
var isSponsorOpen = false;

var sliderInterval;
var marqueeInterval;
var curFilter;
var curTrack;
var curVendor;
var curSponsorUrl;

var browser = navigator.userAgent;
var isAndroid = browser.search('Android') != -1;
var isIE = browser.search('MSIE') != -1;
var isOpera = browser.search('Opera') != -1;
var isIphone = browser.search('iPhone') != -1;
var isIpad = browser.search('iPad') != -1;
var isIpod = browser.search('iPod') != -1;
var isWP = browser.search('Windows Phone') != -1;
var isLegacyWP = browser.search('Windows Phone') != -1 && browser.search('7.5') != -1;
var isChrome = browser.search('CriOS') != -1; ;

var isLegacyAndroid = browser.search('Android') && (browser.search('2.2') || browser.search('2.1')) != -1;

var isNativeApp = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
var isIOS = isIpod || isIpad || isIphone;
var isMarqueePaused = false;

if(isLegacyWP){$('#refreshBtn').html('↻'); $('#refreshBtn').css('font-size','35px'); $('#refreshBtn').css('font-weight','bold')};

var unitedStates = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut','DC','Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

var unitedStatesAbbr = ['AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-38299710-1']);
 
  //_gaq.push(['_setDomainName', 'racevendors.com']);
  _gaq.push(['_trackPageview']);
  //_gaq.push(['_trackPageview','RaceVendors App']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    //ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  
function getPageHash(){if(window.location.hash) {var hash_val = window.location.hash.replace('#', '');return hash_val}}
function getURLParameter(name) {return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);}

function onMarqueeFinished(){
	$mwo.unbind();
	var marqueeResume = setTimeout(function(){$mwo.trigger('resume');bindMarquee()},6000);
}

function bindMarquee(){
	
	$mwo.bind('finished', function() {
			var marqueeTimeout = setTimeout(function(){
			$mwo.trigger('pause');
			//	var marqueeResume = setTimeout(function(){$mwo.unbind();$mwo.trigger('resume');},6000);
			onMarqueeFinished();
			},1);
						
											
		});	
	
}

function setMarquee(){
				
				$mwo = $('.marquee-with-options');
				//$('.marquee').marquee();
				
					$mwo.marquee({
						speed: 11300,
						gap: 85,
						delayBeforeStart: 8000,
						direction: 'left',
						duplicated: true,
						pauseOnHover: false
					});	
				
				//bindMarquee();		   
}


function playVideo(url){
	var vid = document.getElementById("video");
	vid.src = "http://www.racevendors.com/media/global/"+url; //Get global dynamically
	alert(vid);
	vid.play();
}


function playAudio(){
	var audioIntro = document.getElementById("audioIntro");
	//audioIntro.src = "http://www.racevendors.com/media/global/audio/intro.mp3";
	//alert(audioIntro);
	//audioIntro.load();
	audioIntro.play();
}

function setMainMenuStatus(){
	//$(".icon-reorder").css("color","#37a8e6");
	
	
	//$("#eventNameBtn").css("color","#37a8e6");
	//window.scrollTo(0, 0);
	//menuOpen=true;
	
}


if(isNativeApp){



document.addEventListener("offline", function() {
    	//$('#refreshBtn').show();
    	$('#refreshBtn').html('<i class="icon-repeat"></i>');
    }, false);
    
}


function successHandler (result) {
    alert('result = '+result)
}

// result contains any error description text returned from the plugin call
function errorHandler (error) {
    alert('error = '+error)
}


function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    alert('device token = '+result)
}

function alertCallback(){
	alert('alertCallback');

	
}

function doPushNotify(){
	
	//alert('doPushNotify');
	//navigator.notification.alert('custom', alertCallback, 'abra', 'tada')
	
	if(isAndroid){
		pushNotification.register(successHandler, errorHandler,	{"senderID":"566065363262","ecb":"onNotificationGCM"});
	}else{
		pushNotification.register(tokenHandler, errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});

		
	}	
	
	/*
	if (device.platform == 'android' || device.platform == 'Android') {
    pushNotification.register(successHandler, errorHandler,{"senderID":"566065363262","ecb":"onNotificationGCM"});
} else {
    pushNotification.register(tokenHandler, errorHandler {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
}
	*/
	
	
}




function onDeviceReady(){
			 
			//document.body.classList.add('fix-status-bar');			 
			 
			 /*new FastClick(document.body);*/
			
			 //if(window.plugins.webviewcolor) { window.plugins.webviewcolor.change('#000000'); }
			 
			 //StatusBar.backgroundColorByHexString("#FFFFFF");
			 
			 gaPlugin = window.plugins.gaPlugin ? window.plugins.gaPlugin : null;
			 gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-38299710-1", 10);
			
			
			 fileTransferOptions = new FileUploadOptions();
             fileTransferOptions.fileKey="file";
             fileTransferOptions.chunkedMode = false;
             fileTransferOptions.mimeType="image/jpeg";
			 
			 fileTransferOptions.headers = {
                           Connection: "close"
                        };
			 
			 fileTransfer = new FileTransfer();
			 
			 //alert(StatusBar.overlaysWebView);
			 //StatusBar.overlaysWebView(false);
			 
						 
			 //StatusBar.backgroundColorByName("white");
			 
			 //window.plugins.webviewcolor.change('#000000');
			 //window.plugin.statusbarOverlay.hide();

			 
			
			//pushNotification = window.plugins.pushNotification ? window.plugins.pushNotification : null;
			//if(pushNotification){doPushNotify()};
			 
			
			/*document.addEventListener("resume",onResume,false);
		    
		    $('#footer').html('GA: '+gaPlugin);

		  
			*/
			
			/*
			$('#vendorList').css("overflow-x","hidden");
			$('#vendorList').css("overflow-y","auto");
			$('#vendorList').css("-webkit-overflow-scrolling","touch");
			$('#vendorList').css("height","240px");
			$('#vendorList').css("box-shadow","inset 2px 2px 3px rgba(0, 0, 0, .3)");
			$('#vendorList').css("width","100%");
			*/
			
			

			
	
}





function onResume(){
            gaPlugin.trackPage( successHandler, errorHandler,"index.html"); //, "index.html"

  }


function successHandler (result) {
        //alert('successHandler - '+result);
        //$('#footer').html('successHandler - '+result);

}

function errorHandler (error) {
       //$('#footer').html('errorHandler - '+error);

}

function nativePluginResultHandler (result) {
		gaPlugin.trackPage( successHandler, errorHandler,"index.html");
}
        
function nativePluginErrorHandler (error) {
//alert('nativePluginErrorHandler - '+error);
//$('#footer').html('nativePluginErrorHandler: '+error);
}


function shareApp(img){
	//alert('-');
	if(isNativeApp) { window.plugins.socialsharing.share('Check out this photo I saw on the free RaceVendors app. Just visit', null, img, 'http://racevendors.com') };
}

$(document).ready(function() {
	
	//$('head').append('<base target="_self">');
	    
	    //$('#header').css('background-image','none');
	    //$('#header').css('background-color','#f5f5f5');
		
		if(!isNativeApp){
			if(isAndroid || isChrome){
				var appURL = 'https://play.google.com/store/apps/details?id=app.racevendors.com';
			}else if(isIOS){
				var appURL = 'https://itunes.apple.com/us/app/racevendors/id626793391?mt=8';
			}else if(isWP){
				var appURL = 'http://www.windowsphone.com/en-us/store/app/racevendors/4fdf2cb6-9631-4b17-900a-b9c79090a768';
			}else{
				var appURL1 = 'https://itunes.apple.com/us/app/racevendors/id626793391?mt=8';
				var appURL2 = 'https://play.google.com/store/apps/details?id=app.racevendors.com';
				window.open(appURL1);
				window.open(appURL2);
				window.close();				
			}
			if(appURL){window.location.href = appURL};
			
		}
		
		$('#filterLabel').css('font-size','18px');
		$('#filterContainer').css('padding-bottom','2px');
		$('#filterContainer').css('width','92%');		
		$('#filterContainer').append('<i class="icon-caret-down" style="font-size:20px;text-shadow:none; float:right; color:#37a8e6; position:relative; margin-right:11px; top:-6px"></i>');
		
		WebFontConfig = {
    google: { families: [ 'Exo::latin','Quattrocento+Sans::latin', 'Arvo' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

		
		 		
		
		
		
		$('#filterContainer').css('border-width','2px');
		
		document.addEventListener("deviceready", onDeviceReady, false);
		
		
		$('#header').css('box-shadow','0 7px 4px -7px #666');
		

	$('#footer').html(isNativeApp?'':'&copy;2014 RaceVendors, LLC');
	
	$('#filterMenu option:contains("Wifi & Cellular")').text('Cellular & Scanners');
	
	$('#mainSponsors').append('<div id="sponsorSiteContainer" style="display:none;position:absolute; overflow:auto;-webkit-overflow-scrolling:touch;width:100%; overflow-x:auto; overflow-y:scroll; height:auto; background:#000; top:65px; z-index:998"><div id="sponsorLoader" style="display:none;font-size:50px; color:#fff; position:absolute; top:100px; left:45%"><i class="icon-spinner icon-spin"></i></div><iframe onload="javascript:testSize(this)" name="sponsorSiteFrame" id="sponsorSite" border="0" style="width:100%; height:800px;border:0" width="100%" height="800px" src=""></iframe></div>');

	$("#refreshBtn").removeAttr("onclick");
	//$("#refreshBtn").hide();
	
	
	
	$( "#refreshBtn" ).bind( "click", function() {
		
		if($(this).html().search('cancel') != -1) {
			$("#sponsorSite")[0].contentWindow.closeUploadContainer();
			$('#refreshBtn').html('<i class="icon-camera"></i>');
			
		}else if($(this).html().search('repeat') != -1) {
			javascript:refreshApp();
			
		}else if($(this).html().search('camera') != -1) {
			//alert($('#file').attr('name'));
			//$('#file').click();
			//document.getElementById('sponsorSite').callGallery();
			
			
			
			if(isAndroid || isIOS){
			
				
				navigator.camera.getPicture(onSuccess, onFail, { quality: 30, correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, sourceType: Camera.PictureSourceType.PHOTOLIBRARY }); /* .CAMERA */
				
				
	function onSuccess(imageData) {
		 DEVTEST = imageData;
   		 var image = document.getElementById('myImage');
   		 //image.src = "data:image/jpeg;base64," + imageData;
   		 
   		 
   		 //$("#sponsorSite")[0].contentWindow.$('#uploadSubmitBtn').css('width','91.5%');
   		 $("#sponsorSite")[0].contentWindow.$('#uploadSubmitBtn').css('height','25px');
   		 
         $('#refreshBtn').html('cancel');
         
   		 $("#sponsorSite")[0].contentWindow.$('#galleryUploadContainer').show();
         //top.$('#refreshBtn').hide();        
                   $("#sponsorSite")[0].contentWindow.$('#testImg')
                        .attr('src', imageData)
                        .width('98%')
                        .height('auto');
	}

	function onFail(message) {
   		 //alert('Failed because: ' + message);
	}
				
			}else{
				$("#sponsorSite")[0].contentWindow.getCamera();
			}
			
			
			
			
			
			
			
		} else{
			
			//var curTrackRefined = curTrack.replace(//g','');
			var curTrackRefined = curTrack.replace(/ /g, '');
			curTrackRefined.replace('-','');
			curTrackURL = "http://"+curTrackRefined.toLowerCase()+".com";
			//alert(curTrackURL);
			
			//alert(curTrackURL.search('dover'));
			
			if(curTrackURL.search('dover') != -1){
				openSponsor('http://doverspeedway.com',('Info call for '+curTrack));
			}
			else if(curTrackURL.search('sonoma') != -1){
				openSponsor('http://racesonoma.com',('Info call for '+curTrack));

			}else if(curTrackURL.search('vegas') != -1){
				openSponsor('http://lvms.com',('Info call for '+curTrack));

			}else{
				openSponsor(curTrackURL,('Info call for '+curTrack));
			}
			
			
		}
	});
	 
	 
	
	
	//setMainMenuStatus();
	
	if(isLegacyWP){$("#mainMenu").html('<div style="position:relative;font-size:48px; top:-10px;color:#9f9f9f; margin-left:5px; float:left">≡</div>'); };
	
	
	$("#filterContainer").show();
	$("#mainMenu").show();
	//if(!isLegacyWP){$('#refreshBtn').show();}
	
	
	//getGeoLatLng();
	
	curVendor = getMemory('curVendorSelected');
	
	
	
	
	/* //for sticky header
	isIOS = true;
	if(isIOS){
	$('#header').css("position","fixed");
	
	
	$('#header').css("width","100%");
	$('#mainSponsors').css("margin-top","66px");
	$('#input').css("margin-top","6px");
	$('#refreshBtn').css("margin-right","7px");
	
	
	
		
	}
	*/

	  
	
	/*var userLoc = getMemory('userLocation');
	if(!userLoc){getGeoLatLng()}else{$('#location').html(userLoc);};*/
	
	var curSearch = getMemory('curSearch');
	$("#query").val(curSearch?curSearch:"");
	
	
	var curEventName = getMemory('curEventName');
	var defaultEventName = 'Daytona International Speedway';
	$('#eventMenu').val(curEventName?curEventName:defaultEventName); //set the default here to based on event times..
	setEventName(curEventName?curEventName:defaultEventName);
	
	if(!curEventName){setMainMenuStatus();$(".icon-reorder").effect("pulsate", { times:6 }, 900)};
	//$("#eventName").val(curEventName?curEventName:''); //set the default here to based on event times..
	
		
	$("#searchClearBtn").click(function() {
		$("#query").val("");
		$("#searchClearBtn").fadeOut();
		$("#query").focus();
	});
	
	
	
	//alert($("#filterLabel").css("top"));
	
	$("#filterMenu").css("top",$("#filterLabel").css("top"));
	$("#query").css("top",$("#filterLabel").css("top"));
	$("#searchClearBtn").css("top",$("#filterLabel").css("top"));

	/* REENDABLE 
	$("#eventNameBtn").click(function() {
		//var name = $("#eventNameBtn").html();
		//$(this).css("color",menuOpen?"#fff":"#000");
		
		if(isMarqueePaused == true){$mwo.trigger('resume');isMarqueePaused = false}else{$mwo.trigger('pause');isMarqueePaused = true}
		
		//$("#eventMenu").focus();
	});
	*/
		
	
		$("#eventMenu").change(function() {
			$("#filterMenu").removeAttr("disabled");
			setEventName($(this).val());
			//$(".icon-reorder").css("color","#9f9f9f");
			
			$("#eventMenu").blur(); //**Does not close track menu once selected
		});
		
		
		$("#eventMenu").blur(function() {
			$("#filterMenu").removeAttr("disabled");
			getVendors();
			
			//$(".icon-reorder").css("color","#9f9f9f");
			$("#eventNameBtn").css("color","#e7e7e7");
			
			//setHeadPos(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   Causes potentially odd issue (especially when no styling)
			//window.scrollTo(0, 0);
			
			//menuOpen=false;
			//setEventName($(this).val());
			
		});/**/
		
		
		
		/*
		$("#mainMenu").click(function(event) {
			//.attr("class", "icon-circle-arrow-left");
			
		
		if(!isNativeApp){
			var leftPos = $("#main-container").css("left") == "255px" ? 0 : 255;
			$( "#main-container" ).animate({
				left: leftPos
				}, 500, function() {
				// Animation complete.
			});
		}
			
			
			
		});
		
		$("#eventMenu").attr('disabled','disabled');
		$("#eventMenu").hide();
		
		*/
		
		$("#eventMenu").focus(function(event) {
			//.attr("class", "icon-circle-arrow-left");
			
		
				$("#filterMenu").attr('disabled','disabled');
				setMainMenuStatus();
			
		});
		
		
	$("#filterMenu").focus(function() {
		//$("#filterIcon").css("color","#1476ad");
		
		
		
		$("#eventMenu").attr('disabled','disabled');
		$("#filterLabel").css("color","#37a8e6");
		
		if($("#filterIcon").attr("class") == "icon-refresh" || $("#filterIcon").attr("class") == "icon-spinner icon-spin"){getVendors();
		};
		
		
		
	});
	
	
	
	$("#filterMenu").blur(function() {
		$("#eventMenu").removeAttr("disabled");
		setSearchFilter($(this).val());
		
		//setHeadPos();
		
		//$("#filterIcon").css("color","#fff");
		$("#filterLabel").css("color","#9d9d9d");
		
		//if(!navigator.onLine){$("#filterIcon").attr('class', 'icon-refresh');$('#refreshBtn').fadeIn();}
		
	});
	
	$("#filterMenu").change(function() {
		$("#eventMenu").removeAttr("disabled");
		filter = $(this).val();
		setSearchFilter(filter);
		getVendors();
		$("#filterLabel").css("color","#9d9d9d");
		$("#filterMenu").blur();  //**DISABLED DUE TO USER FEEDBACK
		
	});
	
	
	/*
	
	$("#query").keyup(function() {
		//alert($(this).val());
		//if($(this).val() == ''){$('#vendorList').empty()};
		getVendors();
		setMemory('curSearch',$(this).val(),365);
		$("#searchClearBtn").fadeIn();
	});
	
	$("#query").change(function() {
		getVendors();
		setMemory('curSearch',$(this).val(),365);
	});
	
	
	
	
	
	$("#query").blur(function() {
		//if($(this).val() == ''){$('.icon-remove-sign').hide()}else{$('.icon-remove-sign').show()};
		$(this).css("color","#000");
	});
	
	$("#query").focus(function() {
		$(this).css("color","#157eb9");
		//getVendors();
		setMemory('curSearch',$(this).val(),365);
	});
	*/	
	
	var curFilter = getMemory('curFilter');
	setSearchFilter(curFilter?curFilter:'food'); //caret-down for all businesses
	
	/*
	if(curFilter){
		if(curFilter == "caret-down"){
			setSearchFilter('suitcase');
		}else{
			setSearchFilter(curFilter);
		}
		
	}else{
		setSearchFilter('suitcase');
	}*/
	
	
	/**/
	
	getVendors();
	
	
	//playAudio();
	
	
	
});


/*$('#foo').bind('mouseenter mouseleave', function() {
  $(this).toggleClass('entered');
});
*/

function setBackHeader(){
	/*
	top.$('#refreshBtn').css('right','15px');
	top.$('#header').css("position","relative");
	top.$('#header').css("width","auto");
	top.$('#mainSponsors').css("margin-top","auto");
	
	setHeadPos();
	*/
	
	setHeadPos();
}

function testSize(frame){
	//alert(frame.src);
	//window.history.back();
}
	
function setHeadPos(){ 

//window.scrollTo(0, 0);

if(isWP){window.scrollTo(0, 0);}else{
$('html, body').animate({
        scrollTop: 0
    }, 500);
    
}
}

function setSearchFilter(filter){
   
	$("#filterLabel").html('');
	
	curFilter = filter;
	$("#filterMenu").val(filter);
	
	//$("#filterIcon").attr('class', 'icon-'+filter);
	setMemory('curFilter',filter,365);
	var filterValue = $('#filterMenu').find('option:selected').text();
	var filterId = $('#filterMenu').find('option:selected').attr('id');
	
	//window.history.replaceState('Object', 'Title', "?track="+$("#eventNameBtn").html()+"&category="+filterId);
	callTrack(filterValue, "set_vendor_category");
	
	//U+21f2
	var legacyIcon = isLegacyWP ? "<span style='font-size:16px; color:#37a8e6; margin-right:4px'>▼</span>" : "";
	if(isLegacyWP){$('#filterIcon').hide();}
	
	if(filter=='search'){
	$("#filterMenu").css("width","30px");
	$("#filterIcon").css("left","6px");
	$("#filterIcon").css("top","5px");
	$("#filterContainer").css("border-width","0");
	$("#search").show();
	}
	else{
	$("#filterMenu").css("width","298px");
	$("#filterIcon").css("top","2px");
	$("#filterContainer").css("border-width","2px");
	$("#filterContainer").css("border-color","#37a8e6");
	$("#filterIcon").css("left","9px");
	$("#search").hide();
	$("#filterLabel").html(legacyIcon+filterValue);
	}
	
	
	//var menuPulsate = $("#filterContainer").effect("pulsate", { times:1 }, 1700);
	
}

function setEventName(name){
	
	curTrack = name;
	//$("#eventNameBtn").effect("pulsate", { times:1 }, 500);
	//window.history.replaceState('Object', 'Title', "?track="+name);
	
	getMainSponsors();
	
	setMemory('curEventName',name,365);
	$("#eventNameBtn").css("color","#e7e7e7");
	
	
	//$("#eventName").html('<span title="'+name+'" id="eventNameBtn">'+name+'</span><i title="Get Information for '+name+'" id="eventInfoBtn" class="icon-info-sign"></i>');
	
	//alert(name.length);
	
	callTrack(name, "set_racetrack");
	
	
	var address = "";
	switch(name){
				case "Atlanta Motor Speedway":
				address = "1500 Tara Pl, Hampton, GA 30228";
				eventDate = "Advocare 500 - SUN, September 1st";
				eventMessage = ''; //<a href="http://ticketmaster.com">get tickets</a> // Issue with global click event
				//1-800-RACEWAY
				break;
				
				case "Auto Club Speedway":
				address = "9300 Cherry Ave  Fontana, CA 92335";
				eventDate = "Auto Club 400 - SUN, March 24th";
				eventMessage = '';
				break;
				
				case "Bristol Motor Speedway":
				address = "151 Speedway Blvd  Bristol, TN 37620";
				eventDate = "Food City 500 - SUN, March 17th\nIrwin Tools Night Race - SAT, August 24th";
				eventMessage = '';//Congratulations Kasey Kahne for winning the Food City 500!
				break;
				
				case "Charlotte Motor Speedway":
				address = "5555 Concord Pkwy S  Concord, NC 28027";
				eventDate = "Coca-Cola 600 - SUN, May 26th\nBank of America 500 - SAT, October 12th";
				eventMessage = '';
				break;
				
				case "Chicagoland Speedway":
				address = "500 Speedway Blvd  Joliet, IL 60433";
				eventDate = "Geico 400 - SUN, September 15th";
				eventMessage = '';
				break;

				
				case "Darlington Raceway":
				address = "1301 Harry Byrd Hwy  Darlington, SC 29532";
				eventDate = "Bojangles' Southern 500 - SAT, May 11th";
				eventMessage = "";//Bojangles' Southern 500 - SAT, May 11th
				break;
				
				case "Daytona International Speedway":
				address = "1801 W International Speedway Blvd  Daytona Beach, FL 32114";
				eventDate = "Sprint Unlimited - SAT, Feb 15";
				//eventMessage = "Sprint Unlimited - SAT, Feb 15 - &nbsp;Call <a href='javascript:callVendor(\"Daytona International Speedway\",\"8007487467\")'>1-800-PITSHOP</a> to reserve your tickets!";
				//eventMessage = "Sprint Unlimited - SAT, Feb 15 &nbsp;&nbsp;&nbsp;&nbsp;Call <a href='javascript:callVendor(\"Daytona International Speedway\",\"8007487467\")'>1-800-PITSHOP</a> for tickets!";
				eventMessage = "";

				break;
				
				case "Dover International Speedway":
				address = "1131 N Dupont Hwy  Dover, DE 19901";
				eventDate = "FedEx 400 Benefiting Autism Speaks - SUN, June 2nd\nAAA 400 - SUN, September 29th";
				eventMessage = "";//"AAA 400 - SUN, September 29th - Call <a href='javascript:callVendor(\"Dover International Speedway\",\"8004417223\")'>1-800-441-RACE</a> for tickets!";
				//eventMessage = "FedEx 400 benefiting Autism Speaks - SUN, June 2nd";

				break;
				
				
				case "Homestead-Miami Speedway":
				address = "1 Speedway Blvd  Homestead, FL 33035";
				eventDate = "Ford Ecoboost 400 - SUN, November 17th";
				eventMessage = '';
				break;
				
				case "Indianapolis Motor Speedway":
				address = "4790 W 16th St  Indianapolis, IN 46222";
				eventDate = "Crown Royal 400 - SUN, July 28th";
				eventMessage = '';
				break;
				
				case "Iowa Speedway":
				address = "3333 Rusty Wallace Dr  Newton, IA 50208";
				eventDate = "";
				eventMessage = '';
				break;
				
				case "Kansas Speedway":
				address = "400 Speedway Blvd  Kansas City, KS 66111";
				eventDate = "STP 400 - SUN, April 21st\nHollywood Casino 400 - SUN, October 6th";
				eventMessage = '';
				break;
				
				case "Kentucky Speedway":
				address = "1 Kentucky Speedway Blvd Sparta, KY 41086";
				eventDate = "Quaker State 400 - SAT, June 29th";
				eventMessage = '';
				break;
				
				case "Las Vegas Motor Speedway":
				address = "7000 Las Vegas Blvd N Las Vegas, NV 89115";
				eventDate = "";
				eventMessage = '';
				break;
				
				case "Martinsville Speedway":
				address = "340 Speedway Rd  Ridgeway, VA 24148";
				eventDate = "STP Gas Booster 500 - SUN, April 7th\nGoody's Fast Relief 500 - SUN, October 27th";
				eventMessage = "";//Congratulations Jimmie Johnson for winning the STP Gas Booster 500!
				break;
				
				
				case "Michigan International Speedway":
				address = "12626 US Highway 12  Brooklyn, MI 49230";
				eventDate = "Quicken Loans 400 - SUN, June 16th\nPure Michigan 400 - SUN, August 18th";
				eventMessage = '';
				break;
				
				case "New Hampshire Motor Speedway":
				address = "1122 NH-106, Loudon, NH 03307";
				eventDate = "New Hampshire 300 - SUN, July 14th\nSylvania 300 - SUN, September 22nd";
				eventMessage = '';
				break;
				
				case "Phoenix International Raceway":
				address = "125 Avondale Blvd #200, Avondale, AZ 85323";
				eventDate = "Advocare 500 - SUN, November 10th";
				eventMessage = '';//<a target="_blank" href="http://ticketmaster.com">get tickets</a>
				break;
				
				case "Pocono Raceway":
				address = "500 Long Pond Rd, Long Pond, PA 18334";
				eventDate = "Party in the Poconos 400 - SUN, June 9th\nGoBowling.com 400 - SUN, August 4th";
				eventMessage = '';
				break;
				
				case "Road America":
				address = "7390 N Hwy 67, Plymouth, WI 53073";
				eventDate = "";
				eventMessage = '';
				break;
				
				case "Richmond International Raceway":
				address = "600 E Laburnum Ave  Richmond, VA 23222";
				eventDate = "Toyota Owners 400 - SAT, April 27th\n";
				eventMessage = '';
				break;
				
				case "Rockingham Speedway":
				address = "2152 U.S. 1  Rockingham, NC 28379";
				eventDate = "";
				eventMessage = '';
				break;
				
				case "Sonoma Raceway":
				address = "29355 Arnold Dr  Sonoma, CA 95476";
				eventDate = "Toyota - Save Mart 350 - SUN, June 23rd";
				eventMessage = '';
				break;
				
				case "Talladega Superspeedway":
				address = "3366 Speedway Blvd, Lincoln, AL 35096";
				eventDate = "Aaron's 499 - SUN, MAY 5th\nCamping World RV Sales 500 - SUN, October 20th";   //callVendor(\''+name+'\',\''+contactNum+'\')">'+number+'</a>
				eventMessage = '';//"Camping World RV Sales 500 - SUN, October 20th";
				// - Buy tickets today! Call <a href='javascript:callVendor(\"Talladega Superspeedway\",\"8555177223\")'>1-855-517-7223</a>
				break;
				
				case "Texas Motor Speedway":
				address = "3545 Lone Star Circle, Ft. Worth, Texas 76177";
				eventDate = "NRA 500 - SAT, April 13th\nAAA Texas 500 - SUN, November 3rd";
				eventMessage = "";
				// - Buy tickets today! Call <a href='javascript:callVendor(\"Talladega Superspeedway\",\"8172158500\")'>1-817-215-8500</a>
				break;

				
				case "Watkins Glen International":
				address = "2790 County Route 16, Watkins Glen, New York 14891";
				eventDate = "";
				eventMessage = ''; //<a style="text-decoration:underline" target="_blank" href="http://ticketmaster.com">get tickets</a>
				break;
				
				default:
			}
			
	
	
	
	
	
	
		//callTrack();
		
		
			//$("#eventName").html('<span title="'+name+'" id="eventNameBtn">'+name+'<i id="eventInfoBtn" class="icon-info-sign"></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+eventDate+'</span>');
			
			
			
			//var eventInfoIcon = isLegacyWP ? '<span id="legacyInfoIcon"></span>' : '<i id="eventInfoBtn" class="icon-info-sign"></i>';
			var eventInfoIcon = isLegacyWP ? '<span id="legacyInfoIcon"></span>' : '<img id="eventInfoBtn" src="http://www.racevendors.com/img/map_icon.png" width="18px" height="18px">';

			
			var eventMsg = eventMessage ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+eventMessage : '';
			
			//var eventMsg = eventMessage ? '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' : '';
			
			//$("#eventName").html('<span title="'+name+'" id="eventNameBtn">'+name+'</span>'+eventInfoIcon);
			//$("#eventName").html('<span title="'+name+'" id="eventNameBtn">'+name+'<img id="eventInfoBtn" src="http://www.racevendors.com/img/map_icon.png" width="18px" height="18px" />'+eventMsg+'</span>');
			
			$('#eventName').css('font-family',"'Exo',sans-serif");
			$('#eventName').css('color',"'#b3b2b2'");
			$("#eventName").html('<span title="'+name+'" id="eventNameBtn">'+name+eventMsg+'</span>');
			
			//+'<img id="eventInfoBtn" src="http://www.racevendors.com/img/map_icon.png" width="18px" height="18px" />'
			
			if(name.length == 28){
				$("#eventNameBtn").css("font-size","16px");
			}else if(name.length >= 30){
				$("#eventNameBtn").css("font-size","16px");
			}else if(name.length >= 27){
		//alert('small');
		$("#eventNameBtn").css("font-size","17px");
	}else if(name.length < 30 && name.length >= 24){
		//alert('medium');
		$("#eventNameBtn").css("font-size","19px");
	}else{
		//alert('large');
		$("#eventNameBtn").css("font-size","20px");
	}

	/*
	//#eventInfoBtn,eventName
	$("#eventName").unbind('click');
	//$("#eventName").css('color','#2e8bbf');
	$("#eventName").click(function() {
			//var name = $("#eventNameBtn").html().replace('<img id="eventInfoBtn" src="http://www.racevendors.com/img/map_icon.png" width="18px" height="18px" />','');
			//var name = $("#eventNameBtn").html();
			//$("#eventName").css('color','#2e8bbf');
			date = eventDate ? eventDate : '';
			getDirections(address,name,date); //address+date
			//$(this).css("color",menuOpen?"#fff":"#000");
			//$("#eventMenu").focus();
			
			//if(trackLinkTimeout){clearTimeout(trackLinkTimeout)}
			//var trackLinkTimeout = setTimeout(function(){$("#eventName").css('color','#fff');},2500)

			
		});
		*/
		
		if(eventMessage != ""){setMarquee()}   // TURN BACK ON MARQUEE !!!!!
}

function isTouchDevice(){ var d = document.createElement('div'); d.setAttribute('ongesturestart', 'return;'); if(typeof d.ongesturestart == "function"){return true;}else {return false}}

function getGeoLatLng(){

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition,showPositionError);
		navigator.geolocation.watchPosition(showPosition);
  }
}

function showPosition(position){getLocationData(position.coords.latitude,position.coords.longitude);}
function showPositionError(errorObj){getUserLocationJS();}


function getUserLocationJS(){

	//$('#location').html(geoip_region());
	//alert('For accurate map directions, please allow location sharing.');
	//getGeoLatLng();
}

function getLocationData(lat,lng){
	userLat = lat;
	userLng = lng;
	
		/*
	curVendorLat = 34.019968;
	curVendorLng = -118.289988;
	
	$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=false&format=json&jsoncallback=results',
        function(data){
        	//var isThere =  JSON.stringify(data).search('Tennessee');
        	
			for (var i = 0; i < unitedStates.length; i++) {
				if(JSON.stringify(data).search(unitedStates[i]) != -1){
					//curState = unitedStates[i];
					//curStateAbbr = unitedStatesAbbr[i];
					//alert(unitedStates[i]);
					userLocation = getStateAbbr(unitedStates[i]);
					setMemory('userLocation',userLocation,365);
					//$('#location').html(userLocation);					
				}
			}        	        	          
        });
        */
}


function locationDataSuccess(data){
	//alert('success' + data);
	var country = data.countryName;
    var state = data.regionName;
    var city = data.cityName;
    var ip = data.ipAddress;
    var latitude = data.latitude;
    var longitude = data.longitude;
    
    var userState = getStateAbbr(state);
}

function locationDataFail(data){
//alert('error' + data.error);
}


function getMainSponsors(){
    if(gaPlugin){gaPlugin.trackPage( successHandler, errorHandler,"index.html")};

	venue = $("#eventMenu").find('option:selected').attr('id');
	url = "http://www.racevendors.com/php/sponsors.php?venue="+venue;
	success = "racevendorsSponsors";
	error = "racevendorsSponsorsError"
	getData("GET", url,success,"callback="+success+"&errorCallBackName="+error);
	//$('#sliderList').fadeOut();
	
	
}

function racevendorsSponsors(sponsors){

var brandedHeader = isNativeApp == true ? "home.jpg":"home.jpg"; //animated_flag.gif for true
//var brandedTrack = $("#eventMenu").find('option:selected').attr('id') == "talladega" ? "tracks/talladega.jpg" : '';
var brandedTrack = '';


switch($("#eventMenu").find('option:selected').attr('id')){
				
				case "dover":
				brandedTrack = "tracks/dover.jpg";
				//brandedURL = "javascript:getDirections('Dover, DE','Dover International Speedway')";
				brandedURL = 'http://m.doverspeedway.com/?utm_source=racevendors&utm_medium=banner&utm_content=SIL&utm_campaign=Spring';
				break;
				
				/*
				case "daytona":
				brandedTrack = "tracks/daytona.jpg";
				//brandedURL = "javascript:getDirections('Daytona Beach, FL','Daytona International Speedway')";
				brandedURL = 'http://daytonainternationalspeedway.com';

				break;			
				
				
				
				case "texas":
				brandedTrack = "tracks/texas.jpg";
				break;
				
				case "talladega":
				brandedTrack = "tracks/talladega.jpg";
				break;
				

				
				case "autoclub":
				brandedTrack = "tracks/autoclub.jpg";
				break;
				
				
				
				case "chicagoland":
				brandedTrack = "tracks/chicagoland.jpg";
				break;
				
				
				
				
				*/
				
				default:
			}

var mainSponsorArray = [brandedHeader];//["home.jpg","ad4.jpg","ad5.jpg"];
var mainSponsorArrayURL = [""];//["javascript:return false;","javascript:return false;","javascript:return false;"];
var mainSponsorArrayName = [""];//["javascript:return false;","javascript:return false;","javascript:return false;"];


if(brandedTrack != ''){
	
	mainSponsorArray.push(brandedTrack);
	mainSponsorArrayURL.push(brandedURL);
}

$.each(sponsors, function() {
		$.each(this, function(k, v) {
			//alert(k + ' : ' + v);
			//alert(k);
			switch(k){
				case "id":
				mainSponsorArray.push(v+'.jpg');
				break;
				
				case "url":
				mainSponsorArrayURL.push(v);
				break;
				
				case "name":
				mainSponsorArrayName.push(v);
				
				default:
			}
			
		});
		
		
	});


setMainSponsors(mainSponsorArray,mainSponsorArrayURL,mainSponsorArrayName);
		
} 



function racevendorsSponsorsError(sponsorDataError){
	//$('#refreshBtn').show();
	$('#refreshBtn').html('<i class="icon-repeat"></i>');
	//alert(sponsorDataError);
}


function setMainSponsors(mainSponsorArray,mainSponsorArrayURL,sponsorName){
	$('#sliderList').empty();
	if(sliderInterval){clearInterval(sliderInterval)};
	if(sponsorInterval){clearInterval(sponsorInterval)};
	
	//var adsBasePath = isNativeApp == true ? "":"http://www.racevendors.com/ads/";

	$(mainSponsorArray).each(function( i ) {
		url = mainSponsorArrayURL[i].search('.mp4') != -1 ? "javascript:playVideo(\'"+mainSponsorArrayURL[i]+"\')" : mainSponsorArrayURL[i];
		name = sponsorName[i];

		//href="'+url+'"
		//var isLink = url == "" ? '<img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" />':'<a border="0" style="border:0"  onclick="javascript:openSponsor('+url+')" target="_blank" ><img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" /></a>';
		
		//$('#footer').html(url.search('getDirections') == -1);
		
		if(url.search('getDirections') == -1){
			var isLink = url == "" ? '<img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" />':'<a border="0" style="border:0"  onclick="javascript:openSponsor(\''+url+'\',\''+name+'\')" target="_blank" ><img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" /></a>';
			
		}else{
		
		if(url.search('tel:') != -1 && screen.width >= 600){
			 url = '#';
		}
		
		
		var isLink = url == "" ? '<img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" />':'<a border="0" style="border:0" href="'+url+'" target="_blank" ><img width="100%" src="http://www.racevendors.com/ads/'+mainSponsorArray[i]+'" alt="sponsor" /></a>';
		}

				
		
		$('#sliderList').append('<li style="display:'+(i == 0 ? "block":"none")+'">'+isLink+'</li>');
	});
	
	sponsorSlide = document.getElementById('slider');
    window.slider = new Swipe(sponsorSlide);
    
    sliderInterval = setInterval(function(){transitionSponsor("next")},7000);
    
    if(isNativeApp){
    	sponsorInterval = setInterval(getMainSponsors, (60000*10)); 
    }else{
	    sponsorInterval = setInterval(function(){getMainSponsors()},(60000*10));
    }   
    

    
    //if(isInit){$('#sliderList').fadeIn('slow');}
}


var galleryWindow;

function hidePreloader(){
	$('#sponsorLoader').fadeOut('slow');
}


function openSponsor(url,name){
	
	
	
	//callTrack(name, "sponsor_track");
	var isDirections = url.search('getDirections') != -1;
	
	
	if(url.search('upload/photos.html') != -1){
		//alert('gallery');
		
		if(!isNativeApp){
				$("#refreshBtn").hide();
		}
		
		$("#eventMenu").css('top','-700px');
		//if(curSponsorUrl != url){$('#sponsorLoader').fadeIn('slow')};
		$(".icon-reorder").attr("class", "icon-arrow-left");
						
		$(".icon-arrow-left").unbind();
	    
	    $(".icon-arrow-left").click(function() {
			
			setBackHeader();
			$("#refreshBtn").show();
			
			isSponsorOpen = false;
			$("#eventMenu").css('top','22px');
			$('#sponsorSiteContainer').fadeOut('fast');
		
			$("#eventMenu").blur();

			$(".icon-arrow-left").attr("class", "icon-reorder");
			$('#filterContainer').show();
			$('#filterMenu').show();
			$('#vendorList').show();
			
			$('#refreshBtn').html('<i class="icon-info-sign"></i>');
			sliderInterval = setInterval(function(){transitionSponsor("next")},7000);
			
		});		
		
		$('#sponsorSite').attr("src",url);
		if(sliderInterval){clearInterval(sliderInterval)};
		$('#refreshBtn').html('<i class="icon-camera" style="color:#37a8e6"></i>');
		
		$('#sponsorSiteContainer').fadeIn('fast');
		$('#filterContainer').hide();
		$('#vendorList').hide();
		$('#filterMenu').hide();
		//setTimeout(function(){},500);
		
		
		
		$win.on( "click", function() {
			
			//$('#sponsorSite').$('#debug').text($win.scrollTop() + " vs " + $win.height());
			
			if ($win.scrollTop() == 0){
			 //alert('Scrolled to Page Top');
			}else if ($win.height() + $win.scrollTop() == $win.height()) {
			 //alert('Scrolled to Page Bottom');
			}
		 
		});
		
		return;
	}
	
	
	
	if(url.search('tel') == -1){
		callTrack(name, isDirections ? "sponsor_map_directions":"sponsor_ad_click");
		if(isDirections){window.open(url,'_blank');	}
			else{
			
			//isNativeApp = true; /* Hardcoded */
			
			if(isNativeApp){
				
				//$('#footer').html(device.cordova);
				
				 if(url.search('itunes') != -1){
					 window.open(url,'_blank');					 
					 
				 }else{
					 isSponsorOpen = true;
				 
				 
				 	if(isAndroid || isWP || isIOS){
				 		var useLocation = isIOS ? "no":"yes";
				 		
				 		//window.open("itms://itunes.apple.com/us/app/angry-birds/id343200656?mt=8&uo=4", "_system","location=no");
				 		
					 	var ref = window.open(encodeURI(url),'_blank','location='+useLocation+',closebuttoncaption=Close,enableViewportScale=no,transitionstyle=crossdissolve');					 	//ref.document.body.style.webkitTransform = 'translate3d(0, 20px, 0)';
					 	/*
					 	if(window.device && parseFloat(window.device.version) >= 7){
						 	document.body.classList.add('fix-status-bar');
						 	$('.fix-status-bar').css('margin-top','20px');
						 }
						 */
						 
						 
					 	
					 	
					 	//ref.document.StatusBar.hide();
					 	//alert(ref.opener);
					 	
					 	//ref.document.body.style.marginTop = "20px";
					 	
					 	/*ref.addEventListener('exit', function(event) {  });
					 	ref.addEventListener('loadstop', function(event) {  

						 	ref.insertCSS({
							code: "body { background-color:red}"
							}, function() {
								//alert("Styles Altered");
							});
						
						});
					*/
						 
					 	return;
					 	
					 	//,enableViewportScale=yes,allowInlineMediaPlayback=yes,presentationstyle=pagesheet,transitionstyle=fliphorizontal
					 	//_system instead of _blank
					}	

					
					if(!isLegacyWP){
						
						/*
								var ref = window.open(url, '_blank', 'location=yes');
						*/
												
						
						$("#eventMenu").css('top','-700px');
						
						//if(curSponsorUrl != url){$('#sponsorLoader').fadeIn('slow')};
						
						$(".icon-reorder").attr("class", "icon-arrow-left");
						
						$(".icon-arrow-left").unbind();
					    $(".icon-arrow-left").click(function() {
						isSponsorOpen = false;
						$("#eventMenu").css('top','22px');
						$('#sponsorSiteContainer').fadeOut("medium");
						
						$("#eventMenu").blur();
				
						$(".icon-arrow-left").attr("class", "icon-reorder");
						$('#filterContainer').show();
						$('#filterMenu').show();
						$('#vendorList').show();
						
												
						});						
					}
					
					$('#sponsorSite').attr("src",url);
					
					
					$('#sponsorSiteContainer').fadeIn('fast');
					$('#filterContainer').hide();
					$('#vendorList').hide();
					$('#filterMenu').hide();
					
									
					setTimeout(function(){$('#sponsorLoader').fadeOut('slow')},5000);
					/**/
				}
				
				
			}else{
			
				window.open(url,'_blank');
			}
			
			
		
		}
		
	}else{
		callTrack(name, "sponsor_phone_call");
		//window.open(url);
		window.location.href = url;
	}
	//window.location.href = url;
	
	curSponsorUrl = url;	
}

function refreshApp(){
		//$('.icon-repeat').css("color","#37a8e6");
    	location.reload();
    }

function transitionSponsor(direction){
	/*
	pos = slider.getPos();
	//alert(pos + " vs " + mainSponsorArray.length);
	newPos = (pos + 1) == mainSponsorArray.length ? pos - 1 : pos + 1;
	slider.slide(newPos, 1200);
	*/
	
	//if(direction == "next"){slider.prev()}else{slider.next()}
	slider.next();
}

function racevendors(vendors){
	
	
	//$('#refreshBtn').fadeOut('slow');
	$('#refreshBtn').html('<i class="icon-info-sign"></i>');
   
   
    $('#vendorList').empty();
    var destination;
    
    //if(!isLegacyWP){$("#filterIcon").effect("pulsate", { times:1 }, 1700);}
    
    
    
    var alertIcon = isLegacyWP ? "":'<i class="icon-exclamation-sign" style="margin:0 0 0 3px; font-size:17px"></i>';
    
    $('#vendorList').fadeIn('fast', function() {
	$("#filterIcon").attr('class', 'icon-'+curFilter);
    
	});
    
	if(vendors.length == 0){
	$('#vendorList').append('<div style="text-align:center;font-size:18px; clear:left; color:#555;  margin:10px 0 0 10px; padding-top:7px">No vendors listed'+alertIcon+'</div>');
	return;
	}
	
	$.each(vendors, function() {
		$.each(this, function(k, v) {
			//alert(k + ' : ' + v);
			//alert(k);
			switch(k){
				case "name":
				name = v;
				break;
				
				case "number":
				number = v;
				break;
				
				case "category":
				category = v;
				break;
				
				case "pos":
				pos = v.split(',');
				lat = pos[0];
				lng = pos[1];
				break;
				
				case "address":
				address = v;
				break;
				
				case "startDate":
				startDate = v;
				break;
				
				case "seasonal":
				seasonal = v;
				break;
				
				default:
			}
			
			//alert(position);
			
			//'+lat+','+lng'
		});
		
		//Add isseasonal back !!!!!!!!!!!!!!!
		//destination = seasonal == 0 ? address : (lat+'_'+lng);
		destination = address;
		
		/*var lat1 = Geo.parseDMS("36.170252");
		var long1 = Geo.parseDMS("-86.698259");
		var lat2 = Geo.parseDMS("33.50283");
		var long2 = Geo.parseDMS("-84.31208");
		//alert(distVincenty(lat1,long1,lat2,long2));
		*/
		contactNum = number.replace("-","");
		
		curFilterId = $("#filterMenu").find('option:selected').attr('id');
		isAll = curFilterId == "all" || curFilterId == "search";
		
		numberArray = number.split('-');
		//number = (isAll?'<i id="categoryIcon" class="icon-'+category+'"></i>':'') + "(" + numberArray[0] + ") " + numberArray[1] + "-" + numberArray[2];
		number = numberArray[0] ? "(" + numberArray[0] + ") " + numberArray[1] + "-" + numberArray[2] : "N/A";
		
		number = numberArray[0] == "null" ? "" : number;
		
		
		nameDisplay = name.replace("\\","");
		name = name.replace("'","*");
		
		//numberDisplay = !numberArray[0]?'<div style="color:#4e4e4e;font-size:15px">number unavailable</div>':'<div class="vendorPhoneNumber"><a title="Call '+nameDisplay+'" href="'+number+'">'+number+'</a></div>';
		
		numberDisplay = !numberArray[0]?'<div style="color:#4e4e4e;font-size:15px">number unavailable</div>':'<div class="vendorPhoneNumber"><a title="Call '+nameDisplay+'" href="javascript:callVendor(\''+name+'\',\''+contactNum+'\')">'+number+'</a></div>';
				
		var idNum = number.replace("(","");
		idNum = idNum.replace(")","");
		idNum = idNum.replace(" ","");
		idNum = idNum.replace("-","");		
		
		$('#vendorList').append('<div id="vendor'+idNum+'" class="vendor"><div title="Get Directions to '+nameDisplay+'" class="vendorLocation" onclick="javascript:getDirections(\''+destination+'\',\''+name+'\')"><image id="mapBtn" src="http://www.racevendors.com/img/map_icon.png" width="38px" height="38px" /></i></div><div class="vendorName">'+nameDisplay+'</div>'+numberDisplay+'</div>');
		
		
	});
	
	
	//$('#vendorList').append('<div style="text-align:center;clear:left;font-size:18px; color:#3b3b3b; margin:0 0 0 10px; padding-top:20px"><span style="color:#7a7a7a">Add your listing <span style="color:#ccc">FREE</span> by calling</span> <a href="mailto:info@racevendors.com?Subject=RaceVendor%20Listing%20Request&body=Please%20enter%20your%0A1.)%20Business%20Name%3A%20%0A2.)%20Address%3A%20%0A3.)%20Phone%20Number%3A%20">info@racevendors.com</a></div>');
	
	
	//$('#vendorList').append('<div style="text-align:center;clear:left;font-size:18px; color:#3b3b3b; margin:0 0 0 10px; padding-top:20px"><span style="color:#7a7a7a">Add your listing <span style="color:#ccc">FREE</span> by calling</span><br /> <a href="tel:7167917223">(716) 791-RACE(7223)</a></div>');
	
	
	var hardSET = true;
	
	/*isNativeApp?'': */
	
	if(vendors.length > 3 && !isLegacyWP){
		$('#vendorList').append('<div title="Go back to top" id="toTopBtn"><i id="toTopIcon" class="icon-circle-arrow-up"></i> top</div>'); 
	} 
	
	$("#toTopBtn").unbind('click');
	$("#toTopBtn").click(function() {
		setHeadPos();
	});
	
	
	
/*
	}*/
	
	
	if(isInit){setHeadPos();isInit = false};
	
	//$("#filterIcon").css("color","#37a8e6");
	
	
}





function callVendor(name,number){
	//number.replace("-","")
	name = name.replace("'","*");
	//window.history.replaceState('Object', 'Title', "?track="+$("#eventNameBtn").html()+"&vendor="+name);
	callTrack(name, "vendor_phone_call");
	
	num = number.replace(" ","-");
	num = num.replace("-","");
	
	setMemory('curVendorSelected',num,365);
	//window.history.replaceState('Object', 'Title', "#"+name);
	//if(isTouchDevice() && !isIpad && !isIpod){window.location = "tel:"+number.replace("-","");}
	if(screen.width <= 600 && !isIpad && !isIpod){window.location = "tel:"+number.replace("-","");}

}

function getDirections(destination,name,eventDate){
	
	//window.history.replaceState('Object', 'Title', "?track="+$("#eventNameBtn").html()+"&vendor="+name);
	//+name+"&category="+$("#filterMenu").find('option:selected').attr('id')
	
	callTrack(name, "vendor_map_directions");
	name = name.replace("'","*");
	
	cookieNum = number.replace(" ","-");
	cookieNum = number.replace("-","");
	setMemory('curVendorSelected',cookieNum,365);
	
	//window.history.replaceState('Object', 'Title', "#"+name);
	
	
	//&rtp=pos.33.783628_-84.383717_33.783628,%20-84.383717___e_~pos.33.440573_-86.083290_110%20Haynes%20St,%20Talladega,%20AL%2035160_Mc%20Donald's_(256)%20362-2448_e_YN21x205563615&mode=D&rtop=0~0~0~&form=LMLTSN&encType=1
	
	//$("#mapBtn").attr("src","img/map_icon_active.png");
	
	name = name.replace("*","'");
	//alert(userLat + ", "+userLng);
	//name = destination.split("=");
	
	//destination = destination.replace("","+");
	
	//http://www.bing.com/maps/embed/?v=2&amp;cp=34.854893~-85.519265&amp;lvl=7&amp;dir=0&amp;sty=r&amp;rtp=pos.36.170252_-86.698259_36.170252%2C%20-86.698259___e_~pos.33.502830_-84.312080_33.50283%2C%20-84.31208___e_&amp;mode=D&amp;rtop=0~0~0~&amp;form=LMLTEW&amp;emid=501fdd7a-b90b-ebe8-514c-ee26f4bbeb2c
	
	if(isIOS){map="maps.apple.com/"}else if(isWP){map="bing.com/maps/"}else{map = "maps.google.com/maps/"};
	//bing.com/maps/default.aspx
	//maps.live.com/default.aspx
		
	//alert(userLat);
	
	cleanDestination = destination.replace('#','%23');
	cleanName = name.replace('&','%26');
	//cleanName = cleanName.replace("'","");
	
	
	if(cleanDestination.search('-') != -1 && cleanDestination.search('.') != -1){
			cleanName = "";
		}
		
	
	if(userLat){
	
		if(isWP){
			//url = "http://"+map+"?cp="+userLat+"~"+userLng+"&rtp=pos."+destination.replace(",","_"); //saddr
			//url = "http://"+map+"?rtp=pos.36.170252_-86.698259~adr."+destination; //saddr
			//url = "http://"+map+"?rtp=pos."+userLat+"_"+userLng+"~adr."+destination;  //37.814692~-122.477339
			url = "http://"+map+"?where1="+cleanDestination;
			//url = "http://"+map+"?rtp=pos."+userLat+"_"+userLng+"~adr."+destination+".";
			//alert(url);
			
		}else{
			url = "http://"+map+"?saddr="+userLat+","+userLng+"&daddr="+cleanDestination; //saddr
			
		}
		
		//alert(url);
	}
	else{
		
		/*if(isWP){
			url = "http://"+map+"?where1="+cleanDestination+", United States";
			//alert(url);
		}else if(isAndroid){
			url = "geo:0,0?q="+cleanDestination+", United States";
		}else{
			url = (isIOS?'maps':'http')+"://"+map+"?q="+cleanDestination+", United States";
		}
		*/

		
		
		if(isWP){
			url = "http://"+map+"?where1="+cleanName+', '+cleanDestination; //+", United States"
			//alert(url);
		}else if(isAndroid){
		
			url = "geo:0,0?q="+cleanName+', '+cleanDestination; //+", United States"
		}else{
			
			url = (isIOS?'maps':'http')+"://"+map+"?q="+cleanName+', '+cleanDestination; //+", United States"
		}		
	}
	
	//http://maps.apple.com/?sll=33.602735,-86.113138&q=Speedway%20Auto%20Sales&hnear=75291%20Al%20Highway,
	//https://maps.google.com/?sll=33.602735,-86.113138&q=Speedway+Auto+Sales&hnear=75291+Al+Highway,+Lincoln+AL+35096,+United+States
	
	var date = eventDate ? ('\n\n'+eventDate) : '';
	
	//var answer = confirm (name+'\n'+destination+date+'\n\nChoose "OK" for directions'); //+name[0]
		var answer = true;
	
	//if (answer == true){ $("#mapBtn").attr("src","img/map_icon.png");window.location.assign(url) }else{ $("#mapBtn").attr("src","img/map_icon.png"); }
	
	//window.location.assign(url)
	
	if (answer == true){ 
		//$("#mapBtn").attr("src","img/map_icon.png");
		
		/*
		else if(!isTouchDevice()){
			
			window.open(url);
			
		}*/
		
		
		/*else if(isAndroid){
				
				//window.location.assign('geo:'+url);
				window.open(url);
			}*/
		
		if(isWP){
			$("#exContent").attr("src",url)
		}
			else{
			
			if(screen.width <= 600){
				
				window.location.assign(url);
			}else{
				
				if(isIpad || isAndroid){
					window.location.assign(url);
				}else{
					window.open(url);
				}
			}
			
			/*window.open(url)
			if(isAndroid){window.location.assign(url);}else{
				window.location.assign(url);
			};*/
		};
		 
	}else{ 
		//$("#mapBtn").attr("src","img/map_icon.png"); 
	}	

}


function racevendorsError(){
	//$('#refreshBtn').show();
	$("#filterIcon").attr('class', 'icon-refresh');
	//$('#vendorList').fadeIn();
}


function getVendors(){
	
	category = $("#filterMenu").find('option:selected').attr('id');
	venue = $("#eventMenu").find('option:selected').attr('id');
	
	//if(category == "all"){callData("http://www.racevendors.com/php/data.php"); return;}
	
	if(category == "search"){
		query = $("#query").val().replace(".","");
		query = query.replace("-","");
		query = query.replace("+","");
		query = query.replace("$","");
		query = query.replace("#","");
		query = query.replace("@","");
		query = query.replace("\"","");
		query = query.replace("'","");
	
		search = query.trim().toLowerCase();
		
		//$("#query").val($("#query").val().trim());
		if(search.length > 0){
		//setTimeout(function(){callData("http://www.racevendors.com/php/data.php?key="+search,"racevendors");},3000)
		callData("http://www.racevendors.com/php/data.php?key="+search+'&venue='+venue,"racevendors");
		}
	
	}else{
		//alert("http://www.racevendors.com/php/data.php?category="+category+'&venue='+venue,"racevendors");
		//alert(category);
		//$('#vendorList').fadeOut('fast');
		
		//$('#vendorList').append('<i class="icon-spinner icon-spin"></i>');
		
		//if(curFilter == $('#filterMenu').find('option:selected').attr('id')){$('#refreshBtn').hide();}else{$('#refreshBtn').show();};
		
		$('#refreshBtn').html('<i class="icon-repeat"></i>');
		//$('#refreshBtn').fadeIn('slow');		
		
		callData("http://www.racevendors.com/php/data.php?category="+category+'&venue='+venue,"racevendors");
	}
}

function getData2(url,success){
	$.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: success
  });
}


function callData(url,success){
	$('#vendorList').fadeOut('fast');
	
	var legacyIcon = isLegacyWP ? "<span class='legacyIcon' style='font-size:16px; color:#37a8e6; margin-right:4px'>▼</span>" : ""; //•••
	var filterValue = $('#filterMenu').find('option:selected').text();
	if(isLegacyWP){$('#filterIcon').hide();$("#filterLabel").html(legacyIcon+filterValue);}else{$("#filterIcon").attr('class', 'icon-spinner icon-spin');}
	
	getData("GET", url,success,"callback="+success+"&errorCallBackName=racevendorsError","racevendorsError");
}


function getData(type,url,callback,data,errorCallback,errorCallbackArgs){ $.ajax({ type: type, url: url, data:data,  cache: false, jsonp: true, jsonpCallback: callback, dataType: 'jsonp', error:function (xhr, ajaxOptions, thrownError){ if(ajaxOptions == "error" || ajaxOptions == "timeout" || ajaxOptions == "abort") {  racevendorsError(); if(thrownError == "OK" || thrownError.replace(/\s/g, "") == "NotFound" || thrownError.replace(/\s/g, "") == "InternalServerError"){racevendorsError(); return} }
    if(errorCallback) {  onDataError(errorCallback,[errorCallbackArgs,xhr, ajaxOptions, thrownError]); /**/} } });}
  
function onDataError(fn,arg) { fn = (typeof fn == "function") ? fn : window[fn]; fn.call(this,arg); }




function eventTrackSuccess(){
	
	
}


function eventTrackError(){
	
	
}

function callTrack(category, action){

	if(gaPlugin){
		gaPlugin.trackEvent(function() {}, eventTrackError, category, action, "In App Track", 1); //
		//gaPlugin.trackEvent( eventTrackSuccess, eventTrackError, category, action,"event only");
	}else{
		_gaq.push(['_trackEvent', category, action]);		
	}

	
}

		


function setMemory(name,value,exdays){
	
	if(typeof(Storage)!=="undefined"){
	  localStorage.setItem(name,value);
	  }
	else
	  {
	  	var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=name + "=" + c_value;
	  }
}

function getMemory(name){
	if(typeof(Storage)!=="undefined"){
	  return localStorage.getItem(name);
	  }
	else
	  {
	
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==name)
		    {
		    return unescape(y);
		    }
		  }
	 }
}





function getStateAbbr(state){
	for (var i = 0; i < unitedStates.length; i++) {
	    if(unitedStates[i].toUpperCase() == state.toUpperCase()){
		    curState = unitedStates[i];
		    curStateAbbr = unitedStatesAbbr[i];
	    }
	}
	return curStateAbbr;
}

