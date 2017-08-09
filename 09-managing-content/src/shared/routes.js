export const HOME_PAGE_ROUTE = '/';
export const TUTORIALS_PAGE_ROUTE = '/tutorials';
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404';

export const articleRoute = docname => `/article/${docname || ':docname'}`;
export const firstEndpointRoute = num => `/ajax/first/${num || ':num'}`;
