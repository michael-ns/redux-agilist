export const handCardPlay = (members, practices, gameState)=>{
  var newProdPoint = calcProductivityPoint(members, practices, gameState);
  var newAgilityPoint = calcAgilityPoint(members, practices, gameState);
  var newProductivityLevel = calcProductivityLevel(newProdPoint, gameState.productivityLevels);
  var newAgilityLevel = calcAgilityLevel(newAgilityPoint, gameState.agilityLevels);

  const newGameState = gameState;
  newGameState.productivityPoint = parseInt(newProdPoint);
  newGameState.agilityPoint = parseInt(newAgilityPoint);
  newGameState.productivityLevel = parseInt(newProductivityLevel);
  newGameState.agilityLevel = parseInt(newAgilityLevel);

  //reduce turn action
  newGameState.actionLeft -= 1;

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

const calcProductivityPoint = (members, practices, gameState)=>{
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

  for (var card in practices) {
    switch(practices[card].prodPointType) {
      case 'static':
        newProdPt += practices[card].prodPoint;
        break;
      case 'totalHeadCount':
        newProdPt += headCount * practices[card].prodPointMultiplier;
        break;
      default:
        newProdPt;
    }
  }

  var buffs = gameState.buffs;
  for (var buff in buffs) {
    switch(buffs[buff].buffType) {
      case 'productivityPercentage':
        newProdPt = (1 + buffs[buff].buffValue) * newProdPt;
        break;
      case 'productivityStatic':
        newProdPt += buffs[buff].buffValue;
        break;
      default:
        newProdPt;
    }
  }

  return newProdPt;
}

const calcAgilityPoint = (members, practices, gameState)=>{
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

  for (var card in practices) {
    switch(practices[card].agilityPointType) {
      case 'static':
        newAgilityPt += practices[card].agilityPoint;
        break;
      case 'totalHeadCount':
        newAgilityPt += headCount * practices[card].agilityPointMultiplier;
        break;
      default:
        newAgilityPt;
    }
  }

  var buffs = gameState.buffs;
  for (var buff in buffs) {
    switch(buffs[buff].buffType) {
      case 'agilityPercentage':
        newAgilityPt = (1 + buffs[buff].buffValue) * newAgilityPt;
        break;
      case 'agilityStatic':
        newAgilityPt += buffs[buff].buffValue;
        break;
      default:
        newAgilityPt;
    }
  }

  return newAgilityPt;
}
