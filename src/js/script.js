const postWrapper = document.querySelector('.post__wrapper');
const addPostForm = document.querySelector('#form');

// передача данных из отправленной формы в функцию-рендер
const init = () => {
	addPostForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const { link, title, descr, price } = addPostForm.elements;

		showAllPosts(link.value, title.value, descr.value, price.value);
		addPostForm.reset();
	});
};

// функция-рендер
const showAllPosts = (link, title, descr, price) => {
	let postsHTML = '';	
		postsHTML += `
			<div class="post__card">	
				<img src="${link}" alt="${title}">
				<div class="post__body">
					<h2 class="post__title">${title}</h2>
					<div class="post__descr">${descr}</div>
					<h3 class="post__price">${price}&nbsp;руб.</h3>
				</div>
				<a class="post__delete">
					<img src="img/delete.svg" alt="delete">
				</a>
			</div>
		`;
	postWrapper.insertAdjacentHTML("beforeend", postsHTML);
	deletePost();
	return;
};

// функция, выводящая кнопки "удалить" на каждой карточке, а также удаляющая посты при клике на такие кнопки
const deletePost = () => {
	const posts = document.querySelectorAll('.post__card');
	const deleteBtns = document.querySelectorAll('.post__delete');

	posts.forEach((item) => {
		const deleteBtn = item.querySelector('.post__delete');
		item.addEventListener('mouseenter', () => {
			deleteBtn.classList.add('post__delete_active');
		})
		item.addEventListener('mouseleave', () => {
			deleteBtn.classList.remove('post__delete_active');
		})
	})
	
	deleteBtns.forEach((item) => {
		item.addEventListener('click', () => {
			const post = item.closest('.post__card');
			post.remove();
		});
	});
}

deletePost();
document.addEventListener('DOMContentLoaded', init);