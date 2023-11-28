import AuthView from "../views/AuthView"

export default function Auth(props) {
    return (
        <AuthView onSignIn={props.onSignIn} onSignOut={props.onSignOut} user={props.user}/>
    )
}
