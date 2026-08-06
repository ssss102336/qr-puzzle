const params = new URLSearchParams(window.location.search);

// QR에서 가져온 퍼즐 번호
const newPiece = params.get("piece");

// 기존에 모은 퍼즐 저장
let collectedPieces = JSON.parse(localStorage.getItem("collectedPieces")) || [];

// 새 퍼즐 추가
if (newPiece && !collectedPieces.includes(newPiece)) {
    collectedPieces.push(newPiece);
    localStorage.setItem(
        "collectedPieces",
        JSON.stringify(collectedPieces)
    );
}

// 모은 퍼즐 보이기
collectedPieces.forEach(function(pieceNumber) {

    const piece =...