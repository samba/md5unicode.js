/* Test kit for NODE.js */

var md5 = require('./md5unicode');
var crypto = require('crypto');



function testMD5Algorithms(name, text){

	var reference = crypto.createHash('md5').update(text).digest('hex');
	var hash = md5.md5(text);

	//console.info("Comparing", reference)
	console.assert(hash == reference, "unicode implementation differed:", [name, hash, reference])
}

function hipster_ipsum(){
	return [
		"Squid American Apparel wayfarers direct trade Truffaut. Brunch kale chips Pinterest chillwave, keytar salvia 8-bit Truffaut skateboard cred sustainable raw denim disrupt. Whatever vinyl gastropub Thundercats, normcore Shoreditch locavore trust fund pickled. Fap slow-carb tousled ethical chillwave normcore. Truffaut bicycle rights cornhole cliche 8-bit paleo. Bespoke aesthetic swag, pork belly street art 8-bit retro before they sold out direct trade. Vegan swag semiotics scenester.",
		"",
		"Try-hard cray sriracha deep v brunch Thundercats, put a bird on it blog art party VHS Marfa Neutra Truffaut cliche. Put a bird on it seitan slow-carb pug, stumptown food truck single-origin coffee drinking vinegar cred hoodie street art kale chips. Tonx hella meh Brooklyn cardigan. Brooklyn sriracha Intelligentsia, food truck mustache narwhal flexitarian fap freegan bespoke. Bitters whatever XOXO, tousled bespoke kitsch literally keffiyeh pop-up. Keytar Carles hashtag, readymade gluten-free stumptown vinyl Tumblr sustainable craft beer Portland chambray. Keffiyeh Marfa vinyl flexitarian ethnic Wes Anderson."
		].join('\n');
}


function run(){
	// These are all expected to match (pass)
	testMD5Algorithms('seventy-three', "This is a wonderful test of the MD5 algorithm in several implementations.")
	testMD5Algorithms('hello', "hello");
	testMD5Algorithms('little grey fox', "The little grey fox jumped over the red fence.")
	testMD5Algorithms('hipster', hipster_ipsum())

	var multibyte = String.fromCharCode(49, 50, 51, 305, 573, 283, 51, 50, 49);
	var expected = 'd3e2d7a2b6f39dd0ed8bf1c9a76d1435';
	var result = md5.md5(multibyte);

	if(result == expected){
		console.info('#PASS: Multibyte hash seems to match expected value', result, multibyte)
	} else {
		console.warn('#FAIL: Multibyte hash does not match expected value', expected, result, multibyte)
	}

	if(md5 && md5.test){
		md5.test()
	}


	// This one is expected NOT to match, since reference implementations are NOT UTF_16 compliant
	//testMD5Algorithms(multibyte);

}

run();

