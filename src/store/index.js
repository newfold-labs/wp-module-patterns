import { createReduxStore, register } from "@wordpress/data";

import { STORE_NAME } from "./constants";

import * as actions from "./actions";
import * as selectors from "./selectors";
import reducer from "./reducer";

export const nfdWonderBlocksStoreOptions = {
	reducer,
	actions,
	selectors,
};

export const store = createReduxStore(STORE_NAME, nfdWonderBlocksStoreOptions);
register(store);
