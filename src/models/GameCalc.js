export const handCardPlay = (card, members, gameState)=>{
  var newProdPoint = calcProductivityPoint(members);
  var newAgilityPoint = calcAgilityPoint(members);
  var newProductivityLevel = calcProductivityLevel(newProdPoint, gameState.productivityLevels);
  var newAgilityLevel = calcAgilityLevel(newAgilityPoint, gameState.agilityLevels);

  const newGameState = gameState;
  newGameState.productivityPoint = parseInt(newProdPoint);
  newGameState.agilityPoint = parseInt(newAgilityPoint);
  newGameState.productivityLevel = parseInt(newProductivityLevel);
  newGameState.agilityLevel = parseInt(newAgilityLevel);

  return newGameState;
}

const calcProductivityLevel = (prodPoint, productivityLevels)=>{
  if (prodPoint < productivityLevels[0]) {
    return 1;
  } else if (prodPoint >= productivityLevels[0] && prodPoint < productivityLevels[1]) {
    return 2;
  } else if (prodPoint >= productivityLevels[1] && prodPoint < productivityLevels[2]) {
    return 3;
  } else if (prodPoint >= productivityLevels[2] && prodPoint < productivityLevels[3]) {
    return 4;
  } else {
    return 5;
  }
}

const calcAgilityLevel = (agilityPoint, agilityLevels)=>{
  if (agilityPoint < agilityLevels[0]) {
    return 1;
  } else if (agilityPoint >= agilityLevels[0] && agilityPoint < agilityLevels[1]) {
    return 2;
  } else if (agilityPoint >= agilityLevels[1] && agilityPoint < agilityLevels[2]) {
    return 3;
  } else if (agilityPoint >= agilityLevels[2] && agilityPoint < agilityLevels[3]) {
    return 4;
  } else {
    return 5;
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
