const ConditionalOutputIfElse = () => {
    const loggedIn = true;
    if (loggedIn) {
        return (<h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>);
    } else {
        return (<h2 id="wd-conditional-output-if-else-please-login">Please Login If Else </h2>)
    }
};

export default ConditionalOutputIfElse;