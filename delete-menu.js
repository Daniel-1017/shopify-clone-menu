import { getUserInput } from "./user-input/index.js";
import { GET_MENUS } from "./shopify/graphql/queries/index.js";
import { mutateData, queryData } from "./shopify/index.js";
import { DELETE_MENU } from "./shopify/graphql/mutations/index.js";

(async () => {
    // ! 1. Get menus
    const menus = await queryData(GET_MENUS, { first: 250 });

    if (menus?.errors?.length > 0) return console.log(JSON.stringify(menus.errors, null, 2));

    // ! 2. Get selected menu (selected by the user)
    const menuTitles = menus.data.menus.edges.map(({ node }) => ({
        name: `${node.title} (${node.handle})`,
        value: node.id,
    }));
    const { selectedTitleMenu } = await getUserInput([
        {
            type: "list",
            name: "selectedTitleMenu",
            message: "Select a menu",
            choices: menuTitles,
        },
    ]);

    if (!selectedTitleMenu) return console.log("Failed to get selected menu");

    // ! 3. Find menu by its title
    const selectedMenu = menus.data.menus.edges.find(({ node }) => node.id === selectedTitleMenu);

    // ! 4. Clone menu
    const deletedMenu = await mutateData(DELETE_MENU, {
        id: selectedMenu.node.id,
    });

    if (deletedMenu.data.menuDelete.userErrors.length > 0) return console.log(JSON.stringify(deletedMenu.data.menuDelete.userErrors, null, 2));

    console.log("Menu deleted successfully", JSON.stringify(deletedMenu, null, 2));
})();
