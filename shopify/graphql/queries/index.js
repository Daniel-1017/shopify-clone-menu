export const GET_MENUS = `
query getMenus($first: Int, $after: String) {
    menus(first: $first, after: $after) {
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
        pageInfo {
            endCursor
            hasNextPage
        }
    }
}
`;
