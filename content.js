const mySideBar = document.createElement('div');
mySideBar.className = 'custom-sidebar';
document.body.appendChild(mySideBar);



function toggleSideBar() {
    console.log("in toggleSideBar");
    mySideBar.classList.toggle('visible');
}

function handleKeyPress(event) {
    if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'm') {
        console.log("shortcut was pressed");
        toggleSideBar();
    }
}

document.addEventListener('keydown', handleKeyPress);