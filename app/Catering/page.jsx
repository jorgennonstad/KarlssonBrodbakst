"use client";

import React from "react";
import "./catering.css";

const Catering = () => {
  const menuItems = [
    {
      title: "Brødplate",
      description: [
        "Nybakt surdeigsbrød med sprø skorpe",
        "Focaccia med oliven og rosmarin",
        "Rustikk landbrød bakt på steinovn",
      ],
      note: "Perfekt til små og store anledninger",
      price: "Kr. 249,- per person",
      image: "https://via.placeholder.com/300x200.png?text=Brødplate",
    },
    {
      title: "Frokostbrød",
      description: [
        "Små rundstykker med forskjellige frø",
        "Håndverksbaguetter",
        "Mini-croissanter for et luksuriøst preg",
      ],
      note: "Inkluderer smør og syltetøy",
      price: "Kr. 199,- per person",
      image: "https://via.placeholder.com/300x200.png?text=Frokostbrød",
    },
    {
      title: "Gourmetbrød",
      description: [
        "Økologisk speltbrød",
        "Rustikt nøttebrød",
        "Honning- og havrebrød",
      ],
      note: "Perfekt til middager og spesielle anledninger",
      price: "Kr. 349,- per person",
      image: "https://via.placeholder.com/300x200.png?text=Gourmetbrød",
    },
    {
      title: "Festbrød",
      description: [
        "Brytebrød med hvitløk og urter",
        "Brød med soltørkede tomater og parmesan",
        "Focaccia fylt med mozzarella",
      ],
      note: "Til store selskaper",
      price: "Kr. 399,- per person",
      image: "https://via.placeholder.com/300x200.png?text=Festbrød",
    },
  ];

  return (
    <div className="catering-container">
      <h1 className="catering-title">Catering</h1>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.title} className="menu-image" />
            <div className="menu-text">
              <h2 className="menu-item-title">{item.title}</h2>
              <ul className="menu-item-description">
                {item.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
              <p className="menu-item-note">{item.note}</p>
              <p className="menu-item-price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catering;
