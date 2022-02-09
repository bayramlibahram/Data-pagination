class PageManager {
    _root = null;
    _pageData = null;
    _totalPages = null;
    _currentPage = null;
    _paginationEvent = null;
    _pageSize = 4;
    _startIndex = null;
    _endIndex = null;

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

        const pageContainer = document.createElement("ul");
        const div = document.getElementById("pagination");
        pageContainer.className="pagination";

        const prev = document.createElement("li");
        const next = document.createElement("li");
        const linkPrev = document.createElement("a");
        const linkNext = document.createElement("a");

        linkPrev.innerText = "prev";
        linkNext.innerText = "next";

        prev.className = "page-item";
        next.className = "page-item"

        linkPrev.className = "page-link";
        linkNext.className = "page-link";

        linkPrev.href = "#";
        linkNext.href = "#";

        prev.addEventListener("click", async () => await this.pageManipulation("prev"));
        next.addEventListener("click", async () => await this.pageManipulation("next"));


        prev.appendChild(linkPrev);
        next.appendChild(linkNext);
        pageContainer.appendChild(prev);

        const arr = this._totalPages.slice(this._startIndex, this._endIndex);

        for (let f = 0; f <arr.length; f++) {

            const listItem = document.createElement("li");
            const listItemLink = document.createElement("a");
            listItem.className = "page-item";
            listItemLink.className = "page-link";


            listItemLink.innerText = arr[f];
            listItemLink.href ="#";
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
                }
                catch (error) {
                    console.log(error);
                }
            });

            listItem.appendChild(listItemLink);
            pageContainer.appendChild(listItem);
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
