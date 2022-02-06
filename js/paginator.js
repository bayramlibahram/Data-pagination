import DataManager from "./dataManager.js";
import PageManager from "./pageManeger.js";

const dataManager = new DataManager();
const pageManager = new PageManager();

class Paginator {
    _dataSource = null;
    _itemsPerPage = null;
    _rootFolder = null

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
        pageManager.manage = await dataManager.getPaginableData(1);
        pageManager.renderData();
        pageManager.paginationEvent = dataManager.getPaginableData;
        pageManager.renderPagination();
    }
}

export default Paginator;