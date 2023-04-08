const Languages = ({languages}) => {

    const allLanguages = [];

    for (const key in languages) {
        allLanguages.push(languages[key])
    }
    console.log(allLanguages)
    return (
        <>
            <h3>Languages</h3>
            <ul>
            {allLanguages.map(languages => (<li>{languages}</li>))}
            </ul>
        </>
    )
}

export default Languages