const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    // Authorization:
    // 인증키  4366736a41676b7331303174666a4a71
  },
};
fetch(
  "http://openAPI.seoul.go.kr:8088/4366736a41676b7331303174666a4a71/json/SJWPerform/1/1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response); //response에 값이 다 담겨있음! 이걸 콘솔로그로보여줌 ㅇ_ㅇ
    const body = document.querySelector("body"); //html body태그를 선택함
    let list = response.SJWPerform.row; //응답받은 값의 row 배열을 받음
    const ul = document.querySelector("ul"); // ul 태그 선택
    const img = document.querySelector(".info img");
    const liTitle = document.querySelector(".title");
    const li = document.querySelector("li");
    let year = item.START_DATE.slice(0, 3);
    // nums.splice(5, 0, -5, -6, -7)
    console.log(list);
    // console.log(list[0]);
    // body.append(list[0].AGE);
    //잘 나오는지 확인!!
    for (item of list) {
      //이 리스트에있는 각각의 아이템 값~
      //이미지뽑기
      const img_src = item.FILE_URL_MI;
      img.setAttribute("src", `${img_src}`);

      const TITLE = item.TITLE;
      liTitle.innerText = `${TITLE}`;
      const date = document.createElement("li");
      date.innerText = `${item.START_DATE} ~ ${item.END_DATE}`;

      // const START_DATE = item.START_DATE;
      // const END_DATE = item.END_DATE;
      const place = item.PLACE_NAME;
      const time = item.PLAY_TIME;
      const AGE = item.AGE;
      const ticket = item.TICKET_INFO;
      ul.append(date);

      //row 아이템을 받았으묜
      // const li = document.createElement("li"); // li를 선택해서 태그를 만들어주고
      // li.append(item.TITLE); // li태그에 타이틀 값을 넣어서 만들어줌
      // div.append(li); // ul에 li를 넣어서 만듬!!

      // //시작날짜뽑기
      // const day = document.createElement("li");
      // day.append(item.START_DATE);
      // div.append(day);
    }
  })
  .catch((err) => console.error(err));
