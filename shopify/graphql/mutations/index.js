export const CREATE_MENU = `
mutation CreateMenu($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
    menuCreate(title: $title, handle: $handle, items: $items) {
        menu {
            id
            handle
        }
        userErrors {
            code
            field
            message
        }
    }
}
`;

export const DELETE_MENU = `
mutation DeleteMenu($id: ID!) {
    menuDelete(id: $id) {
        deletedMenuId
        userErrors {
            code
            field
            message
        }
    }
}
`;
