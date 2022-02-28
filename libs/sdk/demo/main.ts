import { LoginDto } from '@/dtos/login.dto';
import { createClient } from '@/index';

const client = createClient({
  APIKey: 'CULTURA',
  sso: false
});

const profile = document.querySelector('.profile')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const logoutButton = document.getElementById(
  'logout-button'
) as HTMLButtonElement;

async function main() {
  loginForm.addEventListener('submit', login);
  logoutButton.addEventListener('click', logout);
  client.on('ready', () => {
    client.auth.currentUser ? showProfile() : showLoginForm();
  });

  await client.init();
}

function showLoginForm() {
  loginForm.classList.remove('hidden');
  loginForm.classList.remove('formErrorSubmit');
}

function showProfile() {
  if (!client.auth.currentUser) return;

  loginForm.classList.add('hidden');
  profile.classList.remove('hidden');
  document.querySelector('.username')!.textContent =
    client.auth.currentUser.username;
}

async function login(e: SubmitEvent) {
  e.preventDefault();
  if (loginForm.dataset.submitting) return;

  try {
    loginForm.dataset.submitting = 'true';
    await client.auth.login(
      Object.fromEntries(new FormData(loginForm).entries()) as LoginDto
    );
    showProfile();
  } catch (err) {
    console.error(err);
    loginForm.classList.add('formErrorSubmit');
  } finally {
    delete loginForm.dataset.submitting;
  }
}

function logout() {
  client.auth.logout();
  showLoginForm();
}

main();
