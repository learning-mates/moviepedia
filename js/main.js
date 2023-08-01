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
function fetchData() {
  return fetch(options.url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
const fetchDataResult = fetchData();

// 공연/전시 포스터 보여주기
fetchDataResult.then((response) => {
  const list = response.SJWPerform.row;

  let date = new Date();
  let this_month = Number(date.getMonth()) + 1;

  for (let item of list) {
    // 이번 달 공연만 보여주기
    let month_check = Number(item.END_DATE.slice(4, 6)) === this_month;
    // 오늘부터 볼 수 있는 공연만 보여주기
    let day_check = Number(item.END_DATE.slice(6, 8)) >= date.getDate();
    // 한글 제목만 보여주기(같은 공연 영문명 제외)
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let korean_check = korean.test(item.TICKET_INFO);

    if (month_check && day_check && (!item.TICKET_INFO || korean_check)) {
      const container = document.querySelector(".container");
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
      container.prepend(card);
    }
  }
});

// 마지막 포스터 뒤에 다음 달로 넘어가는 버튼 추가
fetchDataResult.then((response) => {
  let date = new Date();
  let this_month = Number(date.getMonth()) + 1;
  const container = document.querySelector(".container");
  const btn_next_month = document.createElement("div");
  const span_month = document.createElement("span");
  const ico_arrow = document.createElement("i");
  ico_arrow.classList.add("fa-solid");
  ico_arrow.classList.add("fa-arrow-right");
  ico_arrow.setAttribute("style", "color: greenyellow;");
  span_month.innerHTML = `${this_month + 1}월`;
  btn_next_month.append(span_month, ico_arrow);
  btn_next_month.classList.add("btn_next_month");
  container.append(btn_next_month);
});

// 공연이 있는 날 찾기
const getEventDays = fetchDataResult.then((response) => {
  const list = response.SJWPerform.row;

  let has_event_days = new Set();

  for (item of list) {
    let start_date = Number(item.START_DATE.slice(6, 8));
    let end_date = Number(item.END_DATE.slice(6, 8));
    if (item.START_DATE !== item.END_DATE) {
      for (let i = start_date; i <= end_date; i++) {
        has_event_days.add(i);
      }
    } else {
      has_event_days.add(start_date);
    }
  }
  return has_event_days;
});

// 공연이 있는 날짜를 달력에 표시하기
getEventDays.then((response) => {
  getCalendar();
  const event_days = [...response];
  const rest_days = document.querySelectorAll(".calendar .rest span");

  event_days.forEach((e) => {
    for (let event_day of rest_days) {
      if (event_day.innerText === String(e)) {
        event_day.classList.add("available");
      }
    }
  });
});

// 이번 달 달력 가져오기
function getCalendar() {
  let date = new Date();
  let today = date.getDate();
  let this_month = Number(date.getMonth()) + 1;
  let this_year = date.getFullYear();
  let last_day = new Date(this_year, this_month, 0);
  last_day = last_day.getDate();

  const calendar = document.querySelector(".calendar");
  const cal_month = calendar.querySelector(".month");
  const cal_days = calendar.querySelector(".days");

  cal_month.innerHTML = `${this_month}월`;
  for (let i = 1; i <= last_day; i++) {
    const cal_days_day = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = i;
    cal_days_day.classList.add("day");
    cal_days_day.append(span);

    if (i < today) {
      cal_days_day.classList.add("prev");
    } else {
      cal_days_day.classList.add("rest");
    }
    cal_days.append(cal_days_day);
  }
}
