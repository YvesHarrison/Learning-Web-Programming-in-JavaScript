const express = require("express");
const router = express.Router();
let bio={
  "name": "Xinzhe Li",
  "cwid": "10434405",
  "biography": "I was born in October 30th, 1995. I was raised in Beijing. I had lived in Beijing for 18 years before I went to study in university in Shanghai. Beijing and Shanghai are the first biggest city and the second biggest city in China.\nI have an Bachelor degree in Science in Computer Science from ABCDE University. I am now studying for my Master degree in computer science in Stevens Institute of Technology.",
  "favoriteShows": ["Sherlock", "The Big Bang Theory", "Game of Thrones", "Marvel's Agents of S.H.I.E.L.D.","Downton Abbey"],
  "hobbies": ["Playing Video Games", "Traveling", "Cycling","Watching Movies","Programming"]
}
let story={
  "storyTitle": "That time I was admitted by university.",
  "story": "I took my university entrance exam in early June 2014. The exam score usually comes out in late June. And admissison is in early July. After I had taken the exam I was really nervous. I went to travel. I went to temples to prey for good result. I was in Mount Emei where many famous temple locates in a rainy day when the exam score released. \nAs soon as, I received the report about score by cell phone I realized that I could go to the university chosen by me. I sighed with relief. The only thing I needed to worry about was when would I receive my admission letter. I had a relaxed summer vacation and my admission letter came to on time. Then I left Beijing and spent four years' time in Shanghai."
}
let education=[
    {
      "schoolName": "Stevens Institute of Technology",
      "degree": "Master Degree",
      "favoriteClass": "CS 546 Web Programming",
      "favoriteMemory": "Writing lab every week"
    },
    {
      "schoolName": "ABCDE University<",
      "degree": "Bachelor Degree",
      "favoriteClass": "Machine Learning",
      "favoriteMemory": "Many reading material every week"
    },
    {
      "schoolName": "High School Attached to CNU",
      "degree": "High School",
      "favoriteClass": "Physics",
      "favoriteMemory": "Very humorous teacher telling jokes about university entrance exam"
    }
]
router.get("/about", async (req, res) => {
  try {
    //const user = await userData.getUserById(req.params.id);
    res.json(bio);
  } catch (e) {
    res.status(404).json({ message: "no data!" });
  }
});

router.get("/story", async (req, res) => {
  try {
    //const user = await userData.getUserById(req.params.id);
    res.json(story);
    //console.log(story.story);
  } catch (e) {
    res.status(404).json({ message: "no data!" });
  }
});

router.get("/education", async (req, res) => {
  try {
    //const user = await userData.getUserById(req.params.id);
    res.json(education);
  } catch (e) {
    res.status(404).json({ message: "no data!" });
  }
});

module.exports = router;