const hasInfo = (indexTable, infoTable) => indexTable[0]!==-1 && infoTable[indexTable[0]] && infoTable[indexTable[0]].info
export const getStateFirstMasterOnTop = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable) && infoTable[indexTable[0]].info.master.id
export const getStateLastApprenticeOnBottom = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable) && infoTable[indexTable[0]].info.apprentice.id
export const getStateIsVisitingDangerousPlanet =  ({indexTable, infoTable}, {name}) => indexTable.map(item => infoTable[item] && infoTable[item].info? infoTable[item].info.homeworld.name: null).filter((item) => item  === name).length !== 0
export const getStateNoSiths =  ({indexTable}) =>  indexTable.filter(item => item!==-1 && item!==null).length === 0 