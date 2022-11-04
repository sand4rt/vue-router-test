import { test, expect } from '@playwright/experimental-ct-vue';
import App from './App.vue';

test('persists the login state', async ({ page, mount }) => {
  const component = await mount(App);
  await component.getByRole('button', { name: 'login' }).click();
  await page.reload();
  await expect(component.getByText('Admin username')).toBeVisible();
});

test('redirect to the admin page when logged in', async ({ page, mount }) => {
  const component = await mount(App);
  await component.getByRole('button', { name: 'login' }).click(); // or mock the api call
  await page.goto('/login');
  await expect(component.getByText('admin page')).toBeVisible();
});

test('redirect to the login page when unauthorized', async ({ page, mount }) => {
  const component = await mount(App);
  await page.goto('/admin');
  await expect(component.getByText('login page')).toBeVisible();
});

test('redirect to a custom 404 page', async ({ page, mount }) => {
  const component = await mount(App);
  await page.goto('/route-that-does-not-exist');
  await expect(component.getByText('not found page')).toBeVisible();
});
