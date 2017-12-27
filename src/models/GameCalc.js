export const handCardPlay = (card, members, gameState)=>{
  var newProdPoint = calcProductivityPoint(members);
  var newAgilityPoint = calcAgilityPoint(members);

  return {
    turn: gameState.turn,
    productivityPoint: parseInt(newProdPoint),
    agilityPoint: parseInt(newAgilityPoint),
  }
}

const calcProductivityPoint = (members)=>{
  var newProdPt = 0;
  var headCount = members.length;

  for (var card in members) {
    switch(members[card].prodPointType) {
      case 'static':
        newProdPt += members[card].prodPoint;
        break;
      case 'totalHeadCount':
        newProdPt += headCount * members[card].prodPointMultiplier;
        break;
      default:
        newProdPt;
    }
  }

  return newProdPt;
}

const calcAgilityPoint = (members)=>{
  var newAgilityPt = 0;
  var headCount = members.length;

  for (var card in members) {
    switch(members[card].agilityPointType) {
      case 'static':
        newAgilityPt += members[card].agilityPoint;
        break;
      case 'totalHeadCount':
        newAgilityPt += headCount * members[card].agilityPointMultiplier;
        break;
      default:
        newAgilityPt;
    }
  }

  return newAgilityPt;
}
