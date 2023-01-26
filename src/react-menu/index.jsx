import React from "react";
import { createRoot } from "react-dom/client";
import Menu from "../menu";
import { injectItem } from "../utils";
import ReactMenu from "./Menu";


class ReactMenuClass extends Menu {
  constructor(editor, props) {
    super(null);
    this.props = props;
    this.items = [];
    this.position = [0, 0];
    this.visible = false;
    this.el = document.createElement("div");
    editor.view.container.appendChild(this.el);

    this.root = createRoot(this.el)


    this.render();
  }

  addItem(title, onClick, path = []) {
    injectItem(this.items, title, onClick, path);
    this.render();
  }

  show(x, y, args) {
    this.position = [x, y];
    this.args = args;
    this.visible = true;
    this.render();
  }

  hide() {
    this.visible = false;
    this.render();
  }

  render() {
    return this.root.render(<ReactMenu
        {...this.props}
        args={this.args}
        items={this.items}
        position={this.position}
        visible={this.visible}
        onClose={() => this.hide()}
      />)
  }
}

export { Menu };

export default ReactMenuClass; // aka "ReactMenu"
