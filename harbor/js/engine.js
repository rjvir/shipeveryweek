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

var html0 = "<a class=product style=background-image:url(";
var html1 = ") href="
var html2 = "><div class=product-info><div class=title>"
var html3 = "</div></div></a>"


var query = new Parse.Query(Cargo);
query.equalTo("week", weekNum);
query.limit(30); 
query.find({
  success: function(results) {
  	$.each(results, function() {
  		$('.freight').append(
  			html0 + this.get("dat_boat") + html1 + this.get("ship_to") + html2 + this.get("title") + html3
  		);
  	});
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

