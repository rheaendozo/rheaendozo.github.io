const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const error = document.getElementById("error");

const API_KEY = "GqrJLXHqs9Ao66RD6HJRCFNnIdk10TSzaB6ikJ2CBHw";
const apiURL = `https://api.unsplash.com/photos/?client_id=${API_KEY}&per_page=30&page=1`;
const searchURLBase = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=30&page=1&query=`;

let imageURLs = [];

window.onload = () => {
    fetchData();
};

const fetchData = async () => {
    try {
        const response = await fetch(apiURL);
        const json = await response.json();
        imageURLs = json.map(element => ({
            url: element.urls.small,
            id: element.id
        }));
        displayImage();
    } catch (error) {
        console.error(error);
        error.innerHTML = "<h4>Unable to Fetch Data</h4>";
    }
};

function displayImage() {
    error.innerHTML = "";
    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";

    imageURLs.forEach((imageData, index) => {
        const image = document.createElement('img');
        image.src = imageData.url;
        image.classList.add("img-fluid", "pt-4");
        image.setAttribute("width", "100%");
        const link = document.createElement('a');
        link.href = `view.html?url=${encodeURIComponent(imageData.url)}&id=${imageData.id}`;
        link.appendChild(image);

        if (index % 3 === 0) {
            column1.appendChild(link);
        } else if (index % 3 === 1) {
            column2.appendChild(link);
        } else {
            column3.appendChild(link);
        }
    });
}

searchBtn.addEventListener("click", function() {
    const searchTerm = searchKey.value.trim();
    if (searchTerm !== '') {
        const searchURL = searchURLBase + searchTerm;
        fetchSearchData(searchURL);
    } else {
        error.innerHTML = "<h4>Please enter a search term.</h4>";
    }
});

const fetchSearchData = async (searchURL) => {
    try {
        const response = await fetch(searchURL);
        const json = await response.json();
        imageURLs = json.results.map(element => ({
            url: element.urls.small,
            id: element.id
        }));
        displayImage();
    } catch (error) {
        console.error(error);
        error.innerHTML = "<h4>Unable to Fetch Search Results</h4>";
    }
};
