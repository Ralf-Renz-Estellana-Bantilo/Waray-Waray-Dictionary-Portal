class AppConfiguration {
	constructor() {
		this.CONFIGURED_URL = undefined;
	}

	url() {
		const currentURL = window.location.href;

		if (currentURL.includes("localhost")) {
			this.CONFIGURED_URL = "http://localhost:1999";
		} else {
			this.CONFIGURED_URL =
				"https://waray-waray-dictionary-portal.herokuapp.com";
		}

		return this.CONFIGURED_URL;
	}
}

export default new AppConfiguration();
