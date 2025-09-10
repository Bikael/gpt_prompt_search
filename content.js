const mySideBar = document.createElement('div');
mySideBar.className = 'custom-sidebar';
document.body.appendChild(mySideBar);



function toggleSideBar() {
    console.log("in toggleSideBar");
    console.log(mySideBar.style.display);
    if (mySideBar.style.display == 'none') {
        mySideBar.style.display = 'flex';
    } else{
        console.log("in here");
        mySideBar.style.display = 'none';
    }
}

function handleKeyPress(event) {
    if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'm') {
        console.log("shortcut was pressed");
        toggleSideBar();
    }
}
document.addEventListener('keydown', handleKeyPress);