import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {
  	console.log('state now: ', state)
  	console.log('action', action)

	switch(action.type) {
		case 'VOTE':
			const id = action.data.id
			const newState = state.map(a => a.id !== id ? a : action.data)
			newState.sort((a,b) => b.votes - a.votes)
			return newState
		case 'ADD':
			return state.concat(action.data)
		case 'SET':
			return action.data.sort((a,b) => b.votes - a.votes)
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

export const modify = (object) => {
	return {
		type: 'VOTE',
		data: object 
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


export const vote = (id) => {
	return async dispatch => {
		const response = await anecdoteService.voteAnecdote(id)
		dispatch(modify(response))
	}
}



export default reducer