const menuCard = (pictureDirectory, name, price, menu) => {
    let card = document.createElement("div");
    let detailsContainer = document.createElement("div");

    const makeCard = () => {
        //card.style.display = "flex";
        //card.style.flexDirection = "row";

        card.className = "menuCard";

        let picture = menuPicture(pictureDirectory);
        let nameP = makeText(name);
        let priceP = makeText(price);

        card.appendChild(picture);
        card.appendChild(nameP);
        card.appendChild(priceP);

        menu.appendChild(card);
    }

    const menuPicture = (directory) => {
        let newPicture = document.createElement("img");
        newPicture.src = directory;

        return newPicture;
    }

    const makeText = (text) => {
        let newText = document.createElement("p");
        newText.textContent = String(text);

        return newText;
    }

    return {
        makeCard
    }
}

export { menuCard }