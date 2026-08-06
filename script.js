const params = new URLSearchParams(window.location.search);

// QR에서 퍼즐 번호 받기
const newPiece = params.get("piece");

// 저장된 퍼즐 가져오기
let collectedPieces = JSON.parse(localStorage.getItem("collectedPieces")) || [];

// 새 퍼즐 추가
if (newPiece && !collectedPieces.includes(newPiece)) {
    collectedPieces.push(newPiece);

    localStorage.setItem(
        "collectedPieces",
        JSON.stringify(collectedPieces)
    );
}

// 저장된 퍼즐만 보이기
document.querySelectorAll(".piece").forEach(function(piece) {
   ...
