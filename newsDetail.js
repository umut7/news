document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    const language = urlParams.get('lang');

    const newsDetailContainer = document.getElementById("newsDetailContainer");

    fetch('frontend/data/newsData.json')
        .then(response => response.json())
        .then(data => {
            const newsData = data[language].find(news => news.id === newsId);

            if (newsData) {
                newsDetailContainer.innerHTML = `
                    <h1>${newsData.title}</h1>
                    <img src="${newsData.image}" alt="${newsData.title}">
                    <p>${newsData.content}</p>
                    <p>${newsData.author} - ${newsData.date}</p>
                    <button id="likeButton">Like</button>
                    <button id="dislikeButton">Dislike</button>
                `;

                document.getElementById("likeButton").addEventListener("click", function() {
                    alert("You liked the news!");
                });

                document.getElementById("dislikeButton").addEventListener("click", function() {
                    alert("You disliked the news!");
                });
            }
        });
});
