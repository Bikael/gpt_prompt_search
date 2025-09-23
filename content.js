class ChatterBoxSidebar {
    constructor() {
        this.prompts = [];
        this.mySideBar = this.createSidebar();
        this.observeMessages();
        this.initSidebarState()
        
        document.addEventListener('keydown', this.handleKeyPress.bind(this));

    }

        
    createSidebar() {
    const div = document.createElement('div');
    div.className = 'custom-sidebar';
    document.body.appendChild(div);

    const header = document.createElement('h1');
    header.className = 'num-prompts';
    header.innerText = `${this.prompts.length} prompts`;
    div.appendChild(header);

    this.header = header;

    // New scrollable content container
    const content = document.createElement('div');
    content.className = 'sidebar-content';
    div.appendChild(content);

    this.content = content;

    return div;
}


    async initSidebarState(){
        try {
        const result = await chrome.storage.local.get(['divVisible']);
        console.log(result.divVisible);
        if (result.divVisible) {
            this.toggleSideBar();
        }
    } catch (err) {
        console.error("Error getting storage:", err);
    }
    }
    updatePromptCount(){
        this.header.innerText = `${this.prompts.length} prompts`;
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
        if(this.mySideBar.classList.contains("visible")){
            chrome.storage.local.set({ divVisible: true });
        }else{
            chrome.storage.local.set({ divVisible: false });
        }
        
        
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
            let prompt_content = prompt.textContent.replace(/[\r\n]/g, '');
            card.innerText = prompt_content;
            card.addEventListener('click', (event) =>{
                prompt.scrollIntoView({ behavior: "smooth", block: "center" });
            });
            this.content.appendChild(card);
        });
        
    }
}

new ChatterBoxSidebar();