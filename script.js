/* =====================================================
   어린왕자 QR 퍼즐 시스템
===================================================== */


/* =========================
   기본 설정
========================= */

const TOTAL_PIECES = 6;


/*
    완성 이미지 2개

    실제 파일은
    images/new.img1.png
    images/new.img2.png
*/

const FINAL_IMAGES = [
    "images/new.img1.png",
    "images/new.img2.png"
];


/* =========================
   현재 QR의 퍼즐 번호
========================= */

const params =
    new URLSearchParams(window.location.search);

const newPiece =
    params.get("piece");


/* =========================
   저장된 퍼즐 가져오기
========================= */

let collectedPieces =
    JSON.parse(
        sessionStorage.getItem("collectedPieces")
    ) || [];


/* =========================
   QR 퍼즐 번호 추가
========================= */

if (
    newPiece &&
    ["1", "2", "3", "4", "5", "6"].includes(newPiece) &&
    !collectedPieces.includes(newPiece)
) {

    collectedPieces.push(newPiece);

    sessionStorage.setItem(
        "collectedPieces",
        JSON.stringify(collectedPieces)
    );

}


/* =========================
   DOM
========================= */

const collectionScreen =
    document.getElementById("collectionScreen");

const finalScreen =
    document.getElementById("finalScreen");

const lastGuide =
    document.getElementById("lastGuide");

const pieceNumber =
    document.getElementById("pieceNumber");

const mainTitle =
    document.getElementById("mainTitle");

const description =
    document.getElementById("description");

const pieceDots =
    document.getElementById("pieceDots");

const statusCount =
    document.getElementById("statusCount");

const backButton =
    document.getElementById("backButton");

const completeButton =
    document.getElementById("completeButton");

const finalImage =
    document.getElementById("finalImage");


/* =========================
   수집 현황 점 생성
========================= */

function createDots() {

    pieceDots.innerHTML = "";

    for (
        let i = 1;
        i <= TOTAL_PIECES;
        i++
    ) {

        const dot =
            document.createElement("div");

        dot.classList.add("piece-dot");

        if (
            collectedPieces.includes(
                String(i)
            )
        ) {

            dot.classList.add("collected");

        }

        pieceDots.appendChild(dot);

    }

}


/* =========================
   수집 상태 업데이트
========================= */

function updateStatus() {

    createDots();

    statusCount.textContent =
        `${collectedPieces.length} / ${TOTAL_PIECES}`;


    /* =====================
       이번에 찍은 QR
    ===================== */

    if (newPiece) {

        pieceNumber.textContent =
            `PUZZLE · ${newPiece.padStart(2, "0")}`;

    }
    else {

        pieceNumber.textContent =
            "JOURNEY";

    }


    /* =====================
       6개 완성
    ===================== */

    if (
        collectedPieces.length >= TOTAL_PIECES
    ) {

        mainTitle.innerHTML =
            "모든 퍼즐 조각을<br>찾았습니다.";

        description.innerHTML =
            "여섯 개의 조각이 모두 모였습니다.<br>" +
            "이제 하나의 새로운 이미지를 확인해보세요.";


        /* 돌아가기 숨김 */

        backButton.style.display =
            "none";


        /* 완성 버튼 표시 */

        completeButton.classList.add("show");

    }

    else {

        mainTitle.textContent =
            "퍼즐 조각을 찾았습니다.";

        description.innerHTML =
            "어린왕자의 여정에 새로운 조각이<br>" +
            "하나 더 모였습니다.";


        backButton.style.display =
            "inline-block";

        completeButton.classList.remove(
            "show"
        );

    }

}


/* =========================
   행성으로 돌아가기
========================= */

function goBackToPlanet() {

    /*
        planet 페이지로 이동

        돌아갔을 때
        카메라를 다시 열도록
        URL에 autoCamera를 붙임
    */

    window.location.href =
        "https://ssss102336.github.io/planet/?autoCamera=true";

}


/* =========================
   완성 이미지 보기
========================= */

function showFinalImage() {

    /*
        2개의 이미지 중 랜덤 선택
    */

    const randomIndex =
        Math.floor(
            Math.random() *
            FINAL_IMAGES.length
        );

    const selectedImage =
        FINAL_IMAGES[randomIndex];


    finalImage.src =
        selectedImage;


    /* 수집 화면 숨김 */

    collectionScreen.style.display =
        "none";


    /* 완성 화면 표시 */

    finalScreen.classList.add("show");

}


/* =========================
   이미지 저장
========================= */

async function saveImage() {

    const imageUrl =
        finalImage.src;


    try {

        /*
            이미지 파일 가져오기
        */

        const response =
            await fetch(imageUrl);

        const blob =
            await response.blob();


        /*
            임시 다운로드 주소
        */

        const blobUrl =
            URL.createObjectURL(blob);


        /*
            다운로드 링크
        */

        const link =
            document.createElement("a");

        link.href =
            blobUrl;

        link.download =
            "little-prince-journey.png";


        document.body.appendChild(link);

        link.click();

        link.remove();


        URL.revokeObjectURL(blobUrl);

    }

    catch (error) {

        /*
            모바일 Safari 등에서
            다운로드가 막히는 경우

            이미지를 새 탭으로 열어
            사용자가 저장할 수 있도록 함
        */

        window.open(
            imageUrl,
            "_blank"
        );

    }

}


/* =========================
   마지막 여행 안내
========================= */

function showLastGuide() {

    finalScreen.classList.remove(
        "show"
    );

    lastGuide.classList.add(
        "show"
    );

}


/* =========================
   시작
========================= */

updateStatus();
