const parser = (description) => {
  let cve = -1; // record the current cve index, this only apply to arrays with CVE as first 3 letter
  let marker = -1; //record header plain text if CVE is present. Plain text will be from index 0 to first occurance of CVE string
  let colon = -1; // record position of colon
  let start = -1; // record position of word after colon
  const final = description.length // record index of final word
  const keyWords = ["Vulnerabilities fixed:", "CVE"] // keywords used to check for bullet points
  const descriptionObject = { word: [], sublist: [], header: [], bullets: [] };
  const bullets = descriptionObject["bullets"]

  // Iterating through descripion to extract and organize text
  description.forEach((item, index) => {

  // Variables to track locations
  const hasCVE = keyWords.includes(item.substring(0, 3))
  const hasEndColon = item.substring(item.length - 1) == ":"
  const hasKeyWord = keyWords.includes(item)
  const prevColonExists = colon > -1 ? true : false
  const isEndItem = start == index - 1
  const isNotLink = item.indexOf("Read more...") == -1
  const isNotID = item.indexOf("]") - item.indexOf("[") != 11
  const isFirst = colon == -1 && start == -1

  // Adding header
  if (!hasCVE && !hasEndColon && isNotLink && isNotID && isFirst) {
    descriptionObject.header.push(item)
  }
  
  // Adding bullet text that contain id within bracket (ex: [e8a4e560ea])
  item.indexOf("]") > item.indexOf("[") ? descriptionObject.bullets.push(item) : false

  // Adding bullet text that begins with CVE to sublist
  if (hasCVE) {
    sublist(descriptionObject, description, cve, index)
    index == final - 1 ? sublist(descriptionObject, description, cve, final) : false
    cve = index
  }

  // Adding text that contain a colon at the end
  if (hasEndColon && !hasKeyWord) {
    if (prevColonExists) {
      descriptionObject["word"].push(description[colon])
      isEndItem ? bullets.push([description[colon]]) : bullets.push(description.slice(start, index))
    }
    // Update locations of colon and next word
    colon = index;
    start = index + 1;
  }
  
  });

  console.log(descriptionObject)

  return descriptionObject;
};

// description object, description, start, end
function sublist(o, d, s, e) {
  o["sublist"].push(d.slice(s, e).join(""))
} 

module.exports = parser;
