export default function DisplayItemCard(props){

    const styleDescription = {
        fontSize: 17,
    }

    return(
        <div>
            <h2 id = "name">{props.name}</h2>
            <p style={styleDescription}>{props.description}</p>
            <i><p>${props.price}</p></i>
            <br></br>
        </div>
    )
}