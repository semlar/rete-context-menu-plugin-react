import React, { Component } from "react";
import Context from "./context";
import "./style.sass";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSubitems: false,
    };
  }

  onClick = (e) => {
    const {
      item: { onClick },
    } = this.props;
    const { args, onClose } = this.context;

    e.stopPropagation();

    if (onClick) onClick(args);
    onClose();
  };

  render() {
    const {
      item: { title, subitems },
    } = this.props;
    const { visibleSubitems } = this.state;

    return (
      <div
        className={"item" + (subitems ? " hasSubitems" : "")}
        onClick={this.onClick}
        onMouseOver={() => this.setState({ visibleSubitems: true })}
        onMouseLeave={() => this.setState({ visibleSubitems: false })}
      >
        {title}
        {subitems && visibleSubitems && (
          <div className="subitems">
            {subitems.map((subitem, index) => (
              <Item item={subitem} key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Item.contextType = Context;

export default Item;
