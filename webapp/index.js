function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userInfoElem = document.getElementById("userinfo");
    addLiToElement(userInfoElem, "H2", 'User Info');
    addLiToElement(userInfoElem, "LI", 'ID: ' + profile.getId());
    addLiToElement(userInfoElem, "LI", 'Name: ' + profile.getName());
    addLiToElement(userInfoElem, "LI", 'Email: ' + profile.getEmail());
    addLiToElement(userInfoElem, "LI", 'id_token: ' + googleUser.getAuthResponse().id_token);
}

function onFailure(error) {
    console.log(error);
}

function renderButton() {
    gapi.signin2.render('siginbutton', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function addLiToElement(element, type, text) {
    var node = document.createElement(type);
    var content = document.createTextNode(text);
    node.appendChild(content);
    element.appendChild(node);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        var userInfoElem = document.getElementById("userinfo");
        while (userInfoElem.firstChild) {
            userInfoElem.removeChild(userInfoElem.firstChild);
        }
    });
    auth2.disconnect();
}

