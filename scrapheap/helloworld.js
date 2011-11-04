 
function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}



function sayHello() {
	// document.getElementById('hello').innerHTML = eval("'Company Configuration' > 'Company Configuration Your company information will be used to personalize documents'");

	var testVar = '';
	document.getElementById('hello').innerHTML = '>> ' + ('c' == testVar) + ' <<';
//	document.getElementById('hello').innerHTML = Left('Company Configuration....', 21);

}
window.onload = sayHello;

