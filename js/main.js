let date = new Date();
let today = date.getDate();
let this_month = Number(date.getMonth()) + 1;

let getCalendar = function () {
  let this_year = date.getFullYear();
  let last_day = new Date(this_year, this_month, 0);
  last_day = last_day.getDate();

  const calendar = document.querySelector(".calendar");
  const cal_month = document.querySelector(".calendar .month");
  const cal_days = document.querySelector(".calendar .days");

  cal_month.innerHTML = `${this_month}월`;
  for (let i = 1; i <= last_day; i++) {
    const cal_days_day = document.createElement("li");
    cal_days_day.classList.add("day");
    cal_days_day.innerHTML = i;

    if (i < today) {
      cal_days_day.classList.add("prev");
    } else {
      cal_days_day.classList.add("available");
    }
    cal_days.append(cal_days_day);
  }
};
getCalendar();

// 세종문화회관 공연전시 데이터 API 연결
const options = {
  method: "GET",
  url: "http://openAPI.seoul.go.kr:8088/546267675579656f34364f7a526d42/json/SJWPerform/1/140",
  headers: {
    accept: "application/json",
    // Authorization:
    // 인증키  546267675579656f34364f7a526d42
  },
};
fetch(options.url, options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    const container = document.querySelector(".container");
    const list = response.SJWPerform.row;

    for (item of list.reverse()) {
      // 이번 달 공연만 보여주기
      let month_check = Number(item.END_DATE.slice(4, 6)) === this_month;
      // 오늘부터 볼 수 있는 공연만 보여주기
      let day_check = Number(item.END_DATE.slice(6, 8)) >= date.getDate();
      // 한글 제목만 보여주기(같은 공연 영문명 제외)
      const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      let korean_check = korean.test(item.TICKET_INFO);

      if (month_check && day_check && (!item.TICKET_INFO || korean_check)) {
        const card = document.createElement("div");
        const item_img = document.createElement("img");
        const desc_list = document.createElement("ul");
        const item_tit = document.createElement("li");
        const item_date = document.createElement("li");
        const item_info = document.createElement("li");
        item_date.innerHTML = `${item.START_DATE} - ${item.END_DATE}`;
        item_tit.innerText = item.TITLE;
        item_info.innerText = item.TICKET_INFO;
        item_img.src = item.FILE_URL_MI;
        desc_list.append(item_tit, item_date, item_info);
        // card.append(item_img, desc_list);
        card.append(item_img);
        card.classList.add("card");
        container.append(card);
      }
    }
  })
  .catch((err) => console.error(err));
