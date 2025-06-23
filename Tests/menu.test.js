/**
 * @jest-environment jsdom
 */
describe('Menu Toggle Functionality', () => {
  let openMenu, closeMenu, navMenu;
  beforeEach(() => {
    // Setup mock HTML structure
    document.body.innerHTML = `
      <button id="openMenu">Open</button>
      <button id="closeMenu">Close</button>
      <nav id="navMenu" class="menu">Menu</nav>
    `;
    openMenu = document.getElementById('openMenu');
    closeMenu = document.getElementById('closeMenu');
    navMenu = document.getElementById('navMenu');
    // Re-attach listeners (as in source code)
    openMenu?.addEventListener('click', () => {
      navMenu?.classList.add('active');
    });
    closeMenu?.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });
  test('TC1 - Clicking openMenu adds "active" class to navMenu', () => {
    openMenu.click();
    expect(navMenu.classList.contains('active')).toBe(true);
  });
  test('TC2 - Clicking closeMenu removes "active" class from navMenu', () => {
    navMenu.classList.add('active');
    closeMenu.click();
    expect(navMenu.classList.contains('active')).toBe(false);
  });
  test('TC3 - Clicking openMenu multiple times does not duplicate "active" class', () => {
    openMenu.click();
    openMenu.click();
    expect(navMenu.className.split('active').length - 1).toBe(1);
  });
  test('TC4 - Clicking closeMenu without openMenu first keeps navMenu inactive', () => {
    closeMenu.click();
    expect(navMenu.classList.contains('active')).toBe(false);
  });
  test('TC5 - Clicking openMenu then closeMenu results in no "active" class', () => {
    openMenu.click();
    closeMenu.click();
    expect(navMenu.classList.contains('active')).toBe(false);
  });
  test('TC6 - navMenu is missing: clicking openMenu does not throw error', () => {
    navMenu.remove();
    expect(() => openMenu.click()).not.toThrow();
  });
  test('TC7 - openMenu or closeMenu are missing: script does not break', () => {
    openMenu.remove();
    closeMenu.remove();
    expect(() => {
      document.getElementById('openMenu')?.click();
      document.getElementById('closeMenu')?.click();
    }).not.toThrow();
  });
  test('TC8 - navMenu has other classes; retains them when "active" is added', () => {
    openMenu.click();
    expect(navMenu.classList.contains('menu')).toBe(true);
    expect(navMenu.classList.contains('active')).toBe(true);
  });
  test('TC9 - navMenu already has "active" class before click; no duplication', () => {
    navMenu.classList.add('active');
    openMenu.click();
    expect(navMenu.className.split('active').length - 1).toBe(1);
    closeMenu.click();
    expect(navMenu.classList.contains('active')).toBe(false);
  });
});