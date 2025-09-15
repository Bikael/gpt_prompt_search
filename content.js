class ChatterBoxSidebar {
    constructor() {
        this.prompts = [];
        this.mySideBar = this.createSidebar();
        this.observeMessages();
        document.addEventListener('keydown', this.handleKeyPress.bind(this));

    }

    createSidebar() {
        const div = document.createElement('div');
        div.className = 'custom-sidebar';
        document.body.appendChild(div);

        const header = document.createElement('h1');
        header.className = 'num-prompts';
        header.innerText = `prompts: ${this.prompts.length}`
        div.appendChild(header)

        this.header = header;

        return div;
    }
    updatePromptCount(){
        this.header.innerText = `prompts: ${this.prompts.length}`;
    }

    getUserMessages(){
        const messages = document.querySelectorAll('[data-message-author-role="user"]');
        return messages
    }

    getNewPrompts() {
        const new_prompts = [];
        const nodes = document.querySelectorAll('[data-message-author-role="user"]');
        nodes.forEach(node => {
            if (!this.prompts.includes(node.textContent)){
                new_prompts.push(node);
                console.log(node.textContent);
            }
        });
        new_prompts.forEach(prompt =>{
            this.prompts.push(prompt.textContent);
        })
        
        if (new_prompts.length > 0) {
            this.updatePromptCount();
            this.addCard(new_prompts);
        }
        return new_prompts;
    }

    observeMessages() {
        const messageContainer = document.querySelector('div[role="presentation"]');
        if (!messageContainer) return;
        this.getNewPrompts();
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                for (const node of mutation.addedNodes) {
                    if (
                        node.nodeType === Node.ELEMENT_NODE &&
                        (node.matches?.('[data-message-author-role="user"]') ||
                         node.querySelector?.('[data-message-author-role="user"]'))
                    ) {
                        this.getNewPrompts();
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
        prompts.forEach(prompt =>{
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.innerText = prompt.textContent;
            card.addEventListener('click', (event) =>{
                prompt.scrollIntoView({ behavior: "smooth", block: "center" });
            });
            this.mySideBar.appendChild(card);
        });
        
    }
}

new ChatterBoxSidebar();