export const updateObject = (oldObject,updatedProps) => {
    return{
        ...oldObject,
        ...updatedProps
    }
}

export const checkValidity = (value,rules) => {
    let isValid = false;
    
    if(!rules)
        return true;

    if(rules.required)
        isValid = value.trim() !== '';

    if(!isValid)
        return false;

    if(rules.minLength)
    {
        if(rules.minLength<= value.length)
            isValid = true;
        else
            isValid = false;
    }
    
    if(!isValid)
        return isValid;
        
    if(rules.maxLength)
    {
        if(rules.maxLength >= value.length)
            isValid = true;
        else
            isValid = false;
    }

    return isValid;
}
