import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {createButtonAddBoard} from "../view/htmlFactory.js";


export let boardsManager = {
    loadBoards: async function () {
        addCreateBoardBtn();
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
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
        editBoardTitle()


    },

};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}



function editBoardTitle() {

}
function addCreateBoardBtn(){
    // Adding the divs to the root div
    domManager.addChild("#root", createButtonAddBoard())

    // Getting the elements
    const button = document.getElementById("create-new-board");
    const inputField = document.getElementById("new_board_name");
    const saveNewBoard = document.getElementById("save_new_board_name")

    // Setting default display to none for elements aside from the main button
    inputField.style.display = "none"
    saveNewBoard.style.display = "none"

    // Switching the display on click
    button.onclick = function(){
        button.style.display = 'none';
        inputField.style.display = '';
        saveNewBoard.style.display = '';
    }

    saveNewBoard.addEventListener("click", ()=>{
        // Getting the value from input
        const val = document.querySelector('#new_board_name').value;
        dataHandler.createNewBoard(val)

        // Setting visibility of elements back to normal
        button.style.display = '';
        inputField.style.display = 'none';
        saveNewBoard.style.display = 'none';
    })

}