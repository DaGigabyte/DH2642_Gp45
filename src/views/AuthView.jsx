function AuthView(props) {
    console.log(props.user);
    return (
        <div>
            <h1>AuthView</h1>
            <span>
                <button onClick={props.onSignIn}>Sign in</button>
                userID: {props.uid && ""}
            </span>
            <span>
                <button onClick={props.onSignOut}>Sign out</button>
            </span>
        </div>
    );
}

export default AuthView;