import DataManager from "./dataManager.js";
import PageManager from "./pageManeger.js";
const dataManager = new DataManager();
const pageManager = new PageManager();

class InitPagination {
    _url = null;
    _itemsPerPage = null;
    _rootFolder = null
    constructor(url, itemsPerPage,rootFolder) {
        this._url = url;
        this._itemsPerPage = itemsPerPage;
        this._rootFolder = rootFolder;
    }

    async init() {
        dataManager.loadFrom(this._url);
        dataManager.itemsPerPage = this._itemsPerPage;
        pageManager.container = "root";
        pageManager.manage = await dataManager.getPaginableData(1);
        pageManager.renderData();
        pageManager.paginationEvent = dataManager.getPaginableData;
        pageManager.renderPagination();
    }
}

export default InitPagination;