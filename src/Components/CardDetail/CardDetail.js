import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TextArea from "react-textarea-autosize";

import "./CardDetail.css";

import { FaChevronCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useDataLayer from "../../Helpers/StateProvider";

const CardDetail = ({ title, close, cardId, description, cardListId }) => {
  const [cardTitle, setCardTitle] = useState(title);
  const [cardDescription, setCardDescription] = useState(description);
  const [cardStatus, setCardStatus] = useState();

  const [{ statusList }, dispatch] = useDataLayer();
  const [defaultStatus, setDefaultStatus] = useState("");

  const [status, setStatus] = useState([]);
  useEffect(() => {
    setStatus([]);
    statusList.map((cardList) => {
      setStatus((status) => [
        ...status,
        { name: cardList.title, id: cardList.id },
      ]);
      if (cardList.id === cardListId) {
        setDefaultStatus(cardList.title);
        setCardStatus(cardList.id);
      }
    });
  }, [statusList]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_TITLE",
      payload: {
        cardId: cardId,
        cardListId: cardListId,
        newTitle: cardTitle,
      },
    });
  }, [cardTitle]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_DESCRIPTION",
      payload: {
        cardIdDes: cardId,
        cardListIdDes: cardListId,
        newDes: cardDescription,
      },
    });
  }, [cardDescription]);

  useEffect(() => {
    let Index = "";
    statusList.map((cardList) => {
      if (cardList.id === cardListId) {
        cardList.cards.map((card, index) => {
          if (card.id === cardId) {
            Index = index;
          }
        });
      }
    });
    if (cardStatus && cardListId !== cardStatus) {
      dispatch({
        type: "CHANGE_STATUS",
        payload: {
          from: cardListId,
          to: cardStatus,
          who: cardId,
          index: Index,
        },
      });
    }
  }, [cardStatus]);

  const deleteCard = () => {
    dispatch({
      type: "DELETE_CARD",
      payload: {
        cardIdDel: cardId,
        cardListIdDel: cardListId,
      },
    });
  };

  const closeHandler = (where) => {
    where === "outer" && close();
  };
  return ReactDOM.createPortal(
    <>
      <div
        className="carddetail__overlay"
        onClick={() => closeHandler("outer")}
      ></div>
      <div className="carddetail__top">
        <MdDelete onClick={deleteCard} className="carddetail__delete" />
        <div className="carddetail" onClick={() => closeHandler("inner")}>
          <input
            className="carddetail__title"
            value={cardTitle}
            placeholder="Untitled"
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <div className="carddetail__status">
            <div className="carddetail__status-left">
              <FaChevronCircleDown />
              <h6>Status</h6>
            </div>
            <select
              className="carddetail__status-list"
              value={cardStatus}
              defaultValue={defaultStatus}
              onChange={(e) => setCardStatus(e.target.value)}
            >
              {status.map((obj, index) => (
                <option key={index} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>
          <TextArea
            type="text"
            value={cardDescription}
            placeholder="Add a description..."
            onChange={(e) => setCardDescription(e.target.value)}
            className="carddetail__desc"
          />
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CardDetail;
