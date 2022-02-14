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
    get rootFolder (){
        return this._rootFolder;
    }
    get itemsPerPage(){
        return this._itemsPerPage;
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(dataSource) {
        this._dataSource = dataSource;
    }
    async init() {
        dataManager.loadFrom(this.dataSource);
        dataManager.itemsPerPage = this.itemsPerPage;

        pageManager.container = this.rootFolder;
        pageManager.dom = dom;
        pageManager.manage = await dataManager.getPaginatableData();
        pageManager.renderData();
        pageManager.managePagination();
        pageManager.paginationEvent = dataManager.getPaginatableData;
        pageManager.renderPagination();
    }
}

export default Paginator;