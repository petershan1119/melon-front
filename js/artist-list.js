// 1. 아래 내용을 JS의 함수로 구현. 이름은 getArtists(pageNum)
//  function <함수명> (매개변수) { 함수 동작 정의 };
// 2. 요청할 페이지 번호를 가지고 있을 변수를 최상단에 선언, 1로 초기화 이름은 pageNum을 사용
// 3. getArtists함수에 pageNum을 인수로 넘겨 호춝

var pageNum = 1
getArtists(pageNum);

$('#btnMoreArtists').click(function () {
  clickMoreArtistsButton();
});

function clickMoreArtistsButton () {
  pageNum += 1;
  getArtists(pageNum);
}

function getArtists (pageNum) {
  axios({
    url: 'http://localhost:8000/apis/artist/',
    method: 'get',
    params: {
      page: pageNum
    }
  })
  .then(function (response) {
    var artistListElement = $('.artist-list')
    var artists = response.data.results;
    for (var i = 0; i < artists.length; i++) {
      var currentArtist = artists[i];
      console.log(currentArtist);

      var curArtistElement = $('#artist-item-template').clone();
      curArtistElement.find('.artist-name').text(currentArtist.name);
      curArtistElement.find('.artist-img-profile').attr('src', currentArtist.img_profile);
      artistListElement.append(curArtistElement);
    }
    // response.data.next가 null인 경우
    // #btnMoreArtists의 display속성을 none으로 지정

    if (response.data.next == null) {
      document.getElementById('btnMoreArtists').style.display = "none";
    }
  })
  .catch(function (error) {
    console.log(error);
  });
};
