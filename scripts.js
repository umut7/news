document.addEventListener('DOMContentLoaded', function() {
  const newsContainer = document.getElementById('newsContainer');
  const searchInput = document.getElementById('searchInput');
  const languageSelect = document.getElementById('languageSelect');
  const loginButton = document.getElementById('loginButton');
  const notificationsButton = document.getElementById('notificationsButton');

  let newsData = [];

  fetch('data/newsData.json')
      .then(response => response.json())
      .then(data => {
          newsData = data;
          displayNews(newsData, languageSelect.value);
      })
      .catch(error => {
          console.error('Error fetching news:', error);
      });

  searchInput.addEventListener('input', function() {
      const searchText = searchInput.value.toLowerCase();
      const filteredNews = newsData.filter(news => 
          news.title[languageSelect.value].toLowerCase().includes(searchText) ||
          news.content[languageSelect.value].toLowerCase().includes(searchText)
      );
      displayNews(filteredNews, languageSelect.value);
  });

  languageSelect.addEventListener('change', function() {
      displayNews(newsData, languageSelect.value);
  });

  loginButton.addEventListener('click', function() {
      window.location.href = 'login.html';
  });

  notificationsButton.addEventListener('click', function() {
      alert('You have no new notifications.');
  });

  function displayNews(news, language) {
      newsContainer.innerHTML = '';
      news.forEach(item => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');
          newsItem.innerHTML = `
              <img src="${item.image}" alt="${item.title[language]}">
              <h3>${item.title[language]}</h3>
              <p>${item.content[language]}</p>
              <p><strong>${item.author}</strong> - ${item.date}</p>
          `;
          newsItem.addEventListener('click', function() {
              localStorage.setItem('selectedNews', JSON.stringify(item));
              window.location.href = 'news.html';
          });
          newsContainer.appendChild(newsItem);
      });
  }

  let slideIndex = 0;
  const slides = document.querySelectorAll('.slider .slides img');
  showSlides();

  function showSlides() {
      slides.forEach(slide => {
          slide.style.display = 'none';
      });
      slideIndex++;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = 'block';
      setTimeout(showSlides, 3000); // Change image every 3 seconds
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;

          fetch('data/users.json')
              .then(response => response.json())
              .then(users => {
                  const user = users.find(user => user.username === username && user.password === password);
                  if (user) {
                      localStorage.setItem('loggedInUser', JSON.stringify(user));
                      window.location.href = 'index.html';
                  } else {
                      alert('Invalid username or password');
                  }
              });
      });
  } else {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (loggedInUser) {
          document.getElementById('loginButton').textContent = loggedInUser.username;
      }
  }
});
