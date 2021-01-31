const parser = () => {
  let cve = -1; // record the current cve index, this only apply to arrays with CVE as first 3 letter
  let marker = -1; //record header plain text if CVE is present. Plain text will be from index 0 to first occurance of CVE string
  description["sublist"] = [];
  const descriptionObject = { sublist: [], header: [], bullets: {} };

  let colon = -1;
  let start = -1;
  const bulletTextObject = { word: "", bullets: [] };

  description.forEach((item, index) => {
    // console.log(item)
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

    // Getting text if word ends with colon excluding "Vulnerabilities fixed"
    if (
      item.substring(item.length - 1) === ":" &&
      item !== "Vulnerabilities fixed:"
    ) {
      if (colon > -1) {
        if (start == index - 1) {
          bulletTextObject["word"] = description[colon];
          bulletTextObject["bullets"] = [description[start]];
        } else {
          bulletTextObject["word"] = description[colon];
          bulletTextObject["bullets"] = description.slice(start, index);
        }
        console.log(bulletTextObject);
      }
      colon = index;
      start = index + 1;
    }

    // end of string
    if (
      description.length - 1 == index &&
      colon > -1 &&
      item !== "Vulnerabilities fixed:"
    ) {
      if (start == index) {
        bulletTextObject["word"] = description[colon];
        bulletTextObject["bullets"] = [description[start]];
      } else {
        bulletTextObject["word"] = description[colon];
        bulletTextObject["bullets"] = description.slice(start, index + 1);
      }
      console.log(bulletTextObject);
      colon = -1;
      start = -1;
    }
  });

  if (marker != -1) {
    descriptionObject["header"] = description.slice(0, marker);
  }
};

modules.export = parser;
