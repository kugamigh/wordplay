/*
 * Create a <P> with the given text
 *
 * params:
 * text: text to display in paragraph
 *
 * returns: paragraph element
 *
 * Example usage: createParagraph("Hello") would create a paragraph HTML object
 *                with the text node "Hello" and return it
 *                createParagraph("World!") would create a paragraph HTML object
 *                with the text node "World!" and return it
 */
window.createParagraph = function(text) {
    console.log("Creating paragraph with text: " + text);

    var element = document.createElement("P");

    // check if text is not undefined
    if ( typeof(text) !== 'undefined' ) {
        // the variable [text] does exist, use it
        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }

    // return the element so the caller can use later
    return element;
}

/*
 * Create a <H1> header with the given text
 *
 * params:
 * text: text to display in header
 *
 * returns: header element
 *
 * Example usage: createH1("Hello") would create a H1 HTML object
 *                with the text node "Hello" and return it
 *                createH1("World!") would create a H1 HTML object
 *                with the text node "World!" and return it
 */
window.createH1 = function(text) {
  console.log("Creating h1 with text: " + text);

  var element = document.createElement("H1");

  // check if text is not undefined
  if ( typeof(text) !== 'undefined' ) {
      // the variable [text] does exist, use it
      var textNode = document.createTextNode(text);
      element.appendChild(textNode);
  }

  // return the element so the caller can use later
  return element;
}

/*
 * Create a <H2> header with the given text
 *
 * params:
 * text: text to display in header
 *
 * returns: header element
 *
 * Example usage: createH2("Hello") would create a H2 HTML object
 *                with the text node "Hello" and return it
 *                createH2("World!") would create a H2 HTML object
 *                with the text node "World!" and return it
 */
window.createH2 = function(text) {
  console.log("Creating h2 with text: " + text);

  var element = document.createElement("H2");

  // check if text is not undefined
  if ( typeof(text) !== 'undefined' ) {
      // the variable [text] does exist, use it
      var textNode = document.createTextNode(text);
      element.appendChild(textNode);
  }

  // return the element so the caller can use later
  return element;
}

/*
 * Create a <BUTTON> with the given text and id assigned
 *
 * params:
 * text: text to display in button
 *
 * returns: button element
 *
 * Example usage: createButton("Hello") would create a button HTML object
 *                with the text node "Hello" and return it
 *                createButton("World!") would create a button HTML object
 *                with the text node "World!" and return it
 */
window.createButton = function(text) {
  console.log("Creating button with text: " + text);

  var element = document.createElement("BUTTON");

  // check if text is not undefined
  if ( typeof(text) !== 'undefined' ) {
      // the variable [text] does exist, use it
      var textNode = document.createTextNode(text);
      element.appendChild(textNode);
  }

  // return the element so the caller can use later
  return element;
}

/*
 * Create an <INPUT> with the given text
 *
 * returns: input element
 *
 * Example usage: createTextInput() would create an input HTML object and return it
 */

window.createTextInput = function() {
  console.log("Creating input");

  var element = document.createElement("INPUT");

  // return the element so the caller can use later
  return element;
}

/*
 * Create an <img> with the given text
 *
 * params:
 * file: file location of image
 *
 * returns: image element
 *
 *
 * Example usage: createH1("images/banana.jpg") would create a img HTML object
 *                with the source attribute "images/banana.jpg" and return it
 */
window.createImage = function(file) {
  console.log("Creating image from: " + file);

  var element = document.createElement("IMG");
  element.setAttribute("src", file);

  // return the element so the caller can use later
  return element;
}

/*
 * Create a <LABEL> with the given text
 *
 * params:
 * text: text to display in label
 *
 * returns: label element
 *
 * Example usage: createLabel("Hello") would create a label HTML object
 *                with the text node "Hello" and return it
 *                createLabel("World!") would create a label HTML object
 *                with the text node "World!" and return it
 */
window.createLabel = function(text) {
    console.log("Creating label with text: " + text);

    var element = document.createElement("LABEL");

    // check if text is not undefined
    if ( typeof(text) !== 'undefined' ) {
        // the variable [text] does exist, use it
        var textNode = document.createTextNode(text);
        element.appendChild(textNode);
    }

    // return the element so the caller can use later
    return element;
}

/*
 * Create a <DIV> container for all other HTML objects
 *
 * params:
 * otherElements (optional): Any other HTML elements to include in the DIV
 *
 * returns: div element
 *
 * Example usage: createDiv(createParagraph("Hello"), createButton("Click me"))
 *                Would create a div HTML object with a paragraph and button in it
 */
window.createDiv = function(...otherElements) {
  console.log("Creating DIV with other elements: ");
  console.log(otherElements)

  var mainElement = document.createElement("DIV");

  // iterate over otherElements (array)
  for ( var subElement of otherElements ) {
      // check what other type of subElement we have
      if ( subElement instanceof HTMLElement )
          // add any HTMLElement
          mainElement.appendChild(subElement);
      else if ( isString(subElement) ) {
          // we have a String, so create TextNode
          var textNode = document.createTextNode(subElement);
          mainElement.appendChild(textNode);
      } else
          console.log("ERROR: createDIV() failed with subElement: " + subElement);
  }

  // return the element so the caller can use it
  return mainElement;
}
