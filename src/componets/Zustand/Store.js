import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { produce } from "immer";

// const initialState = create((set)=>({

//           items : [],

//           addItems:(newItems) => set((state)=>({items:[]})),

// }))  


const useCountStore = create(


          devtools((get, set)=>({

                    data: {
                              email: "admin@gmail.com",
                              password : "admin@123"
                    },
                    auth: (payload) => {
                      set(
                        produce((draft) => {
                          draft.data = payload;
                        })
                      );
                    },
                

          }))

);

export default useCountStore;

