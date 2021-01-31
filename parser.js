const parser = () => {
  let cve = -1; // record the current cve index, this only apply to arrays with CVE as first 3 letter
  let marker = -1; //record header plain text if CVE is present. Plain text will be from index 0 to first occurance of CVE string
  const descriptionObject = { sublist: [], header: [] };

  description.forEach((item, index) => {
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
  });

  if (marker != -1) {
    descriptionObject["header"] = description.slice(0, marker);
  }

  return descriptionObject;
};

modules.export = parser;
