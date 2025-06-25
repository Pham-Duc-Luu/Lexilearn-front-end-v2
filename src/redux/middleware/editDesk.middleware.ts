import { createListenerMiddleware } from '@reduxjs/toolkit';

// Create the middleware instance and methods
const EditDeskMiddleware = createListenerMiddleware();

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// EditDeskMiddleware.startListening({
//   actionCreator: setCurrFlashcardPositionId,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     const state = listenerApi.getState() as RootState;
//   },
// });

export default EditDeskMiddleware;
