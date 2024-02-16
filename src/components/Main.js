import React, { useState, useEffect } from "react";
import data from "./data.json";
import "./Main.css";

const Main = () => {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setCards(data);
  }, []);

  const handleEdit = (id) => {
    console.log("isModalOpen", isModalOpen);
    const cardToEdit = cards.find((card) => card.id === id);
    setEditedData(cardToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === editedData.id ? { ...editedData } : card
      )
    );
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const handleToggleLike = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, liked: !card.liked } : card
      )
    );
  };

  return (
    <div>
      {cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="card-header">
            <img src={card.avatar} alt="Avatar" className="avatar" />
          </div>

          <div className="card-body">
            <h3>{card.name}</h3>
            <p>
              <img src="/svg/email.svg" alt="Email Icon" className="icon" />{" "}
              {card.email}
            </p>
            <p>
              <img src="/svg/phone.svg" alt="Phone Icon" className="icon" />{" "}
              {card.phone}
            </p>
            <p>
              <img src="/svg/website.svg" alt="Website Icon" className="icon" />{" "}
              {card.website}
            </p>
          </div>

          <div className="card-footer">
            <div
              className="footer-icon-container"
              onClick={() => handleToggleLike(card.id)}
            >
              {card.liked ? (
                <img
                  src="/svg/selected.svg"
                  alt="Selected Icon"
                  className="footer-icon"
                />
              ) : (
                <img
                  src="/svg/like.svg"
                  alt="Like Icon"
                  className="footer-icon"
                />
              )}
              <div className="footer-icon-line"></div>
            </div>
            <div
              className="footer-icon-container"
              onClick={() => handleEdit(card.id)}
            >
              <img
                src="/svg/edit.svg"
                alt="Edit Icon"
                className="footer-icon"
              />
              <div className="footer-icon-line"></div>
            </div>
            <div
              className="footer-icon-container"
              onClick={() => handleDelete(card.id)}
            >
              <img
                src="/svg/delete.svg"
                alt="Delete Icon"
                className="footer-icon"
              />
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Basic Modal</h2>
              <span className="close" onClick={handleCloseModal}>
                ×
              </span>
            </div>
            <div className="modal-body">
              <div className="input-wrapper">
                <label className="label" htmlFor="name">
                  <span className="required-star">*</span>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input-field"
                  value={editedData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-wrapper">
                <label className="label" htmlFor="email">
                  <span className="required-star">*</span>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  value={editedData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-wrapper">
                <label className="label" htmlFor="phone">
                  <span className="required-star">*</span>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="input-field"
                  value={editedData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-wrapper">
                <label className="label" htmlFor="website">
                  <span className="required-star">*</span>
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="input-field"
                  value={editedData.website}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
