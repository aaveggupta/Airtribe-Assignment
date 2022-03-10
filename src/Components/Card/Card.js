import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import useOutsideAlerter from "../../Hooks/outsideAlerter";
import CardDetail from "../CardDetail/CardDetail";

import "./Card.css";

const Card = ({ title, index, cardID, description, cardListID }) => {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  return (
    <>
      <Draggable draggableId={String(cardID)} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card" onClick={() => setVisible(true)}>
              <h4>{title.length ? title : "Untitled"}</h4>
            </div>
          </div>
        )}
      </Draggable>
      {visible && (
        <CardDetail
          title={title}
          description={description}
          close={close}
          cardId={cardID}
          cardListId={cardListID}
        />
      )}
    </>
  );
};

export default Card;
