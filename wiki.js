let input = document.getElementById("searchInput");
let results = document.getElementById("searchResults");
let Spinner = document.getElementById("spinner");


function ceateAndAppend(result) {

    let {
        link,
        title,
        description
    } = result;

    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    results.appendChild(resultItem);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.textContent = title;
    resultTitle.target = "_blank";
    resultItem.appendChild(resultTitle);

    let titBR = document.createElement("br");
    resultItem.appendChild(titBR);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultItem.appendChild(urlEl);

    let des = document.createElement("p");
    des.textContent = description;
    des.classList.add("link-description");
    resultItem.appendChild(des);

}

function Display(searchResults) {

    Spinner.classList.toggle("d-none");

    for (let result of searchResults) {
        ceateAndAppend(result);
    }
}


function searchWiki(Event) {
    if (Event.key === "Enter") {
        Spinner.classList.toggle("d-none");
        results.textContent = "";
        let inpVal = input.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inpVal;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                Display(search_results);
            })
    }
}


input.addEventListener("keydown", searchWiki);