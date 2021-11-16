const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
const postsWrapper = document.querySelectorAll('.post-wrapper');
const addPostElem = document.querySelector('.add-post');

// Добавление сообщений в чат (и удаление авторских сообщений)

const setUsers = {
	user: {
		name: '',
		photo: DEFAULT_PHOTO
	},
	logIn(email) {
		if (!regExpValidEmail.test(email)) {
		  	alert('Некорректный e-mail');
		  	return;
		} else {
			setUsers.user.name = email.substring(0, email.indexOf('@'));
			toggleAuthDom();
		}
	},
	logOut() {
		setUsers.user = undefined;
		toggleAuthDom();
	},
	editUser(nameEdit, photoEdit) {
		if (nameEdit) {
			setUsers.user.name = nameEdit;
		}
		if (photoEdit) {
			setUsers.user.photo = photoEdit;
		}		
		toggleAuthDom();
	},
};

const setPosts = {
	allPosts: [],
	addPost(title, text, handler) {
		this.allPosts.unshift({
			title, 
			text, 
			date: new Date().toLocaleString(), 
			likes: 0
		});
		if (handler) {
			handler();
		}
	},
};

const showAllPosts = () => {
	const title = addPostElem.elements.title.value;
	const text = addPostElem.elements.text.value;
	const date = new Date().toLocaleString();
	let likes = 0;
	let postsHTML = '';	
		postsHTML += `
			<div class="post">	
				<div class="post-body">
					<h2 class="post-title">${title}</h2>
					<p class="post-text">${text}</p>
				</div>
				<div class="post-footer">
					<div class="post-buttons">
						<button class="post-button likes">
							<svg width="19" height="20" class="icon icon-like">
								<use xlink:href="img/icons.svg#like"></use>
							</svg>
							<span class="likes-counter">${likes}</span>
						</button>
						<button class="post-button delete">
							<img src="img/delete.svg" alt="delete" width="19" height="20" class='icon'>
						</button>
					</div>
					<div class="post-author">
						<div class="author-about">
							<a href="#" class="author-username">${userName}</a>
							<span class="post-time">${date}</span>
						</div>
						<a href="#" class="author-link">
							<img src=${userAvatar} alt="avatar" class="author-avatar">
						</a>
					</div>
				</div>
			</div>
		`;
	document.querySelector('.post-wrapper-active').insertAdjacentHTML("beforeend", postsHTML);

	const deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach((item) => {
		item.addEventListener('click', () => {
			if (setUsers.user) {
				const post = item.closest('.post');
				post.remove();
			} 
		});
	});
	return;
};

const toggleAuthDom = () => {
	const user = setUsers.user;
	if (user) {
		addPostElem.classList.add('visible'); 
	} else {
	  	addPostElem.classList.remove('visible');
	}
};

const init = () => {
	addPostElem.addEventListener('submit', () => {
		event.preventDefault();
		const { title, text } = addPostElem.elements;

		if (title.value.length < 2) {
			alert('Слишком короткий заголовок сообщения');
			return;
		}
		if (text.value.length < 3) {
			alert('Слишком короткое сообщение');
			return;
		}

		setPosts.addPost(title.value, text.value, showAllPosts);
		addPostElem.reset();
	});
};

document.addEventListener('DOMContentLoaded', init);