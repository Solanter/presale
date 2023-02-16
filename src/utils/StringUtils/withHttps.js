/**
 * @description adds https:// to the beginning of the url if it is not there
 * @param url
 * @returns {string}
 */
function withHttps(url) {
  if (!url) return url;
  const httpString = "http://";
  const httpsString = "https://";
  if (
    url.substring(0, httpString.length).toLowerCase() !== httpString &&
    url.substring(0, httpsString.length).toLowerCase() !== httpsString
  )
    url = httpsString + url;
  return url;
}

export default withHttps;
