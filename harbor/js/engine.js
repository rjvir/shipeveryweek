//Written by Jesse Daugherty and Raj Vir
//(hop off our source code)

Parse.initialize("pNZntUqXpXVmBDqDGsW7HAAvXcIRrTQrjClmy84X", "rvxSEhXIFFbkchRGyq7iI2HiRGd1xjYuRPock9x5");
var Cargo = Parse.Object.extend("Shipped");
var cargo = new Cargo();

var week1 = 1358846993253;

var date = new Date().getTime();
var foo = date - week1;
var wk = week1/604800000;

var weekNum = Math.floor((date - week1) / 604800000);

function shipTheBox(box) {
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
};

function shuffleShipments(freight) {
	var cargoSize = freight.length;
	for (var i = 0; i < cargoSize; i++) {
		var p = Math.floor(Math.random()*cargoSize);
		var tempBox = freight[i];
		freight[i] = freight[p]
		freight[p] = tempBox;
	};

	for (var i = 0; i < freight.length; i++) {
		shipTheBox(freight[i]);
	};
};

var query = new Parse.Query(Cargo);
query.equalTo("week", weekNum);
query.find({
  success: function(results) {
  	shuffleShipments(results);
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

