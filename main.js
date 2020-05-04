let youtubeHeight;
let darkMode;
let postButtons;
let targetNode;
let tellUsWhyForm;
let menuItems = "";
let menuButtonNum;
let buttonNum;

//////////////////////
//Check for dark mode
if (!document.querySelector("html").hasAttribute("dark")) {
  darkMode = false;
} else {
  darkMode = true;
}

//////////////////////////////////
//Check if new videos were loaded
window.addEventListener("scroll", () => {
  if (youtubeHeight !== document.querySelector("ytd-app").getBoundingClientRect().height) {
    updateMain();
    youtubeHeight = document.querySelector("ytd-app").getBoundingClientRect().height;
  }
});

////////////
//Functions
const clickOnAthreeDotMenu = () => {
  targetNode.parentNode.parentNode.querySelector(".yt-icon-button").click();
};

const clickOnAmenu = () => {
  document.querySelector("ytd-popup-container").style.opacity = "0";
  if (menuItems.length < 1) {
    menuItems = document.querySelectorAll("ytd-menu-service-item-renderer");
    window.requestAnimationFrame(clickOnAmenu);
  } else {
    menuItems[menuButtonNum].click();
    menuItems = "";
  }
};

const clickOnAtellUsWhyButton = () => {
  let tellUsWhyButton = targetNode.parentNode.parentNode.parentNode
    .querySelector("#dismissed")
    .querySelectorAll("a")[1];
  if (!tellUsWhyButton) {
    window.requestAnimationFrame(clickOnAtellUsWhyButton);
  } else {
    tellUsWhyButton.click();
  }
};

const tellUsWhyFormAction = () => {
  tellUsWhyForm = document.querySelector("ytd-dismissal-follow-up-renderer");
  if (!tellUsWhyForm || tellUsWhyForm.parentNode.hasAttribute("aria-hidden")) {
    window.requestAnimationFrame(tellUsWhyFormAction);
  } else {
    tellUsWhyForm.parentNode.style.opacity = "0";
    tellUsWhyForm.querySelectorAll("#checkbox")[buttonNum].click();
    //Hide 'TELL US WHY' post-message
    postButtons = targetNode.parentNode.parentNode.parentNode.querySelectorAll(
      "ytd-button-renderer"
    );
    postButtons[1].remove();
    setTimeout(() => {
      //Click 'submit'
      tellUsWhyForm.querySelectorAll("#button")[1].click();
      tellUsWhyForm.parentNode.style.opacity = "1";
      document.querySelector("ytd-popup-container").style.opacity = "1";
    }, 50);
  }
};

const updateMain = () => {
  let containers = document.querySelectorAll(".xcxz-container");
  containers.forEach((container) => container.remove());
  Main();
};

///////
//Main
const Main = () => {
  const videos = document.querySelectorAll("ytd-rich-item-renderer");

  videos.forEach((video) => {
    //If video is not a playlist
    if (!video.querySelector("ytd-thumbnail-overlay-side-panel-renderer")) {
      let containerNode = document.createElement("div");
      containerNode.setAttribute("class", "xcxz-container");

      //1st Button
      let button1Node = document.createElement("div");
      darkMode
        ? button1Node.setAttribute("class", "button dark")
        : button1Node.setAttribute("class", "button light");

      button1Node.addEventListener("click", async (e) => {
        targetNode = e.target;
        menuButtonNum = 3;
        buttonNum = 0;
        clickOnAthreeDotMenu();
        clickOnAmenu();
        clickOnAtellUsWhyButton();
        tellUsWhyFormAction();
      });

      let textNode1 = document.createElement("span");
      darkMode ? textNode1.setAttribute("class", "dark") : textNode1.setAttribute("class", "light");
      textNode1.innerHTML = "WATCHED";
      button1Node.append(textNode1);
      containerNode.append(button1Node);

      //2nd Button
      let button2Node = document.createElement("div");
      darkMode
        ? button2Node.setAttribute("class", "button dark")
        : button2Node.setAttribute("class", "button light");

      button2Node.addEventListener("click", (e) => {
        targetNode = e.target;
        buttonNum = 1;
        menuButtonNum = 3;
        clickOnAthreeDotMenu();
        clickOnAmenu();
        clickOnAtellUsWhyButton();
        tellUsWhyFormAction();
      });

      let textNode2 = document.createElement("span");
      darkMode ? textNode2.setAttribute("class", "dark") : textNode2.setAttribute("class", "light");
      textNode2.innerHTML = "DISLIKE VIDEO";
      button2Node.append(textNode2);
      containerNode.append(button2Node);

      //3rd Button
      let button3Node = document.createElement("div");
      darkMode
        ? button3Node.setAttribute("class", "button dark")
        : button3Node.setAttribute("class", "button light");

      button3Node.addEventListener("click", (e) => {
        menuButtonNum = 4;
        targetNode = e.target;
        clickOnAthreeDotMenu();
        clickOnAmenu();
      });
      let textNode3 = document.createElement("span");
      darkMode ? textNode3.setAttribute("class", "dark") : textNode3.setAttribute("class", "light");
      textNode3.innerHTML = "DISLIKE CHANNEL";
      button3Node.append(textNode3);
      containerNode.append(button3Node);

      let currentVideo = video.querySelector("#dismissable");
      currentVideo &&
        currentVideo.insertBefore(containerNode, currentVideo.querySelector("#details"));
    }
  });
  youtubeHeight = document.querySelector("ytd-app").getBoundingClientRect().height;
};

Main();
