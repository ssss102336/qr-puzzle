/* =========================
   QR에서 퍼즐 번호 받기
========================= */

const params = new URLSearchParams(window.location.search);

const newPiece = params.get("piece");

/* =========================
   현재 세션에서 모은 퍼즐
========================= */

let collectedPieces =
    JSON.parse(
        sessionStorage.getItem("collectedPieces")
    ) || [];


/* =========================
   퍼즐 이미지
========================= */

const pieceImages = {

    "1": "images/geo.1.png",

    "2": "images/King.2.png",

    "3": "images/lamp.3.png",

    "4": "images/drunk.4.png",

    "5": "images/business.5.png",

    "6": "images/vain.6.png"

};


/* =========================
   새 퍼즐 추가
========================= */

if (
    newPiece &&
    pieceImages[newPiece] &&
    !collectedPieces.includes(newPiece)
) {

    collectedPieces.push(newPiece);

    sessionStorage.setItem(
        "collectedPieces",
        JSON.stringify(collectedPieces)
    );

}


/* =========================
   현재 퍼즐 이미지
========================= */

const pieceImage =
    document.getElementById("pieceImage");


if (newPiece && pieceImages[newPiece]) {

    pieceImage.src =
        pieceImages[newPiece];

} else {

    pieceImage.style.display = "none";

}


/* =========================
   퍼즐 개수 표시
========================= */

const collectionCount =
    document.getElementById("collectionCount");


collectionCount.textContent =
    `퍼즐 조각 ${collectedPieces.length} / 6`;


/* =========================
   6개 완성 확인
========================= */

const completeButton =
    document.getElementById("completeButton");

const backButton =
    document.getElementById("backButton");


if (collectedPieces.length === 6) {

    completeButton.style.display = "inline-block";

    /*
       6개를 모두 모은 순간부터
       돌아가기 버튼 제거
    */

    backButton.style.display = "none";

}


/* =========================
   돌아가기
========================= */

function goBack() {

    /*
       행성 페이지로 돌아감.

       카메라 기능을 다시 사용할 수 있도록
       planet 페이지로 이동.
    */

    window.location.href =
        "https://ssss102336.github.io/planet/";

}


/* =========================
   완성 이미지 보기
========================= */

function showNewImage() {

    /*
       두 이미지 중 하나를 랜덤으로 선택
    */

    const images = [

        "images/new.img1.png",

        "images/new.img2.png"

    ];


    const randomIndex =
        Math.floor(
            Math.random() * images.length
        );


    const selectedImage =
        images[randomIndex];


    /*
       이미지 넣기
    */

    const newImage =
        document.getElementById("newImage");

    newImage.src =
        selectedImage;


    /*
       퍼즐 페이지 숨기기
    */

    document.getElementById("piecePage")
        .style.display = "none";


    /*
       완성 페이지 표시
    */

    document.getElementById("completePage")
        .style.display = "block";

}
