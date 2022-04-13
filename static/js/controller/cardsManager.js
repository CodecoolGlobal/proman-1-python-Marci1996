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
    }};

async function deleteButtonHandler(e) {
    let cardId = e.currentTarget.dataset.cardId
    console.log(cardId)
    await dataHandler.deleteCard(cardId)
}
