const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>Major: {props.major}</p>
        <p>Credits: {props.numCredits}</p>
        <p>From Wisconsin: {props.fromWisconsin ? "Yes" : "No"}</p>
        <p>Number of interests: {props.interests.length}</p>
        <ul>
            {props.interests.map(interest => <li key={interest}>{interest}</li>)}
        </ul>

    </div>
}

export default Student;