/* =========================
   QR에서 퍼즐 번호 가져오기
========================= */

const params =
    new URLSearchParams(window.location.search);

const newPiece =
    params.get("piece");


/* =========================
   기존에 모은 퍼즐 가져오기
========================= */

let collectedPieces =
    JSON.parse(
        sessionStorage.getItem("collectedPieces")
    ) || [];


/* =========================
   새 퍼즐 추가
========================= */

if (
    newPiece &&
    ["1", "2", "3", "4", "5", "6"].includes(newPiece)
) {

    if (!collectedPieces.includes(newPiece)) {

        collectedPieces.push(newPiece);

        sessionStorage.setItem(
            "collectedPieces",
            JSON.stringify(collectedPieces)
        );

    }

}


/* =========================
   퍼즐 조각 전부 숨기기
========================= */

const pieces =
    document.querySelectorAll(".piece");


pieces.forEach(function(piece) {

    piece.style.display = "none";

});


/* =========================
   모은 조각만 표시
========================= */

collectedPieces.forEach(function(pieceNumber) {

    const piece =
        document.querySelector(
            ".piece" + pieceNumber
        );

    if (piece) {

        piece.style.display = "block";

    }

});


/* =========================
   모은 개수 표시
========================= */

const collectionCount =
    document.getElementById(
        "collectionCount"
    );


collectionCount.textContent =
    `퍼즐 ${collectedPieces.length} / 6`;


/* =========================
   6개 완성 여부
========================= */

const newImageButton =
    document.getElementById(
        "newImageButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


if (collectedPieces.length === 6) {

    /*
       6개가 모두 모이면
       새로운 이미지 버튼 표시
    */

    newImageButton.style.display =
        "inline-block";


    /*
       돌아가기 버튼 제거
    */

    backButton.style.display =
        "none";

}


/* =========================
   돌아가기
========================= */

function goBack() {

    /*
       QR을 찍기 전의 행성 페이지로 돌아감.

       history.back()을 사용해서
       원래 행성 페이지의 흐름으로 복귀.
    */

    if (window.history.length > 1) {

        window.history.back();

    } else {

        window.location.href =
            "https://ssss102336.github.io/planet/";

    }

}


/* =========================
   새로운 이미지 보기
========================= */

function showNewImage() {

    const images = [

        "images/new.img1.png",

        "images/new.img2.png"

    ];


    /*
       0 또는 1을 랜덤으로 선택
    */

    const randomIndex =
        Math.floor(
            Math.random() * images.length
        );


    const selectedImage =
        images[randomIndex];


    const newImage =
        document.getElementById(
            "newImage"
        );


    /*
       이미지 표시
    */

    newImage.src =
        selectedImage;


    /*
       이미지 저장 버튼도
       같은 이미지로 연결
    */

    const saveButton =
        document.getElementById(
            "saveButton"
        );


    saveButton.href =
        selectedImage;


    /*
       퍼즐 페이지 숨기기
    */

    document.getElementById(
        "puzzlePage"
    ).style.display = "none";


    /*
       완성 이미지 페이지 표시
    */

    document.getElementById(
        "imagePage"
    ).style.display = "block";

}


/* =========================
   마지막 4층 안내
========================= */

function showFinalGuide() {

    /*
       완성 이미지 페이지 숨기기
    */

    document.getElementById(
        "imagePage"
    ).style.display = "none";


    /*
       마지막 안내 페이지 표시
    */

    document.getElementById(
        "finalPage"
    ).style.display = "block";

}
