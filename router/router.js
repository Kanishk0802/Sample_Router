document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

const urlRoutes = {
	404: {
		template: "/templates/404.html"
	},
	"/magazine": {
		template: "/templates/magazine.html",
	},
	"/about": {
		template: "/templates/about.html",
		
	},
	"/contact": {
		template: "/templates/contact.html",
	},
};


const urlRoute = (event) => {
	event = event || window.event; 
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

const urlLocationHandler = async () => {
	const location = window.location.pathname; 
	if (location.length == 0) {
		location = "/";
	}
	const route = urlRoutes[location] || urlRoutes["404"];
	const html = await fetch(route.template).then((response) => response.text());
	document.getElementById("content").innerHTML = html;
	document.title = route.title;
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();