export const cardPlayRule = (card, gameState, cardCollection, destination)=>{
  var result = "success";

  result = cardZoneTypeMatch(card, gameState, cardCollection, destination);
  if (result != "success") {
    return result;
  }

  result = memberMaxCount(card, gameState, cardCollection, destination);
  if (result != "success") {
    return result;
  }

  return result;
}

const cardZoneTypeMatch = (card, gameState, cardCollection, destination)=>{
  var result = "success";
  var cardType = card.cardType;
  var targetZone = cardCollection[destination.droppableId].zoneName;

  if (cardType != targetZone.toLowerCase()) {
    result = "Cannot place " + cardType + " card in " + targetZone + " zone";
  }

  return result;
}

const memberMaxCount = (card, gameState, cardCollection, destination)=>{
  var result = "success";

  if (destination.droppableId == "memberZone") {
    var memberCount = cardCollection['memberZone'].cards.length;
    var memberMaxCount = gameState.productivityLevel;

    console.log("====" + memberCount + " - " + memberMaxCount);

    if (memberCount >= memberMaxCount) {
      result = "You cannot add another member before reaching the next Productivity Level";
    }
  }

  return result;
}
