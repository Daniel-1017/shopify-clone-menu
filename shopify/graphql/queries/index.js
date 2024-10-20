export const GET_MENUS = `
query getMenus($first: Int) {
    menus(first: $first) {
        edges {
            node {
                id
                handle
                title
                items {
                    tags
                    title
                    type
                    url
                    items {
                        tags
                        title
                        type
                        url 
                        items {
                            tags
                            title
                            type
                            url 
                        }
                    }
                }
            }
        }
    }
}
`;
