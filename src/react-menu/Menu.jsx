import React from "react";
import Context from "./context";
import Item from "./Item";
import "./style.sass";

export default ({ items, position: [x, y], visible, args, onClose }) => {
  if (!visible) return null;

  return (
    <Context.Provider value={{ args, onClose }}>
      <div className="context-menu" style={{ left: x + "px", top: y + "px" }}>
        {items.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </div>
    </Context.Provider>
  );
};
