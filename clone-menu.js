import { getUserInput } from "./user-input/index.js";
import { GET_MENUS } from "./shopify/graphql/queries/index.js";
import { mutateData, queryData } from "./shopify/index.js";
import { CREATE_MENU } from "./shopify/graphql/mutations/index.js";

(async () => {
    // ! 1. Get menus
    const menus = await queryData(GET_MENUS, { first: 250 });

    if (menus?.errors?.length > 0) return console.log(JSON.stringify(menus.errors, null, 2));

    // ! 2. Get selected menu (selected by the user)
    const menuTitles = menus.data.menus.edges.map(({ node }) => ({
        name: `${node.title} (${node.handle})`,
        value: node.id,
    }));

    const { selectedTitleMenu, newMenuTitle } = await getUserInput([
        {
            type: "list",
            name: "selectedTitleMenu",
            message: "Select a menu",
            choices: menuTitles,
        },
        {
            type: "input",
            name: "newMenuTitle",
            message: "New menu title",
            validate(value) {
                if (value.length) return true;
                else return "Please enter a valid title! Length > 0";
            },
        },
    ]);

    if (!selectedTitleMenu) return console.log("Failed to get selected menu");

    // ! 3. Find menu by its title
    const selectedMenu = menus.data.menus.edges.find(({ node }) => node.id === selectedTitleMenu);

    // ! 4. Clone menu
    const clonedMenu = await mutateData(CREATE_MENU, {
        handle: selectedMenu.node.handle,
        title: newMenuTitle,
        items: selectedMenu.node.items,
    });

    if (clonedMenu.data.menuCreate.userErrors.length > 0) return console.log(JSON.stringify(clonedMenu.data.menuCreate.userErrors, null, 2));

    console.log("Menu cloned successfully", JSON.stringify(clonedMenu, null, 2));
})();
