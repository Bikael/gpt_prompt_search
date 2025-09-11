class ChatterBoxSidebar {
    constructor() {
        this.mySideBar = this.createSidebar();
        this.observeMessages();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    createSidebar() {
        const div = document.createElement('div');
        div.className = 'custom-sidebar';
        document.body.appendChild(div);
        return div;
    }

    getUserMessages() {
        const prompts = [];
        const nodes = document.querySelectorAll('[data-message-author-role="user"]');
        nodes.forEach(node => {
            console.log(node.textContent);
            prompts.push(node.textContent);
        });
        return prompts;
    }

    observeMessages() {
        const messageContainer = document.querySelector('div[role="presentation"]');
        if (!messageContainer) return;
        this.getUserMessages();
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    if (
                        node.nodeType === Node.ELEMENT_NODE &&
                        (node.matches?.('[data-message-author-role="user"]') ||
                         node.querySelector?.('[data-message-author-role="user"]'))
                    ) {
                        this.getUserMessages();
                        return;
                    }
                }
            }
        });
        observer.observe(messageContainer, { childList: true, subtree: true });
    }

    toggleSideBar() {
        this.mySideBar.classList.toggle('visible');
    }

    handleKeyPress(event) {
        if (event.shiftKey && event.ctrlKey && event.key.toLowerCase() === 'm') {
            this.toggleSideBar();
        }
    }

    addCard(prompts) {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.innerText = prompts[0] || '';
        this.mySideBar.appendChild(card);
    }
}

new ChatterBoxSidebar();