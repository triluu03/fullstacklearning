import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  	console.log('state now: ', state)
  	console.log('action', action)

	switch(action.type) {
		case 'VOTE':
			const id = action.data.id
			const objectToChange = state.find(n => n.id === id)
			const changedObject = {
				...objectToChange, votes: objectToChange.votes + 1
			}
			
			const newState = state.map(a => a.id !== id ? a : changedObject)
			newState.sort((a,b) => b.votes - a.votes)
			return newState
		case 'ADD':
			return state.concat(action.data)
		case 'SET':
			return action.data
		default:
			return state
	}
}


export const add = (object) => {
	return {
		type: 'ADD',
		data: object
	}
}

export const vote = (id) => {
	return {
		type: 'VOTE',
		data: { id } 
	}
}

export const setAnecdotes = (data) => {
	return {
		type: 'SET',
		data: data
	}
}

export const initialize = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(add(newAnecdote))
	}
}

export default reducer