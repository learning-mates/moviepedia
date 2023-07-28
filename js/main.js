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
    let date = new Date();
    let this_month = Number(date.getMonth()) + 1;

    for (item of list.reverse()) {
      // 7월
      let month_check = Number(item.END_DATE.slice(4, 6)) === this_month;
      let day_check = Number(item.END_DATE.slice(6, 8)) >= date.getDate();
      if (month_check && day_check) {
        const card = document.createElement("div");
        const item_img = document.createElement("img");
        const desc_list = document.createElement("ul");
        const item_tit = document.createElement("li");
        const item_date = document.createElement("li");
        item_date.innerHTML = `${item.START_DATE} - ${item.END_DATE}`;
        item_tit.innerText = item.TITLE;
        item_img.src = item.FILE_URL_MI;
        item_img.setAttribute("width", "300px");
        desc_list.append(item_tit, item_date);
        card.append(item_img, desc_list);
        card.classList.add("card");
        container.append(card);
      }
    }
  })
  .catch((err) => console.error(err));
