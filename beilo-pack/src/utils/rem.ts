// rem适配相关
const docEl = document.documentElement;

// adjust body font size
function setBodyFontSize() {
    if (document.body) {
        document.body.style.fontSize = '16px';
    } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
}
setBodyFontSize();

function setRemUnit() {
    let rem = 16;
    rem = (docEl!.offsetWidth / 750) * 100;
    rem = rem > 87 ? 87 : rem;
    docEl!.style.fontSize = `${rem}px`;
}

setRemUnit();

window.addEventListener('resize', setRemUnit);
window.addEventListener('pageshow', function pageShow(e) {
    if (e.persisted) {
        setRemUnit();
    }
});