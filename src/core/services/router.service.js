class RouterService {
  constructor() {
    window.onhashchange = (e) => {
      if (e.newURL !== e.oldURL) {
        this.setContent(window.location.hash.substring(1));
      }
    };
  }

  setRoute(hash) {
    window.location.hash = hash;
  }

  setContent(hash) {}
}

export default new RouterService();
