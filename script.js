var d = document;
var topic = d.getElementById('topic');
var lang = d.getElementById('lang');
var body = d.getElementById('body');
var left = d.getElementById('query');
var title = d.getElementById('title');
var language;

function fetch(){
	var term = topic.value;
	if(term === "")
		return;
	term = term.replace(/\ /g, '_');
	language = lang.value;
	var url = "https://" + language +".wikipedia.org/api/rest_v1/page/html/" + term + "?redirect=true";
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", display);
    xhttp.open("GET", url, true);
    xhttp.onerror = function(){
    	body.innerHTML="404 :(";
    }  
	xhttp.upload.onerror = function(){
		body.innerHTML="Error!";	
	}
    xhttp.send();


}

function display(){
	console.log(this.readyState);
 	var html = this.responseText;
 	var titleText = html.match(/<title>.*<\/title>/);
 	titleText = titleText[0].replace('<title>', '').replace('</title>', '').replace('_', ' ');
 	title.innerHTML = titleText;
 	html = html.replace(/src="\/\//g, 'src="https://');
 	html = html.replace(/href="\//g, 'href="https://en.wikipedia.org/');
 	html = html.replace(/href="\.\//g, 'href="https://'+language+'.wikipedia.org/api/rest_v1/page/html/');
 	html = html.replace(/resource="\.\//g, 'resource="https://'+language+'.wikipedia.org/api/rest_v1/page/html/');
	body.innerHTML = html;
}

function openMenu(){
	if(left.style.display == "block")
		left.style.display = "none";
	else
		left.style.display = "block";
}