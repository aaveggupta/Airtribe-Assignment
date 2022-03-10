import React, { useEffect, useState } from "react";
import Textarea from "react-textarea-autosize";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

import "./CardList.css";

import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import useOutsideAlerter from "../../Hooks/outsideAlerter";
import useDataLayer from "../../Helpers/StateProvider";

const CardList = ({ title, cards, cardListID, color }) => {
  const [newCardText, setNewCardText] = useState("");
  const { visible, setVisible, ref } = useOutsideAlerter(false);
  const [{}, dispatch] = useDataLayer();

  const inputHandler = (event) => {
    setNewCardText(event.target.value);
  };

  const deleteList = () => {
    dispatch({
      type: "DELETE_LIST",
      payload: {
        listIdDel: cardListID,
      },
    });
  };

  useEffect(() => {
    if (!visible && newCardText.trim().length) {
      dispatch({
        type: "ADD_CARD",
        title: newCardText,
        cardListID: cardListID,
      });
      setNewCardText("");
    }
  }, [visible]);

  return (
    <Droppable droppableId={String(cardListID)}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="cardlist"
        >
          <div className="cardlist__top">
            <div className="cardlist__top__left">
              <h5
                className="cardlist__top__left-title"
                style={{ backgroundColor: `${color}` }}
              >
                {title}
              </h5>
              <h5 className="cardlist__top__left-count">{cards.length}</h5>
            </div>
            <div className="cardlist__top__right">
              <MdDelete
                onClick={deleteList}
                style={{ cursor: "pointer", fontSize: ".99rem" }}
              />
              <BiPlus
                onClick={() => setVisible(true)}
                style={{ marginLeft: ".2rem", cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="cardlist__body">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                index={index}
                title={card.title}
                cardID={card.id}
                cardListID={cardListID}
                description={card.description}
              />
            ))}
            {visible && (
              <div ref={ref}>
                <Textarea
                  placeholder="Type a name..."
                  type="text"
                  className="cardlist__addcard"
                  value={newCardText}
                  onChange={inputHandler}
                />
              </div>
            )}
          </div>
          <button onClick={() => setVisible(true)} className="cardlist__bottom">
            <BiPlus style={{ fontSize: "1.1rem", marginLeft: ".3rem" }} />
            <h5>New</h5>
          </button>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CardList;
