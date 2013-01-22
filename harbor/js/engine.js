//Written by Jesse Daugherty and Raj Vir
//(hop off our source code)

Parse.initialize("pNZntUqXpXVmBDqDGsW7HAAvXcIRrTQrjClmy84X", "rvxSEhXIFFbkchRGyq7iI2HiRGd1xjYuRPock9x5");

var SHIP = SHIP || {};
$.extend(SHIP, {
	heightFactor: .25,
	shipTheBox: function(box) {
		var html0 = "<a class=product style=background-image:url(",
			html1 = ") href=",
			html2 = " target=_blank><div class=product-info><div class=title>",
			html3 = "</div><div class=description>",
			html4 = "</div><div class=shipper>by ",
			html5 = "</div></div></a>";

		$('.freight').append(
	  			html0 + box.get("dat_boat") + 
	  			html1 + box.get("ship_to") + 
	  			html2 + box.get("title") + 
	  			html3 + box.get("description") + 
	  			html4 + box.get("shipper_name") + html5 
	  		);
	},
	shuffleShipments: function(freight) {
		var cargoSize = freight.length;
		for (var i = 0; i < cargoSize; i++) {
			var p = Math.floor(Math.random()*cargoSize);
			var tempBox = freight[i];
			freight[i] = freight[p]
			freight[p] = tempBox;
		};

		for (var i = 0; i < freight.length; i++) {
			SHIP.shipTheBox(freight[i]);
		};
	},
	getWeekNum: function() {
		var week1 = 1358846993253,
	 	date =new Date().getTime(),
	 	foo =date - week1,
	 	wk =week1/604800000,
		weekNum = Math.floor((date - week1) / 604800000);
		return weekNum;
	},
	getShipments: function() {
		var Cargo = Parse.Object.extend("Shipped"),
		cargo = new Cargo(),
		query = new Parse.Query(Cargo);
		query.equalTo("week", SHIP.getWeekNum());
		query.find({
		  success: function(results) {
		  	SHIP.shuffleShipments(results);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	},
	boundedHeight: function() {
		var wh = $(window).height(),
		ww = $(window).width(),
		minBound = 450,
		maxBound = 1600;
		var min = Math.min(wh, ww, maxBound);
		if (min < minBound) return minBound;
		return min;
	},
	//only resize boat and water. otherwise raj will hit me
	resizeBoatnWater: function(){
		var scale = SHIP.boundedHeight(),
		newHeight = scale * SHIP.heightFactor;

		$('.boat-left').height(newHeight);
		$('.boat-left').width(Math.floor(338 * (newHeight / 401)));

		$('.boat-right').height(scale * SHIP.heightFactor);
		$('.boat-right').width(Math.floor(335 * (newHeight / 401)));

		$('.boat-middle').height(.33 * newHeight);
		$('.black-bar').width($(window).width() - 335*(newHeight/401));

		$('.blue').height($(window).height() * .2 * SHIP.heightFactor);
	},

	handleResize: function() {
    	SHIP.resizeBoatnWater();

    //   $('#imageListHolder').height($(window).height() - 110);
		  // $('.container').width(Math.max(Math.min($(window).width(),1060), 370) - 60);
    //   $('#imageListHolder, #copyright').each(function() {
    //     $(this).width(Math.max(Math.min($(window).width(),1060), 370) - 80);
    //   });
    //   $('a.product').each(function() {
    //     $(this).width($("#imageListHolder").width() - Math.floor(($("#imageListHolder").width() / 30)));
    //   });
    //   $('.shadeImage').each(function() {
    //     $(this).remove();
    //   });
    
    },
    resizeToFitWindow: function () {
      $(window).resize(function(){
        SHIP.delay(function () {
          SHIP.handleResize()
        }, 50);
      });
    },
    delay: (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })(),

});

$(function() {
     // Same as $(document).ready(function {}). TIL
     SHIP.getShipments();
     SHIP.handleResize();
     SHIP.resizeToFitWindow();
});
