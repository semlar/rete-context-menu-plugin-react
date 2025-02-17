import getMainMenu from "./main-menu";
import IMenu from "./menu";
import getNodeMenu from "./node-menu";
import ReactMenu, * as ReactComponents from "./react-menu";

function install(
  editor,
  {
    searchBar = true,
    searchKeep = () => false,
    delay = 1000,
    items = {},
    nodeItems = {},
    allocate = () => [],
    rename = (component) => component.name,
    Menu = ReactMenu,
    createRoot,
  }
) {
  //if (!Menu) throw new TypeError("Menu must be defined");
  if (!Menu) Menu = ReactMenu;

  editor.bind("hidecontextmenu");
  const mainMenu = new (getMainMenu(Menu))(
    editor,
    { searchBar, searchKeep, delay },
    { items, allocate, rename }
  );
  const nodeMenu = new (getNodeMenu(Menu))(
    editor,
    { searchBar: false, delay },
    nodeItems
  );

  editor.on("hidecontextmenu", () => {
    mainMenu.hide();
    nodeMenu.hide();
  });

  editor.on("click contextmenu", () => {
    editor.trigger("hidecontextmenu");
  });

  editor.on("contextmenu", ({ e, node }) => {
    e.preventDefault();
    e.stopPropagation();

    const [x, y] = [e.clientX, e.clientY];

    const menu = (node ? nodeMenu : mainMenu);
    menu.show(x, y, { node });
  });
}

export { ReactMenu, ReactComponents, IMenu };

export default {
  name: "context-menu",
  install,
};
