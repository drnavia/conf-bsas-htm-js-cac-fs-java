/*========== TARJETAS - DOM ==========*/
const allCards = document.querySelectorAll('.card.border')
const cardCat1 = document.getElementById("cardCat1");
const cardCat2 = document.getElementById("cardCat2");
const cardCat3 = document.getElementById("cardCat3");

/*========== TARJETAS - UTILIDADES ==========*/
function matchCardSelected (selected) {

  switch (selected) {
    case "0":
      cleanCardSelected();
      cardCat1.classList.add("card-cat1-hovered");
      break
    case "1":
      cleanCardSelected();
      cardCat2.classList.add("card-cat2-hovered");
      break
    case "2":
      cleanCardSelected();
      cardCat3.classList.add("card-cat3-hovered");
      break
    default:
      throw new Error('Algo pasó en Match Card')
  }
}

function matchCategory (selected) {
  const event = new Event("change");

  switch (selected) {
    case "0":
      formulario.category.value = "cat1";
      formulario.category.dispatchEvent(event);
      break
    case "1":
      formulario.category.value = "cat2";
      formulario.category.dispatchEvent(event);
      break
    case "2":
      formulario.category.value = "cat3";
      formulario.category.dispatchEvent(event);
      break
    default:
      throw new Error('Algo pasó en Match Category')
  }
}

/*========== TARJETAS - EVENTS ==========*/
let selected = null

function eventCardSelected(elemento, clase) {
  cleanCardSelected();
  elemento.classList.add(clase);
}

function cleanCardSelected() {
  cardCat1.classList.remove("card-cat1-hovered");
  cardCat2.classList.remove("card-cat2-hovered");
  cardCat3.classList.remove("card-cat3-hovered");
}

function cardClick (event) {
  selected = event.currentTarget.dataset.index
  matchCategory(selected)
  eventCardAddAll()
}

function eventCardRemove (card) {
  card.removeEventListener("click", cardClick)
}

function eventCardAdd (card) {
  card.addEventListener("click", cardClick)
}

function eventCardAddAll () {

  for (let card of allCards) {
    eventCardRemove(card)

    const { index } = card.dataset

    if (index !== selected) {
      eventCardAdd(card)
    }
  }
}

/*========== ASIGNACION DE EVENTOS ==========*/
cardCat1.addEventListener("click", () => eventCardSelected(cardCat1, "card-cat1-hovered"));
cardCat2.addEventListener("click", () => eventCardSelected(cardCat2, "card-cat2-hovered"));
cardCat3.addEventListener("click", () => eventCardSelected(cardCat3, "card-cat3-hovered"));
eventCardAddAll()
