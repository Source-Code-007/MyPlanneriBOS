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
    const existUser = usersCollection.some(user=> user.email === targetedUser.email )
    const restUser = usersCollection.filter(user=> user.email === targetedUser.email )
    existUser.isTeam = [invitedTeamName, 'pending']
    localStorage.setItem('usersCollection', JSON.stringify([...restUser, existUser]))
}

// Get all team
const getTeam = ()=>{
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    console.log(teamCollection);
    console.log('teamCollection');

    return teamCollection
}

// Get all user
const getUser = ()=>{
    let usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    return usersCollection
}

const myLocalDB = {storeUsers, createTeam, getTeam, getUser, isUserInTeamFunc}

export default myLocalDB