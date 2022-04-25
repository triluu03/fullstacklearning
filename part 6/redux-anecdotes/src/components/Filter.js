import { useDispatch } from "react-redux"


const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        const action = {
            type: 'filtering/filter',
            payload: event.target.value
        }
        dispatch(action)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter