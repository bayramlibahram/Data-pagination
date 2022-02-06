class PageManager {
    _root = null;
    _pageData = null;
    _totalPages = null;
    _paginationEvent = null;
    renderData(propsArr) {
        const row = document.createElement("div");
        row.id = "data";
        if (length in this._pageData) {
            for (let element of this._pageData) {
                const div = document.createElement("div");
                const fullName = document.createElement("p");
                const avatar = document.createElement("img");
                console.log(element)
                fullName.innerHTML = `${element.first_name} ${element.last_name}`;
                avatar.src = element.avatar;
                div.appendChild(avatar);
                div.appendChild(fullName);
                row.appendChild(div);
            }
            const rootElement = document.getElementById("root");
            rootElement.appendChild(row);
        }
    }
    renderPagination() {
        const pageContainer = document.createElement("div");
        for (let f = 1; f <= this._totalPages; f++) {
            const button = document.createElement("button");
            button.innerText = f;

            button.addEventListener("click", async () => {
                try {
                    document.getElementById("data").remove();
                    this.manage = await this.paginationEvent(button.innerText);
                    this.renderData();
                } catch (error) {
                    console.log(error);
                }
            });
            pageContainer.appendChild(button);
        }
        const div = document.getElementById("root");
        div.appendChild(pageContainer);
    }
    set manage(data) {
        this._pageData = data.data;
        this._totalPages = data.total_pages;
    }
    set container (container) {
        this._root = container;
    };
    get paginationEvent() {
        return this._paginationEvent;
    }
    set paginationEvent(fn) {
        this._paginationEvent = fn;
    }

}

export default PageManager;
