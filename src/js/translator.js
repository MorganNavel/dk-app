function translator(e){
    var clickedFlag=e.alt
    var currentSiteLanguage = document.getElementsByTagName('html')[0].getAttribute('lang')
    if (clickedFlag=="fr"){
        if(currentSiteLanguage=="fr"){
            alert("your language is alreay French")
            return;
        } else {
            document.documentElement.setAttribute("lang","fr")
            headerTranslateTo("fr")
        }
    } else {
        if(currentSiteLanguage=="kr"){
            alert("your language is alreay Korean")
            return;
        } else {
            document.documentElement.setAttribute("lang","kr")
            headerTranslateTo("kr")
        }
    }
}

function headerTranslateTo(targetLanguage) {
    var entrainement    = document.getElementById("entrainement")
    var cours           = document.getElementById("cours")
    var vocabulaire     = document.getElementById("vocabulaire")
    var expression      = document.getElementById("expression")
    var language        = document.getElementById("language")
    var participer      = document.getElementById("participer")
    var mapage          = document.getElementById("mapage")
    var login           = document.getElementById("login")

    if (targetLanguage=="kr") {
        entrainement.innerText  = "연습하기"
        cours.innerText         = "수업"
        vocabulaire.innerText   = "어휘"
        expression.innerText    = "표현"
        participer.innerText    = "참여하기"
        mapage.innerText        = "마이페이지"
        login.innerText         = "로그인"
        language.innerText      = "언어"
    } else {
        entrainement.innerText  = "Entraînement"
        cours.innerText         = "Cours"
        vocabulaire.innerText   = "Vocabulaire"
        expression.innerText    = "Expression"
        participer.innerText    = "Participer"
        mapage.innerText        = "Ma page"
        login.innerText         = "Login"
        language.innerText      = "Language"
    }
}