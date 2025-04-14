/**
 * A utility function to query the dom for a given selector.
 * If the selector returns more than one element, return an array of elements.
 * If the selector returns one element, return the element.
 * If the selector returns no elements, return undefined.
 * @param {string} selector - The selector to query the dom.
 * @returns {(NodeList | Element | undefined)} - The result of the dom query.
 */
export const $ = (selector: string) => {
    if(document.querySelectorAll(selector).length > 1){
        return document.querySelectorAll(selector);
    }
    else {
        if(document.querySelector(selector)){
            return document.querySelector(selector);
    
        }
    }
  
}