// This is for demonstration and practice, and as such
// there are no classes.

// First, store the id #container in a constant variable
// so we can append nodes into it, letting us make and put
// in new HTML (or technically, DOM) stuffs.
const container = document.querySelector("#container");

// This demonstrates how to create a <p> element that's
// color red. The following one is for <h3>.
const redP = document.createElement("p");
redP.style.color = "red";
redP.textContent = "Hey I'm red!";
container.appendChild(redP);

const blueH3 = document.createElement("h3");
blueH3.style.color = "blue";
blueH3.textContent = "I'm a blue h3!";
container.appendChild(blueH3);

// Then, make a div that will contain its own stuff.
// I was told to append stuff first into the
// div before adding it to #container. I am not sure why.
const blackPinkBox = document.createElement("div");
blackPinkBox.style.border = "1px solid black";
blackPinkBox.style.backgroundColor = "pink";
container.appendChild(blackPinkBox);

const divH1 = document.createElement("h1");
divH1.textContent = "I'm in a div.";
blackPinkBox.appendChild(divH1);

const divP = document.createElement("p");
divP.textContent = "ME TOO!";
blackPinkBox.appendChild(divP);
