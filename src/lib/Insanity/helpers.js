export function assignRecursively(initial, update, nullIsDelete=true){
    for(let prop in update){
        if(nullIsDelete && update[prop] === null){
            delete initial[prop];
        }

        if({}.hasOwnProperty.call(initial, prop)){
            if(typeof update[prop] === 'object' && 
                typeof initial[prop] === 'object'){
                    assignRecursively(initial[prop], update[prop]);
            }else{
                initial[prop] = update[prop];
            }
        }else{
            initial[prop] = update[prop];
        }
    }
    return initial;
}