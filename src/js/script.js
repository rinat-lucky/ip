const postsWrapper = document.querySelectorAll('.post__wrapper');
const addPostElem = document.querySelector('#form');


const init = () => {
	addPostElem.addEventListener('submit', (event) => {
		event.preventDefault();
		const { link, title, descr, price } = addPostElem.elements;

		setPosts.addPost(link.value, title.value, descr.value, price.value, showAllPosts);
		addPostElem.reset();
	});
};

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

const showAllPosts = () => {
	const link = addPostElem.elements.link.value;
	const title = addPostElem.elements.title.value;
	const descr = addPostElem.elements.descr.value;
	const price = addPostElem.elements.price.value;
	let postsHTML = '';	
		postsHTML += `
			<div class="post__card">	
				<div class="post__body">
					<img src="${link}" alt="${title}">
					<h2 class="post__title">${title}</h2>
					<p class="post__descr">${descr}</p>
					<h3 class="post__price">${price}</h3>
				</div>
				<a class="post__delete">
					<img src="img/delete.svg" alt="delete" width="32" height="32">
				</a>
			</div>
		`;
	document.querySelector('.post__wrapper').insertAdjacentHTML("beforeend", postsHTML);

	const deleteBtns = document.querySelectorAll('.post__delete');
	deleteBtns.forEach((item) => {
		item.addEventListener('click', () => {
			const post = item.closest('.post__card');
			post.remove();
		});
	});
	return;
};


document.addEventListener('DOMContentLoaded', init);