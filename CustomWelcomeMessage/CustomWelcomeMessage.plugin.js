/**
 * @name CustomWelcomeMessage
 * @version 1.0
 * @description allows you to add a custom welcome message that appears everytime you start discord
 * @author bopthing1
 */

const DEFAULT_MSG_TITLE = "Welcome to Discord";
const DEFAULT_MSG_TEXT = "this message is customizable";

const BdApiData = BdApi.Data;

class Form {
	constructor(text, parent) {
		// const title = document.createElement("h1");
		// title.innerText = text;

		const input = document.createElement("input");
		input.type = "text";
		input.placeholder = text + " here...";
		input.innerHTML = `<div class="input-group mt-3"><span class="input-group-text" id="basic-addon1">Username</span><input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"><button class="btn btn-outline-primary" type="button" id="button-addon2">Add</button></div>`;
		input.style.width = "100%";

		parent.appendChild(input);

		return input;
	}
}

class ToggleButton {
	constructor(key, parent, pluginClass) {
		this.key = key;
		this.pluginClass = pluginClass;
		this.button = document.createElement("button");
		this.button.innerText = this.key;
		this.button.className =
			"btn-2t4qw2 button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeSmall-3R2P2p fullWidth-3M-YBR grow-2T4nbg";

		parent.appendChild(this.button);

		this.render();

		this.button.addEventListener("click", () => {
			const data = this.pluginClass.data;
			const keyData = data[this.key];

			this.pluginClass.data = {
				title: data.title,
				text: data.text,
				startupChime: !keyData,
			};

			// console.log("e" + !keyData);

			this.render();
		});

		return this.button;
	}

	render() {
		const data = this.pluginClass.data;
		const keyData = data[this.key];

		console.log(data, keyData);

		this.button.innerText = `${this.key}: ${keyData} ${keyData ? "✅" : "❌"}`;
	}
}

class CustomWelcomeMessage {
	get data() {
		return (
			BdApiData.load("custom-welcome-message", "data") || {
				title: DEFAULT_MSG_TITLE,
				text: DEFAULT_MSG_TEXT,
				startupChime: false,
			}
		);
	}

	set data(value) {
		BdApiData.save("custom-welcome-message", "data", value);
	}

	doAlert() {
		if (this.data.startupChime) {
			const audio = new Audio(
				"https://www.myinstants.com/media/sounds/win31.mp3"
			);
			audio.play();
		}

		BdApi.alert(this.data.title, this.data.text);
	}

	load() {
		// this.doAlert();
	}
	start() {
		this.doAlert();
	}
	stop() {}

	getSettingsPanel() {
		const div = document.createElement("div");
		div.classList = "card bg-dark text-light";

		const link = document.createElement("link");
		link.href =
			"https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css";
		link.rel = "stylesheet";
		div.appendChild(link);

		const windowTitle = new Form("welcome message title", div);
		windowTitle.value = this.data.title;
		windowTitle.addEventListener("change", () => {
			const data = this.data;

			this.data = {
				title: windowTitle.value,
				text: data.text,
				startupChime: data.startupChime,
			};
		});

		const windowText = new Form("welcome message text", div);
		windowText.value = this.data.text;
		windowText.addEventListener("change", () => {
			const data = this.data;

			this.data = {
				title: data.title,
				text: windowText.value,
				startupChime: data.startupChime,
			};
		});

		const preview = document.createElement("button");
		preview.innerText = "preview";
		preview.className =
			"btn-2t4qw2 button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeSmall-3R2P2p fullWidth-3M-YBR grow-2T4nbg";
		preview.addEventListener("click", () => {
			this.doAlert();
		});
		div.appendChild(preview);

		const startupChime = new ToggleButton("startupChime", div, this);

		return div;
	}
}

module.exports = CustomWelcomeMessage;
