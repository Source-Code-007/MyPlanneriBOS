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

const myLocalDB = {storeUsers, createTeam}

export default myLocalDB