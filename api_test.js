const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    // Authorization:
  },
};
fetch(
  "http://api.kcisa.kr/openapi/CNV_060/request?serviceKey=e929fb1e-fbe7-4c38-a1d1-261d8e8b23e9&numOfRows=30&pageNo=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

//e929fb1e-fbe7-4c38-a1d1-261d8e8b23e9
