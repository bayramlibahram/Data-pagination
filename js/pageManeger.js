class PageManager {
    _root = null;
    _pageData = null;
    _totalPages = null;
    _currentPage = null;
    _paginationEvent = null;
    _pageSize = 5;
    _startIndex = null;
    _endIndex = null;

    set manage(data) {
        this._pageData = data.data;
        this._totalPages = [...this.intgToArr(data.total_pages)];
        this._currentPage = data.page;
    }

    set container(container) {
        this._root = container;
    };

    get paginationEvent() {
        return this._paginationEvent;
    }

    set paginationEvent(fn) {
        this._paginationEvent = fn;
    }

    renderData() {
        const row = document.createElement("div");
        row.id = "data";
        if (length in this._pageData) {
            for (let element of this._pageData) {
                const div = document.createElement("div");
                const fullName = document.createElement("p");
                const avatar = document.createElement("img");
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

    managePagination(start){
        this._startIndex = (start-1) * this._pageSize;
        this._endIndex = start * this._pageSize;
    }

    renderPagination() {

        const pageContainer = document.createElement("div");
        const div = document.getElementById("pagination");

        const prev = document.createElement("button");
        const next = document.createElement("button");

        prev.innerText = "prev";
        next.innerText = "next";

        prev.addEventListener("click", async () => await this.pageManipulation("prev"));
        next.addEventListener("click", async () => await this.pageManipulation("next"));

        pageContainer.appendChild(prev);

        const arr = this._totalPages.slice(this._startIndex, this._endIndex);

        for (let f = 0; f <arr.length; f++) {

            const button = document.createElement("button");
            button.innerText = arr[f];
            button.className = "page";

            if (f === 0) {
                button.className = "page current-page"
            }

            button.addEventListener("click", async () => {
                document.querySelectorAll('.current-page').forEach((el) => el.className = "page"); //remove class name from last page
                button.className = "page current-page";
                try {
                    document.getElementById("data").remove();
                    this.manage = await this.paginationEvent(button.innerText);
                    this.renderData();
                }
                catch (error) {
                    console.log(error);
                }
            });

            pageContainer.appendChild(button);
        }

        pageContainer.appendChild(next);

        div.appendChild(pageContainer);
    }

    pageManipulation = async (button) => {
        switch (button) {
            case "next": {
                try {
                    if (this._currentPage >= this._totalPages.length) return;
                    if (this._endIndex <= this._currentPage) {

                        document.getElementById("pagination").innerHTML = "";

                        this._startIndex = this._endIndex;

                        if (this._endIndex > this._currentPage) {
                            this._endIndex = this._totalPages;
                        }
                        else {
                            this._endIndex = this._endIndex + this._pageSize;
                        }

                        this.renderPagination();
                    }
                    document.getElementById("data").remove();// remove the old data from container for the new one
                    this.manage = await this.paginationEvent(parseInt(this._currentPage) + 1);
                    this.renderData();
                    document.querySelectorAll(".page").forEach(item => {
                        if (item.innerText === this._currentPage.toString()) {
                            item.className = "page current-page"
                        } else if (item.innerText !== this._currentPage.toString()) {
                            item.className = "page"
                        } else {
                            item.className = "page"
                        }
                    });

                } catch (error) {
                    console.log(error);
                }
                return;
            }
            case "prev": {

                try {
                    if (this._currentPage <= 1) return;
                    this.manage = await this.paginationEvent(parseInt(this._currentPage - 1));
                    document.getElementById("data").remove();
                    if(this._startIndex>= this._currentPage) {
                        document.getElementById("pagination").innerHTML = "";
                        this._endIndex = this._currentPage;
                        this._startIndex = this._currentPage - this._pageSize;
                        console.log(this._currentPage);
                        console.log(this._startIndex);
                        console.log(this._endIndex);
                        this.renderPagination();
                    }


                    this.renderData();
                    document.querySelectorAll(".page").forEach(item => {
                        if (item.innerText === this._currentPage.toString()) {
                            item.className = "page current-page"
                        } else if (item.innerText !== this._currentPage.toString()) {
                            item.className = "page"
                        } else {
                            item.className = "page"
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    intgToArr = (number) => {
        const arr = [];
        for (let f = 1; f <= number; f++) {
            arr.push(f);
        }
        return arr;

    }

}

export default PageManager;
