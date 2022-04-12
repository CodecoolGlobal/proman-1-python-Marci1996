import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            console.log(board)
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
             domManager.addEventListener(
                `.board[data-board-id="${board.id}"]`,
                "click",
                function() {

                }
            );
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }


    },
    editBoardTitle
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}



function editBoardTitle() {
    let idCount = 0;
    const containers = document.getElementsByClassName('board-container');
    const elements = document.getElementsByClassName('board')
    for (let i=0; i<elements.length; i++) {
        idCount++;
        elements[i].setAttribute('data-bs-toggle', 'modal');
        elements[i].setAttribute('data-bs-target', '#a' + idCount);
          idCount++;
                    const myModalID = "a" + idCount.toString();
                    const container = document.createElement("div");
                    const myModal = document.createElement("div");
                    myModal.classList.add("modal");
                    myModal.classList.add("fade");
                    myModal.setAttribute("id", myModalID);

                    const modalDialog = document.createElement("div");
                    modalDialog.classList.add("modal-dialog");
                    modalDialog.classList.add("modal-lg");

                    const modalContent = document.createElement("div");
                    modalContent.classList.add("modal-content");

                    const modalHeader = document.createElement("div");
                    modalHeader.classList.add("modal-header");
                    modalHeader.textContent = "Residents of this planet";
                    modalContent.append(modalHeader);

                    const modalBody = document.createElement("div");
                    modalBody.classList.add("modal-body");

                    const test = document.createElement('form');
                    const input = document.createElement('input');
                    input.setAttribute('hello','hello');
                    test.append(input);
                    modalBody.append(test);

                    modalContent.append(modalBody);

                    const modalFooter = document.createElement("div");
                    modalFooter.classList.add("modal-footer");

                    // adding a close button to the modal
                    const closeButton = document.createElement("button");
                    closeButton.textContent = "Close";
                    closeButton.classList.add("btn");
                    closeButton.classList.add("btn-primary");
                    closeButton.setAttribute("data-bs-dismiss", "modal");
                    modalFooter.append(closeButton)
                    modalContent.append(modalFooter);

                    // appending all the elements to the cell of the table
                    modalDialog.append(modalContent);
                    myModal.append(modalDialog);
                    containers[i].append(myModal);
                    containers[i].append(container);
                    const elem = document.createElement('p')
                    p.textContent = "a"
                    container[i].appendChild(elem)
                    const main = document.getElementById('root');
                    main.append(elem);
    }
}