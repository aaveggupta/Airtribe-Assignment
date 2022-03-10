import React, { useEffect, useState } from "react";
import useDataLayer from "../../Helpers/StateProvider";
import TextArea from "react-textarea-autosize";
import { DragDropContext } from "react-beautiful-dnd";
import CardList from "../CardList/CardList";

import "./StatusList.css";

import { BiPlus } from "react-icons/bi";
import useOutsideAlerter from "../../Hooks/outsideAlerter";

const StatusList = () => {
  const [{ statusList }, dispatch] = useDataLayer();
  const { visible, setVisible, ref } = useOutsideAlerter(false);
  const [newStatusText, setNewStatusText] = useState("");

  const inputHandler = (event) => {
    setNewStatusText(event.target.value);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    dispatch({
      type: "CARD_DRAGGED",
      dragProps: {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        droppableId: draggableId,
      },
    });
  };

  useEffect(() => {
    if (!visible && newStatusText.trim().length) {
      dispatch({ type: "ADD_STATUS", title: newStatusText });
      console.log("Hello");
      setNewStatusText("");
    }
  }, [visible]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="statuslist">
        <div className="statuslist__statuses">
          {statusList.map((cardList) => (
            <CardList
              key={cardList.id}
              color={cardList.color}
              title={cardList.title}
              cards={cardList.cards}
              cardListID={cardList.id}
            />
          ))}
          {visible && (
            <div ref={ref}>
              <TextArea
                placeholder="New Status"
                type="text"
                className="statuslist__addstatus"
                value={newStatusText}
                onChange={inputHandler}
              />
            </div>
          )}
          <button
            onClick={() => setVisible(true)}
            style={{ visibility: !visible ? "visible" : "hidden" }}
            className="statuslist__new"
          >
            <BiPlus style={{ fontSize: "1.1rem", marginLeft: ".3rem" }} />
            <h5>New Status</h5>
          </button>
        </div>
      </div>
    </DragDropContext>
  );
};

export default StatusList;
