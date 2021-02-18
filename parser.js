const parser = (description) => {
  let cve = -1; // record the current cve index, this only apply to arrays with CVE as first 3 letter
  let marker = -1; //record header plain text if CVE is present. Plain text will be from index 0 to first occurance of CVE string
  let colon = -1;
  let start = -1;

  const descriptionObject = { word: [], sublist: [], header: [], bullets: [] };

  // This part need some serious rework
  description.forEach((item, index) => {
    if (
      item.indexOf("[") != -1 &&
      item.indexOf("]") - item.indexOf("[") == 11 &&
      start == -1 &&
      colon == -1
    ) {
      descriptionObject.bullets.push(item);
    }

    if (item.substring(0, 3) == "CVE") {
      if (cve == -1) {
        marker = index;
      } else {
        descriptionObject["sublist"].push(
          description.slice(cve, index).join("")
        );
      }

      cve = index;
    }

    if (index == description.length - 1 && cve != -1) {
      descriptionObject["sublist"].push(
        description.slice(cve, description.length).join("")
      );
    }

    // For bullet list with colon
    // Getting text if word ends with colon excluding "Vulnerabilities fixed"
    if (
      item.substring(item.length - 1) === ":" &&
      item !== "Vulnerabilities fixed:"
    ) {
      // update colon and start index after 1st iteration
      if (colon > -1) {
        if (start == index - 1) {
          descriptionObject["word"].push([description[colon]]);
          descriptionObject["bullets"].push([description[start]]);
        } else {
          descriptionObject["word"].push([description[colon]]);
          descriptionObject["bullets"].push(description.slice(start, index));
        }
      }

      // record which element have colon
      colon = index;
      // whatever comes next, will be the start of the bullet array
      start = index + 1;
    }

    if (
      item.substring(0, 3) != "CVE" &&
      item.substring(item.length - 1) != ":" &&
      item.indexOf("Read more...") == -1 &&
      item.indexOf("]") - item.indexOf("[") != 11 &&
      colon == -1 &&
      start == -1
    ) {
      descriptionObject.header.push(item);
    }

    // reach end of one single blog's elements array and a colon is found
    if (
      description.length - 1 == index &&
      colon > -1 &&
      item !== "Vulnerabilities fixed:"
    ) {
      // If there is only one bullet, and its located at the last element
      if (start == index) {
        descriptionObject["word"].push([description[colon]]);
        descriptionObject["bullets"].push([description[start]]);
      } else {
        // Multiple bullets till the last element
        descriptionObject["word"].push([description[colon]]);
        descriptionObject["bullets"].push(description.slice(start, index + 1));
      }

      colon = -1;
      start = -1;
    }
  });

  if (marker != -1) {
    descriptionObject["header"] = description.slice(0, marker);
  }
  console.log(descriptionObject)
  return descriptionObject;
};

module.exports = parser;
