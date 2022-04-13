import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.delete-card-button[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
        const newCard = document.getElementById("newcardbtn"+boardId)
            newCard.addEventListener("click", ()=>{addCardHandler(boardId)})
    }};

async function deleteButtonHandler(e) {
    let cardId = e.currentTarget.dataset.cardId;
    await dataHandler.deleteCard(cardId)
}


async function addCardHandler(boardId) {
    const input = document.getElementById('input'+boardId)
    const saveCard = document.getElementById('savecardbtn'+boardId)
    input.style.display = "";
    saveCard.style.display = "";
    saveCard.addEventListener("click", ()=>{
        const input = document.getElementById('input'+boardId)
        const saveCard = document.getElementById('savecardbtn'+boardId)
        input.style.display = "none";
        saveCard.style.display = "none";
        dataHandler.createNewCard(input.value, boardId)
    })
    await dataHandler.createNewCard
}