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
    // console.log(list[0]);
    // body.append(list[0].AGE);
    for (item of list) {
      //이 리스트에있는 각각의 아이템 값~
      //이미지뽑기
      const div = document.createElement("div");
      ul.append(div);
      const img = document.createElement("img");
      const img_src = item.FILE_URL_MI;
      img.setAttribute("src", `${img_src}`);
      div.append(img);

      //row 아이템을 받았으묜
      const li = document.createElement("li"); // li를 선택해서 태그를 만들어주고
      li.append(item.TITLE); // li태그에 타이틀 값을 넣어서 만들어줌
      div.append(li); // ul에 li를 넣어서 만듬!!

      //시작날짜뽑기
      const day = document.createElement("li");
      day.append(item.START_DATE);
      div.append(day);

      ul.setAttribute("style", "display: flex");

      // const arr = createElement("new_Array");
    
      // var1.append[div];
      // console.log(var1)
    

    }
  })
  .catch((err) => console.error(err));
