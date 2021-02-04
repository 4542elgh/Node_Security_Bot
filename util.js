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
      let bullets = [];
      for (var i = 0; i < description.bullets.length; i++) {
        if (description.word[i] != undefined) {
          bullets.push(...description.word[i]);
        }

        if (Array.isArray(description.bullets[i])) {
          for (var j = 0; j < description.bullets[i].length; j++) {
            if (bullets.length < 4) {
              bullets.push("- " + description.bullets[i][j]);
            } else {
              break;
            }
          }
          if (
            bullets.length == 4 &&
            bullets[3].substring(bullets[3].length - 1) != ":"
          ) {
            temp.push(...bullets);
            break;
          } else {
            temp.push(...bullets.slice(0, 3));
            break;
          }
        } else {
          temp.push(...description.bullets.slice(0, 4));
          break;
        }
      }
    } else if (description.sublist.length != 0) {
      temp.push(
        ...description.sublist
          .map((item) => {
            return "- " + item;
          })
          .slice(0, 1)
      );
    }

    descriptions.push(temp);
  });

  return descriptions;
};

module.exports.filterAnnouncements = filterAnnouncements;
module.exports.announcementDBInsert = announcementDBInsert;
module.exports.formatDescription = formatDescription;
