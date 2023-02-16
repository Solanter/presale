/**
 *
 * @param obj{Object}
 * @param path{String}
 * @returns {any}
 */
const nestedAccess = (obj, path) => {
  return path.split(".").reduce((acc, curr) => acc && acc[curr], obj);
};
export default nestedAccess;
