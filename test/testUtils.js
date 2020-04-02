
/**
 * Return the node(s) with the given "data-test" attribute
 * @param {ShallowWrapper} wrapper - enzyme shallow wrapper
 * @param {string} val - data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`)
};