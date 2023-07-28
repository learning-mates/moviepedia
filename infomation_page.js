const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    // Authorization:
    // 인증키  4366736a41676b7331303174666a4a71
  },
};
fetch(
  "http://openAPI.seoul.go.kr:8088/4366736a41676b7331303174666a4a71/json/SJWPerform/1/130",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response); //response에 값이 다 담겨있음! 이걸 콘솔로그로보여줌 ㅇ_ㅇ
    const body = document.querySelector("body"); //html body태그를 선택함
    let list = response.SJWPerform.row; //응답받은 값의 row 배열을 받음
    const ul = document.querySelector("ul"); // ul 태그 선택
    let date = new Date(); //오늘 날짜 뽑아주기
    let this_month = Number(date.getMonth()) + 1;
    // console.log(list[0]);
    // body.append(list[0].AGE); 잘 나오는지 확인!!
    for (item of list) {
      // //이 리스트에있는 각각의 아이템 값~
      // //이미지뽑기
      // const div = document.createElement("div");
      // ul.append(div);
      // const img = document.createElement("img");
      // const img_src = item.FILE_URL_MI;
      // img.setAttribute("src", `${img_src}`);
      // div.append(img);

      // //row 아이템을 받았으묜
      // const li = document.createElement("li"); // li를 선택해서 태그를 만들어주고
      // li.append(item.TITLE); // li태그에 타이틀 값을 넣어서 만들어줌
      // div.append(li); // ul에 li를 넣어서 만듬!!

      // //시작날짜뽑기
      // const day = document.createElement("li");
      // day.append(item.START_DATE);
      // div.append(day);

      ul.setAttribute("style", "display: flex");

      //7월만 뽑아보기 ^ㅂ^
      let month_check = Number(item.START_DATE.slice(4, 6)) === this_month;
      let day_check = Number(item.START_DATE.slice(6, 8)) >= date.getDate();
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
        ul.append(card);
        ul.setAttribute("style", "display: flex");
      }
    }
  })
  .catch((err) => console.error(err));
