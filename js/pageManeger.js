class PageManager {
    _dom = null
    _root = null;
    _pageData = null;
    _totalPages = null;
    _currentPage = null;
    _paginationEvent = null;
    _pageSize = 4;
    _startIndex = null;
    _endIndex = null;

    set dom(dom) {
        this._dom = dom;
    }

    get dom() {
        return this._dom;
    }

    set manage(data) {
        this._pageData = data.data;
        this._totalPages = [...this.numToArray(data.total_pages)];
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
                const div = this.dom.createElement("div");
                const fullName = this.dom.createElement("p", {
                    innerHTML: `${element.first_name} ${element.last_name}`,
                });
                const avatar = this.dom.createElement("img", {src: element.avatar});
                this.dom.appendByMultiple(div, [avatar, fullName]);
                this.dom.appendByElement(row, div);

            }
            const rootElement = this.dom.getById("root");
            this.dom.appendByElement(rootElement, row);
        }
    }

    managePagination(start = 1) {
        this._startIndex = (start - 1) * this._pageSize;
        this._endIndex = start * this._pageSize;
    }

    renderPagination() {

        const pageContainer = this.dom.createElement("ul", {
            cls: "pagination"
        });

        const div = this.dom.getById("pagination");

        const prev = this.dom.createElement("li", {cls: "page-item"});
        const next = this.dom.createElement("li", {cls: "page-item"});
        const linkPrev = this.dom.createElement("a", {
            cls: "page-link",
            innerText: "prev",
            href: "#"
        });
        const linkNext = this.dom.createElement("a", {
            cls: "page-link",
            innerText: "next",
            href: "#"
        });

        prev.addEventListener("click", async () => await this.pageManipulation("prev"));
        next.addEventListener("click", async () => await this.pageManipulation("next"));

        this.dom.appendByElement(prev, linkPrev)
        this.dom.appendByElement(next, linkNext)
        this.dom.appendByElement(pageContainer, prev);

        const arr = this._totalPages.slice(this._startIndex, this._endIndex);

        for (let f = 0; f < arr.length; f++) {

            const listItem = this.dom.createElement("li", {cls: "page-item"});
            const listItemLink = this.dom.createElement("a", {
                cls: "page-link",
                innerText: arr[f],
                href: "#"
            });

            if (f === 0) {
                listItem.className = "page-item active"
            }

            listItem.addEventListener("click", async () => {
                document.querySelectorAll('.active').forEach((el) => el.className = "page-item"); //remove class name from last page
                listItem.className = "page-item active";
                try {
                    document.getElementById("data").remove();
                    this.manage = await this.paginationEvent(listItemLink.innerText);
                    this.renderData();
                } catch (error) {
                    console.log(error);
                }
            });

            this.dom.appendByElement(listItem, listItemLink);
            this.dom.appendByElement(pageContainer, listItem);

        }

        this.dom.appendByElement(pageContainer, next);
        this.dom.appendByElement(div, pageContainer);
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
                        } else {
                            this._endIndex = this._endIndex + this._pageSize;
                        }

                        this.renderPagination();
                    }
                    document.getElementById("data").remove();// remove the old data from container for the new one
                    this.manage = await this.paginationEvent(parseInt(this._currentPage) + 1);
                    this.renderData();
                    document.querySelectorAll(".page-item").forEach(item => {
                        if (item.innerText === this._currentPage.toString()) {
                            item.className = "page-item active"
                        } else if (item.innerText !== this._currentPage.toString()) {
                            item.className = "page-item"
                        } else {
                            item.className = "page-item"
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
                    if (this._startIndex >= this._currentPage) {
                        document.getElementById("pagination").innerHTML = "";
                        this._endIndex = this._currentPage;
                        this._startIndex = this._currentPage - this._pageSize;
                        console.log(this._currentPage);
                        console.log(this._startIndex);
                        console.log(this._endIndex);
                        this.renderPagination();
                    }


                    this.renderData();
                    document.querySelectorAll(".page-item").forEach(item => {
                        if (item.innerText === this._currentPage.toString()) {
                            item.className = "page-item active"
                        } else if (item.innerText !== this._currentPage.toString()) {
                            item.className = "page-item"
                        } else {
                            item.className = "page-item"
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    numToArray = (number) => {
        const arr = [];
        for (let f = 1; f <= number; f++) {
            arr.push(f);
        }
        return arr;

    }

}

export default PageManager;
