import { useDispatch, useSelector } from "react-redux"

import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
	const filter = useSelector(state => state.filter)

	const handleVote = (anecdote) => {
		dispatch(vote(anecdote.id))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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