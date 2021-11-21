const postWrapper = document.querySelector('.post__wrapper');
const addPostElem = document.querySelector('#form');

// передача данных из отправленной формы в объект, содержащий все посты-карточки
const init = () => {
	addPostElem.addEventListener('submit', (event) => {
		event.preventDefault();
		const { link, title, descr, price } = addPostElem.elements;

		setPosts.addPost(link.value, title.value, descr.value, price.value, showAllPosts);
		addPostElem.reset();
	});
};

// объект-массив, содержащий все посты-карточки и передающий в рендер данные о новом посте
const setPosts = {
	allPosts: [],
	addPost(link, title, descr, price, handler) {
		this.allPosts.unshift({
			link,
			title, 
			descr,
			price
		});
		handler();
	},
};

// функция-рендер
const showAllPosts = () => {
	const link = addPostElem.elements.link.value;
	const title = addPostElem.elements.title.value;
	const descr = addPostElem.elements.descr.value;
	const price = addPostElem.elements.price.value;
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

// функция, перебирающая все посты для выведения на экран и применения кнопки "удалить" на каждой карточке
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