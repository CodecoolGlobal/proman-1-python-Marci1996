export const htmlTemplates = {
    board: 1,
    card: 2,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container" id=${board.id}>
                <div class="board" data-board-id=${board.id}>${board.title} </div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                <button class="Save_btn" data-board-id="${board.id}">Save</button>   
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card-container" id="${card.id}">
    <div class="card" data-card-id="${card.id}">${card.title}</div>
    <div><button class="delete-card-button" data-card-id="${card.id}">Delete card &times;</button></div>
    </div>`;
}

export function createButtonAddBoard(){
    return `<div>
    <button class="button" id="create-new-board">Create New Board</button>
    <input id="new_board_name">
    <button class="btn btn-primary" id="save_new_board_name">Save</button>
    </div>`;
}







