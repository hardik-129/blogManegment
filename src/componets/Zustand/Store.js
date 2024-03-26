// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { produce } from "immer";

// const initialState = create((set)=>({

//           items : [],

//           addItems:(newItems) => set((state)=>({items:[]})),

// }))  


// const useCountStore = create(


//           devtools((get, set)=>({

//                     token: "",
//                     auth: (payload) => {
//                       set(
//                         produce((draft) => {
//                           draft.token = payload;
//                         })
//                       );
//                     },
//                     userName: "",
//                     name : (payload) => {
//                       set(
//                         produce((draft) => {
//                           draft.userName = payload;
//                         })
//                       );
//                     },

//           }))

// );

// export default useCountStore;

