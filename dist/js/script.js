const postsWrapper = document.querySelectorAll('.post-wrapper');
const addPostElem = document.querySelector('.add-product');

// Добавление сообщений в чат (и удаление авторских сообщений)

const setPosts = {
	allPosts: [],
	addPost(title, descr, price, handler) {
		this.allPosts.unshift({
			title, 
			descr,
			price
		});
		if (handler) {
			handler();
		}
	},
};

const showAllPosts = () => {
	const title = addPostElem.elements.title.value;
	const descr = addPostElem.elements.descr.value;
	const price = addPostElem.elements.price.value;
	let postsHTML = '';	
		postsHTML += `
			<div class="post">	
				<div class="post-body">
					
					<h2 class="post-title">${title}</h2>
					<p class="post-text">${descr}</p>
					<h3 class="post-price">${price}</h3>
				</div>
				<div class="post-footer">
					<button class="post-button delete">
						<img src="img/delete.svg" alt="delete" width="19" height="20" class='icon'>
					</button>
				</div>
			</div>
		`;
	document.querySelector('.post-wrapper-active').insertAdjacentHTML("beforeend", postsHTML);

	const deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach((item) => {
		item.addEventListener('click', () => {
			const post = item.closest('.post');
			post.remove();
		});
	});
	return;
};


const init = () => {
	addPostElem.addEventListener('submit', (event) => {
		event.preventDefault();
		const { title, descr, price } = addPostElem.elements;

		if (title.value.length < 2) {
			alert('Слишком короткое наименование');
			return;
		}
		if (descr.value.length < 3) {
			alert('Слишком короткое описание');
			return;
		}

		setPosts.addPost(title.value, descr.value, price.value, showAllPosts);
		addPostElem.reset();
	});
};

document.addEventListener('DOMContentLoaded', init);