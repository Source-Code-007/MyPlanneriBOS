// store user collection
const storeUsers = (user) => {
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    let newUsersCollection = []
    if (usersCollection) {
        newUsersCollection = [...usersCollection, user]
    } else {
        newUsersCollection.push(user)
    }
    localStorage.setItem('usersCollection', JSON.stringify(newUsersCollection))
}

// store tasks collection
const storeTasks = (task) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    let newTasksCollection = []
    if (tasksCollection) {
        newTasksCollection = [...tasksCollection, task]
    } else {
        newTasksCollection.push(task)
    }
    localStorage.setItem('tasksCollection', JSON.stringify(newTasksCollection))
}

// task status update
const setTaskStatus = (taskId, status) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const existTask = tasksCollection.find(tc => tc._id === taskId)
    const restTasks = tasksCollection.filter(tc => tc._id !== taskId)
    existTask.status = status
    localStorage.setItem('tasksCollection', JSON.stringify([...restTasks, existTask]))
}
// delete task
const deleteTask = (taskId) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const restTasks = tasksCollection.filter(tc => tc._id !== taskId)
    localStorage.setItem('tasksCollection', JSON.stringify(restTasks))
}

// create team
const createTeam = (team) => {
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    if (teamCollection) {
        if (teamCollection.some(existTeam => existTeam.teamName !== team.teamName)) {
            teamCollection = [...teamCollection, team]
            localStorage.setItem('teamCollection', JSON.stringify(teamCollection))
        }
    } else {
        localStorage.setItem('teamCollection', JSON.stringify([team]))
    }
}

// isUserInTeamFunc
const isUserInTeamFunc = (targetedUser, invitedTeamName) => {
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user => user?.email === targetedUser)
    const restUser = usersCollection?.filter(user => user?.email !== targetedUser)
    const isExistTeam = existUser?.isTeam?.find(eUser => eUser?.teamName === invitedTeamName)
    if (!isExistTeam) {
        existUser.isTeam = [...existUser.isTeam, { teamName: invitedTeamName, status: 'pending' }]
    }
    localStorage.setItem('usersCollection', JSON.stringify([...restUser, existUser]))
}

// team invitation reject or approve
const teamInvitaionStatusFunc = (targetedUser, status, teamName) => {
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user => user?.email === targetedUser)
    const restUser = usersCollection?.filter(user => user?.email !== targetedUser)
    const existTeam = existUser?.isTeam?.find(eUser => eUser?.teamName === teamName)
    const restTeam = existUser?.isTeam?.filter(eUser => eUser?.teamName !== teamName)
    existTeam.status = status
    existUser.isTeam = [...restTeam, existTeam]

    // If status is approve then it's store in teamCollection member array
    if (status === 'approve') {
        let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
        let existTeam = teamCollection.find(tc => tc?.teamName === teamName)
        let restTeam = teamCollection.filter(tc => tc?.teamName !== teamName)
        let existMember = existTeam?.member.find(em => em === targetedUser)
        if (!existMember) {
            existTeam.member.push(targetedUser)
        }
        localStorage.setItem('teamCollection', JSON.stringify([...restTeam, existTeam]))
    }
    localStorage.setItem('usersCollection', JSON.stringify([...restUser, existUser]))
}

// Get all team
const getTeam = () => {
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    return teamCollection
}

// Get all team
const getMyTeamInfo = (email) => {
    const usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(user => user?.email === email)
    return existUser?.isTeam
}

// Get all user
const getUsers = () => {
    let usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    return usersCollection
}

// getMyProfile
const getMyProfile = (email) => {
    let usersCollection = JSON.parse(localStorage.getItem('usersCollection'))
    const existUser = usersCollection?.find(uc => uc?.email === email)
    return existUser
}

// getMyTask
const getMyTasks = (email) => {
    const tasksCollection = JSON.parse(localStorage.getItem('tasksCollection'))
    const myTasks = tasksCollection?.filter(tc => tc?.user === email)
    return myTasks
}

// Get team collection
const getMyTeams = (targetedUser) => {
    let teamCollection = JSON.parse(localStorage.getItem('teamCollection'))
    const myTeams = teamCollection?.filter(tc => tc.member.find(tcm => tcm === targetedUser))
    return myTeams
}

const myLocalDB = { storeUsers, storeTasks, setTaskStatus, deleteTask, createTeam, getTeam, getUsers, getMyTeams, isUserInTeamFunc, getMyTeamInfo, teamInvitaionStatusFunc, getMyProfile, getMyTasks }

export default myLocalDB