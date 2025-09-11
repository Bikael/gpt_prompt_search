const mySideBar = document.createElement('div');
mySideBar.className = 'custom-sidebar';
document.body.appendChild(mySideBar);

function getUserMessages() {
    const nodes = document.querySelectorAll('[data-message-author-role="user"]');
    nodes.forEach(node => {
        console.log(node.textContent);
    });
}
const messageContainer = document.querySelector('div[role="presentation"]');

if (messageContainer) {
    getUserMessages();
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            for (const node of mutation.addedNodes) {
                // Check if the added node is an element
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the node itself or any of its descendants match
                    if (
                        node.matches?.('[data-message-author-role="user"]') ||
                        node.querySelector?.('[data-message-author-role="user"]')
                    ) {
                        getUserMessages();
                        return; // Call once per batch of mutations
                    }
                }
            }
        }
    });
    observer.observe(messageContainer, { childList: true, subtree: true });
}

function toggleSideBar() {
    console.log("in toggleSideBar");
    mySideBar.classList.toggle('visible');
    getUserMessages();
}

function handleKeyPress(event) {
    if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'm') {
        console.log("shortcut was pressed");
        toggleSideBar();
    }
}

document.addEventListener('keydown', handleKeyPress);