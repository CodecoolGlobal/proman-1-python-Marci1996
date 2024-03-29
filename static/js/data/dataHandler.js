export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    deleteCard: async function (cardId) {
        return await apiDelete(`/api/delete/${cardId}`);
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost(`/api/createBoard`, boardTitle)
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId) {
        console.log(cardTitle, boardId)
        return await apiPost(`/api/${boardId}/crateCard`, cardTitle)
        // creates new card, saves it and calls the callback function with its data
    },
    renameBoard: async function (boardId, new_title) {
        const url = "/api/rename_board/" + boardId.toString();
        return await apiPost(url, new_title);
    }
};


async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body: JSON.stringify({
    title: payload})
})}

async function apiDelete(url) {
    let response = await  fetch(url, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        }})
}

async function apiPut(url) {
}

async function apiPatch(url) {
}

