import DataManager from "./dataManager.js";
import PageManager from "./pageManeger.js";
import dom from "./dom.js";

const dataManager = new DataManager();
const pageManager = new PageManager();

class Paginator {
    constructor(dataSource, itemsPerPage, rootFolder) {
        this._dataSource = dataSource;
        this._itemsPerPage = itemsPerPage;
        this._rootFolder = rootFolder;
    }

    get dataSource() {
        return this._dataSource;
    }

    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }

    async init() {
        dataManager.loadFrom(this.dataSource);
        dataManager.itemsPerPage = this._itemsPerPage;
        pageManager.container = "root";
        pageManager.dom = dom;
        pageManager.manage = await dataManager.getPaginatableData(1);
        pageManager.renderData();
        pageManager.managePagination();
        pageManager.paginationEvent = dataManager.getPaginatableData;
        pageManager.renderPagination();
    }
}

export default Paginator;