class DataManager {
  _itemsPerPage = 5;
  static _dataUrl = null;
  request = async (url, method = "GET") => {
    try {
      const response = await fetch(url, {
        method,
      });
        return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
  loadFrom = (url) => {
    this._dataUrl = url;
  };
  getPaginableData = async (page = 1) => {
    try {
        return await this.request(
          `${this._dataUrl}?page=${page}&per_page=${this._itemsPerPage}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  get itemsPerPage() {
    return this._itemsPerPage;
  }
  set itemsPerPage(per_page) {
    this._itemsPerPage = per_page;
  }
}

export default DataManager;
