
 //Sing modal which is used to sign the user in and up is created dynamically using a separate js file and the innerHTML property [for that make sure the js script is implemented in the 
  //html file before the app js file loads because it has methods those are applied to this sign modal elements]

  // The innerHTML template literal code is formatted like the html code due to installing an extension using this command in the quick open dialog [ext install nicolasparada.innerhtml]

  // code that depends on the data to be coming from the serve needs to be inside the async function not after it.
// Also never forget to always update the NodeList after each item that will be created dynamically is created.
//Supseqent cssText properties override each others
// To make different page talk to each others or to send data from a page to another, store the data to the local storage then display it on the other one once refreshed.

//Json is a string representation of a js object 
 let myObject = { name: "John", age: 30 };
let jsonString = JSON.stringify(myObject);
// Result: '{"name":"John","age":30}'

/*  when it comes to redirecting the user to another page some times it is better to use the anchor tag to use the advantages of the href attribute like 
the inherited cursor pointer and the ability to open this link in another tap 
another way to redirect is this  // window.location.href = `/pages/book-details.html?id=${book.id}`;
 * Also it is a better approach to send the book id of the clicked book in the routing system to the details page and from there fetch this book using the id
instead of just saving the whole object in the localStorage and then use it in the book details js again, because when the backend update the book details the update
show to the user once he refreshes the page (because another fetch request will be made automatically) but if the book details are coming from the static saved data in
the localStorage then no update happened unless the user reload the page that contains the book to be clicked it self by that a new fetch is done to get all the books to load
them in hte slider or in the gallery. 
*/

// how to assign a class dynamically using js , this is a code inside innerHtml
<div class="detail ${bookDetails.subDescription.weight?'': 'hidden'}"><span>Wight </span><span>${bookDetails.subDescription.weight}</span></div>

/* 
You can store an input's value into a variable to use it to assign it's value to other variables or use it in expressions, but to send a value back
to this input you need  to use the input.value instead  */

//refresh the page
window.location.reload();
// trying to toggle classes on an element wont't work if it already has a bootstrap class that contradicts this class
/* In case of fetching a big set of data you might encounter performance issues like page not responding when trying to implement these data in the page, 
that why you may need to use logics like pagination by getting only a part of data in shape of one page from the back end, the backend creates this login and you just
call certain page and it's size, also you might need to use lazy loading to overcome this issue. */