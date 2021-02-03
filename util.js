const filterAnnouncements = (lastEntry, announcementWithAuthor) => {
  let newAnnouncement = null;

  if (lastEntry.length == 0) {
    newAnnouncement = announcementWithAuthor;
  } else {
    let counter = -1;
    for (var i = 0; i < announcementWithAuthor.length; i++) {
      if (announcementWithAuthor[i].announced == lastEntry[0].announced_date) {
        counter = i;
        break;
      }
    }
    newAnnouncement = announcementWithAuthor.slice(0, counter);
  }

  return newAnnouncement;
};

const announcementDBInsert = (newAnnouncements) => {
  let announcementIntoDB = [];
  newAnnouncements.forEach((item) => {
    announcementIntoDB.push([
      item.announced,
      item.title,
      item.link,
      JSON.stringify(item.description),
      item.author,
      item.subtitle,
      item.available,
    ]);
  });

  return announcementIntoDB;
};

const formatDescription = (missingAnnouncements) => {
  const descriptions = [];

  missingAnnouncements.forEach((item, index) => {
    // console.log(item);
    const description = item.description;
    const temp = [];
    if (description.header.length != 0) {
      temp.push(...description.header);
    }
    if (description.bullets.length != 0) {
      temp.push(
        ...description.bullets
          .flat()
          .map((item) => {
            return "- " + item;
          })
          .slice(0, 4)
      );
    } else if (description.sublist.length != 0) {
      temp.push(
        ...description.sublist
          .map((item) => {
            return "- " + item;
          })
          .slice(0, 1)
      );
    }

    temp.push("more...");

    descriptions.push(temp);
  });

  return descriptions;
};

module.exports.filterAnnouncements = filterAnnouncements;
module.exports.announcementDBInsert = announcementDBInsert;
module.exports.formatDescription = formatDescription;
