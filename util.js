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

module.exports.filterAnnouncements = filterAnnouncements;
module.exports.announcementDBInsert = announcementDBInsert;
