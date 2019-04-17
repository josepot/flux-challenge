import {UNDEFINED_SITH} from '../modules/items'
import {createSelector} from 'reselect';


const getSiths = (state) => state.siths.infoTable
const getSlots = (state) => state.siths.indexTable
const getPlanet = (state) => state.planet.name

const sithIsUndefined = (indexTable, index) => indexTable[index]===UNDEFINED_SITH
const sithIsOnTable = (infoTable, indexTable, index) => infoTable[indexTable[index]]
const sithIsFetched = (infoTable, indexTable, index) => infoTable[indexTable[index]] && infoTable[indexTable[index]].info
const sithMaster = (infoTable, indexTable, index) => infoTable[indexTable[index]].info.master.id
const sithApprentice = (infoTable, indexTable, index) =>  infoTable[indexTable[index]].info.apprentice.id
const getSith = (infoTable, item, alt_id) =>  infoTable[item] && infoTable[item].info ? infoTable[item].info : {id: alt_id, name: "", homeworld:{name: ""}}

const hasInfo = (infoTable, indexTable, index, sith) => {
    //console.log(indexTable)
    return (
    [indexTable[index]===UNDEFINED_SITH,
    infoTable[indexTable[index]] && !infoTable[indexTable[index]].info, 
    infoTable[indexTable[index]] && infoTable[indexTable[index]].info && infoTable[indexTable[index]].info[sith].id
    ].some((i) =>  i === true)
)}

export const getSithsOnSlots = createSelector(
    getSiths,
    getSlots,
    (sithsinfo, slots) => (slots.map((item, i) => getSith(sithsinfo, item, i)))
)

export const getStateHasMoreMasters = createSelector(
    getSiths,
    getSlots,
    (sithsinfo, slots) => !sithIsUndefined(slots, 0) && sithIsOnTable(sithsinfo, slots, 0) && sithIsFetched(sithsinfo, slots, 0) ? sithMaster(sithsinfo, slots,0)!==null : true

)

export const getStateHasMoreApprentices = createSelector(
    getSiths,
    getSlots,
    (sithsinfo, slots) => !sithIsUndefined(slots, slots.length-1) && sithIsOnTable(sithsinfo, slots, slots.length-1) && sithIsFetched(sithsinfo, slots, slots.length-1) ? sithApprentice(sithsinfo, slots,slots.length-1)!==null : true
)

export const getStateNoSiths = createSelector(
    getSlots,
    (slots) => (slots.length - slots.filter((item, i) => sithIsUndefined(slots, i)).length) <= 2 
)

export const getStateIsVisitingDangerousPlanet = createSelector(
    getSiths,
    getSlots,
    getPlanet,
    (sithsinfo, slots, name) => {

        console.log(name);

        return slots
        .filter(item => sithsinfo[item])
        .filter(item => sithsinfo[item].info)
        .map(item => sithsinfo[item].info.homeworld.name)
        .filter((item) => item  === name).length !== 0
    
    }
        
    
)

export const getStateDangerousSithsIndex = createSelector(
    getSiths,
    getSlots,
    getPlanet,
    (sithsinfo, slots, name) => (
        slots
        .map(item => sithsinfo[item])
        .filter(item => item && item.info)
        .filter(item => item.info.homeworld.name === name)
        .map(item => item.id)
    
    )

)
//Returns true if there are still more masters to scroll
//export const getStateFirstMasterOnTop = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable, 0, 'master')

//Returns true if there are still more apprentices to scroll
//export const getStateLastApprenticeOnBottom = ({indexTable, infoTable}) =>  hasInfo(indexTable, infoTable, indexTable.length - 1, 'apprentice') 

//Returns true if there are no siths fetched on the list
//export const getStateNoSiths =  ({indexTable}) =>  indexTable.filter(item => item!==UNDEFINED_SITH).filter(item => item!==null).length <= 2 

//Returns true if obi-wan is in a dangerous planet
/*export const getStateIsVisitingDangerousPlanet =  ({indexTable, infoTable}, {name}) => (
    indexTable
        .filter(item => infoTable[item])
        .filter(item => infoTable[item].info)
        .map(item => infoTable[item].info.homeworld.name)
        .filter((item) => item  === name).length !== 0)*/

//Returns the sith's list on the current planet
/*export const getStateDangerousSithsIndex =  ({indexTable, infoTable}, {name}) => (
    indexTable
        .map(item => infoTable[item])
        .filter(item => item && item.info)
        .filter(item => item.info.homeworld.name === name)
        .map(item => item.id)
)*/
    
//Maps the actual sith information on every slot
//export const getStateSithList = ({indexTable, infoTable}) => (indexTable.map(item => infoTable[item]).map((item, i) => item && item.info?item.info:{id: i, name: "", homeworld:{name: ""}}))


