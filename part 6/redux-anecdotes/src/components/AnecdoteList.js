import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)

	const handleVote = (anecdote) => {
		dispatch(vote(anecdote.id))
		const action = {
			type: 'notification/notify',
			payload: `you voted '${anecdote.content}'`
		}
		dispatch(action)
		setTimeout(() => {
			dispatch({ type: 'notification/notify', payload: null })
		}, 5000)
	}

	if (filter === '') {
		return (
			<div>
				{anecdotes.map(anecdote =>  
			  		<div key={anecdote.id}>
						<div>
					  		{anecdote.content}
						</div>
						<div>
					  		has {anecdote.votes}
					  		<button onClick={() => handleVote(anecdote)}>vote</button>
						</div>
			  		</div>
				)}
	  		</div>
		)
	}

    return (
        <div>
      		{anecdotes.map(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? 
        		<div key={anecdote.id}>
          			<div>
            			{anecdote.content}
          			</div>
          			<div>
            			has {anecdote.votes}
            			<button onClick={() => handleVote(anecdote)}>vote</button>
          			</div>
        		</div>
      		: null )}
        </div>
    )
}


export default AnecdoteList