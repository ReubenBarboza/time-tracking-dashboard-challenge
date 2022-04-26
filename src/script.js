const dataJSON = async () => {
  const response = await fetch("../../data.json");
  return await response.json();
};
//active

const reportBottomList = document.querySelectorAll(".report-bottom-list li");
const reportBottomLinks = document.querySelectorAll(".report-bottom-list li a");
let currentActiveLink;

reportBottomList.forEach((li) => {
  li.addEventListener("click", (e) => {
    reportBottomLinks.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    currentActiveLink = e.target.textContent;
  });
});

//hover container svg problem that took a lot of time to solve :)
function hoverSvgContainer() {
  const svgs = document.querySelectorAll(".svg");
  const containers = document.querySelectorAll("div.inner-container");

  svgs.forEach((svg, i) => {
    svg.addEventListener("mouseover", () => {
      containers[i].style["background-color"] = "hsl(235, 46%, 20%)";
    });
    svg.addEventListener("mouseout", () => {
      containers[i].style.removeProperty("background-color");
    });
  });
}

//templates
const templates = document.querySelectorAll("template");

const dataObjects = async () => {
  let dataObject = await dataJSON();

  templates.forEach((t) => {
    dataObject.forEach((o) => {
      if (o.title === t.dataset.name) {
        const templateContent = t.content.cloneNode(true);
        const dailyCurrentTime = o.timeframes.daily.current;
        const dailyPreviousTime = o.timeframes.daily.previous;

        const parentDiv = t.parentElement;

        templateContent.querySelector(".title").textContent = o.title;

        templateContent.querySelector(
          ".time-span-container .time"
        ).textContent = `${dailyCurrentTime}${
          dailyCurrentTime === 1 ? "hr" : "hrs"
        }`;

        templateContent.querySelector(
          ".time-span-container span"
        ).textContent = `Last Day - ${dailyPreviousTime}${
          dailyPreviousTime === 1 ? "hr" : "hrs"
        }`;

        const divToInsert = document.createElement("div");
        divToInsert.classList.add("inner-container");
        divToInsert.appendChild(templateContent);
        parentDiv.appendChild(divToInsert);

        hoverSvgContainer();
      }
    });
  });

  function replaceDivAfterChangingLink(
    templateContent,
    currentTime,
    previousTime,
    toReplaceDiv,
    dayMonthWeek
  ) {
    templateContent.querySelector(
      ".time-span-container .time"
    ).textContent = `${currentTime}${currentTime === 1 ? "hr" : "hrs"}`;

    templateContent.querySelector(
      ".time-span-container span"
    ).textContent = `Last ${dayMonthWeek} - ${previousTime}${
      previousTime === 1 ? "hr" : "hrs"
    }`;

    const divToInsert = document.createElement("div");
    divToInsert.classList.add("inner-container");
    divToInsert.append(templateContent);
    toReplaceDiv.replaceWith(divToInsert);

    hoverSvgContainer();
  }

  reportBottomLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      templates.forEach((t) => {
        dataObject.forEach((o) => {
          if (o.title === t.dataset.name) {
            const templateContent = t.content.cloneNode(true);

            const dailyCurrentTime = o.timeframes.daily.current;
            const dailyPreviousTime = o.timeframes.daily.previous;

            const weeklyCurrentTime = o.timeframes.weekly.current;
            const weeklyPreviousTime = o.timeframes.weekly.previous;

            const monthlyCurrentTime = o.timeframes.monthly.current;
            const monthlyPreviousTime = o.timeframes.monthly.previous;

            const toReplaceDiv = document.querySelector(
              `.${o.title.toLowerCase().split(" ").join("-")}>div`
            );

            templateContent.querySelector(".title").textContent = o.title;

            if (e.target.textContent === "Weekly") {
              replaceDivAfterChangingLink(
                templateContent,
                weeklyCurrentTime,
                weeklyPreviousTime,
                toReplaceDiv,
                "Week"
              );
              // templateContent.querySelector(
              //   ".time-span-container .time"
              // ).textContent = `${weeklyCurrentTime}${
              //   weeklyCurrentTime === 1 ? "hr" : "hrs"
              // }`;

              // templateContent.querySelector(
              //   ".time-span-container span"
              // ).textContent = `Last Week - ${weeklyPreviousTime}${
              //   weeklyPreviousTime === 1 ? "hr" : "hrs"
              // }`;

              // const divToInsert = document.createElement("div");
              // divToInsert.classList.add("inner-container");
              // divToInsert.append(templateContent);
              // toReplaceDiv.replaceWith(divToInsert);
            } else if (e.target.textContent === "Monthly") {
              replaceDivAfterChangingLink(
                templateContent,
                monthlyCurrentTime,
                monthlyPreviousTime,
                toReplaceDiv,
                "Month"
              );
              // templateContent.querySelector(
              //   ".time-span-container .time"
              // ).textContent = `${monthlyCurrentTime}${
              //   monthlyCurrentTime === 1 ? "hr" : "hrs"
              // }`;

              // templateContent.querySelector(
              //   ".time-span-container span"
              // ).textContent = `Last Month - ${monthlyPreviousTime}${
              //   monthlyPreviousTime === 1 ? "hr" : "hrs"
              // }`;

              // const divToInsert = document.createElement("div");
              // divToInsert.classList.add("inner-container");
              // divToInsert.append(templateContent);
              // toReplaceDiv.replaceWith(divToInsert);
            } else {
              replaceDivAfterChangingLink(
                templateContent,
                dailyCurrentTime,
                dailyPreviousTime,
                toReplaceDiv,
                "Day"
              );
              // templateContent.querySelector(
              //   ".time-span-container .time"
              // ).textContent = `${dailyCurrentTime}${
              //   dailyCurrentTime === 1 ? "hr" : "hrs"
              // }`;

              // templateContent.querySelector(
              //   ".time-span-container span"
              // ).textContent = `Last Day - ${dailyPreviousTime}${
              //   dailyPreviousTime === 1 ? "hr" : "hrs"
              // }`;

              // const divToInsert = document.createElement("div");
              // divToInsert.classList.add("inner-container");
              // divToInsert.append(templateContent);
              // toReplaceDiv.replaceWith(divToInsert);
            }
          }
        });
      });
    });
  });
};
dataObjects();
