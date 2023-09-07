const logger = (store)=> (next)=> (action)=>{
    const oldState = store.getState()
    next(action)
    // console.log(store.getState());
}

export default logger;