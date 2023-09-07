const storeUsers = (user)=>{
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    let newUsersCollection = []
    if(usersCollection){
        newUsersCollection = [...usersCollection, user]
    } else{
        newUsersCollection.push(user)
    }
    localStorage.setItem('usersCollection', JSON.stringify(newUsersCollection))
}

// create team
const createTeam = (team)=>{
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    if(teamCollection){
        if(teamCollection.some(existTeam=> existTeam.teamName !== team.teamName)){
            teamCollection = [...teamCollection, team]
            localStorage.setItem('teamCollection', JSON.stringify(teamCollection))
        }
    } else{
        localStorage.setItem('teamCollection', JSON.stringify([team]))
    }
}

// isUserInTeamFunc
const isUserInTeamFunc = (targetedUser, invitedTeamName) =>{
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user=> user?.email === targetedUser )
    const restUser = usersCollection?.filter(user=> user?.email !== targetedUser )
    const isExistTeam =  existUser?.isTeam?.find(eUser => eUser?.teamName === invitedTeamName)
    if(!isExistTeam){
        existUser.isTeam = [...existUser.isTeam, {teamName:invitedTeamName, status:'pending'}]
    }
    localStorage.setItem('usersCollection', JSON.stringify([...restUser, existUser]))
}

// team invitation reject or approve
const teamInvitaionStatusFunc = (targetedUser, status, teamName)=>{
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user=> user?.email === targetedUser )
    const restUser = usersCollection?.filter(user=> user?.email !== targetedUser )
    const existTeam =  existUser?.isTeam?.find(eUser => eUser?.teamName === teamName)
    const restTeam =  existUser?.isTeam?.filter(eUser => eUser?.teamName !== teamName)
    existTeam.status = status
    existUser.isTeam = [...restTeam, existTeam]
    localStorage.setItem('usersCollection', JSON.stringify([...restUser, existUser]))
}

// Get all team
const getTeam = ()=>{
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    return teamCollection
}

// Get all team
const getMyTeamInfo = (email)=>{
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user=> user?.email === email )
    return existUser?.isTeam
}

// Get all user
const getUser = ()=>{
    let usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    return usersCollection
}

const myLocalDB = {storeUsers, createTeam, getTeam, getUser, isUserInTeamFunc, getMyTeamInfo, teamInvitaionStatusFunc}

export default myLocalDB