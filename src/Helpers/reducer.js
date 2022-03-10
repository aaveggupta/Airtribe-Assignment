export const initialState = {
  statusList: [
    {
      id: "list0",
      color: "#FFCCD1",
      title: "Not Started",
      cards: [
        {
          id: "card0",
          title: "Task-1",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card1",
          title: "Task-2",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
      ],
    },
    {
      id: "list1",
      color: "#FBEECC",
      title: "In Progress",
      cards: [
        {
          id: "card2",
          title: "Task-1",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card3",
          title: "Task-2",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card4",
          title: "Task-3",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card5",
          title: "Task-4",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
      ],
    },
    {
      id: "list2",
      color: "#CCE7E1",
      title: "Done",
      cards: [
        {
          id: "card6",
          title: "Airtribe Assignment",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card7",
          title: "Task-2",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
        {
          id: "card8",
          title: "Task-3",
          description: "Hey there, I am Aaveg! I hope you liked my work! :)",
        },
      ],
    },
  ],
};

let listID = 2;
let cardID = 8;

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_STATUS":
      listID += 1;
      return {
        ...state,
        statusList: [
          ...state.statusList,
          {
            id: `list${listID}`,
            title: action.title,
            cards: [],
          },
        ],
      };
    case "ADD_CARD":
      cardID += 1;
      let newState;
      newState = state.statusList.map((cardList) => {
        if (cardList.id === action.cardListID) {
          cardList.cards.push({
            id: `card${cardID}`,
            title: action.title,
          });
        }
        return cardList;
      });
      return {
        ...state,
        statusList: newState,
      };
    case "CARD_DRAGGED":
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type,
      } = action.dragProps;

      if (droppableIdStart === droppableIdEnd) {
        const statusList = state.statusList.find(
          (list) => droppableIdStart === list.id
        );
        const card = statusList.cards.splice(droppableIndexStart, 1);
        statusList.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: statusList };
      }

      if (droppableIdStart !== droppableIdEnd) {
        const statusListStart = state.statusList.find(
          (list) => droppableIdStart === list.id
        );
        const card = statusListStart.cards.splice(droppableIndexStart, 1);
        const statusListEnd = state.statusList.find(
          (list) => droppableIdEnd === list.id
        );
        statusListEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: statusListStart,
          [droppableIdEnd]: statusListEnd,
        };
      }
      return state;
    case "UPDATE_TITLE":
      const { cardId, cardListId, newTitle } = action.payload;
      let newStateTitle = state.statusList.map((cardList) => {
        if (cardList.id === cardListId) {
          cardList.cards.map((card) => {
            if (card.id === cardId) {
              card.title = newTitle;
            }
          });
        }
        return cardList;
      });
      return {
        ...state,
        statusList: newStateTitle,
      };
    case "UPDATE_DESCRIPTION":
      const { cardIdDes, cardListIdDes, newDes } = action.payload;
      let newStateTitleDes = state.statusList.map((cardList) => {
        if (cardList.id === cardListIdDes) {
          cardList.cards.map((card) => {
            if (card.id === cardIdDes) {
              card.description = newDes;
            }
          });
        }
        return cardList;
      });
      return {
        ...state,
        statusList: newStateTitleDes,
      };
    case "CHANGE_STATUS":
      const { from, to, index } = action.payload;
      const statusListSt = state.statusList.find((list) => from === list.id);
      const card = statusListSt.cards.splice(index, 1);
      const statusListEn = state.statusList.find((list) => to === list.id);
      statusListEn.cards.splice(0, 0, ...card);
      return {
        ...state,
        [from]: statusListSt,
        [to]: statusListEn,
      };
    case "DELETE_CARD":
      const { cardListIdDel, cardIdDel } = action.payload;
      const list = state.statusList.find((list) => cardListIdDel === list.id);
      const newCards = list.cards.filter((card) => card.id !== cardIdDel);
      let newStateTitleDel = state.statusList.map((cardList) => {
        if (cardList.id === cardListIdDel) {
          return {
            ...cardList,
            cards: newCards,
          };
        } else {
          return cardList;
        }
      });
      return {
        ...state,
        statusList: newStateTitleDel,
      };
    case "DELETE_LIST":
      const { listIdDel } = action.payload;
      const listDel = state.statusList.filter((list) => listIdDel !== list.id);
      return {
        ...state,
        statusList: listDel,
      };
    case "SET_STATUSLIST":
      return {
        ...state,
        statusList: action.statusList,
      };
    default:
      return state;
  }
};
