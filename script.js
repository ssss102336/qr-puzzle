localStorage.clear();
const params = new URLSearchParams(window.location.search);

// QR에서 퍼즐 번호 받기
const newPiece = params.get("piece");

// 기존에 모은 퍼즐 가져오기
let collectedPieces = JSON.parse(localStorage.getItem("collectedPieces")) || [];

// 새 퍼즐 추가
if (newPiece && !collectedPieces.includes(newPiece)) {
    collectedPieces.push(newPiece);

    localStorage.setItem(
        "collectedPieces",
        JSON.stringify(collectedPieces)
    );
}

// 처음에는 모든 조각 숨기기
document.querySelectorAll(".piece").forEach(function(piece) {
    piece.style.display = "none";
});

// 모은 조각만 표시
collectedPieces.forEach(function(pieceNumber) {

    const piece = document.querySelector(".piece" + pieceNumber);

    if (piece) {
        piece.style.display = "block";
    }

});

// 퍼즐 완성 확인
if (collectedPieces.length === 6) {
    console.log("퍼즐 완성!");
}
