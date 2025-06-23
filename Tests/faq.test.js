/**
 * @jest-environment jsdom
 */
const { myFunction } = require('./faq.js');
require('./faq.js');

describe('myFunction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle the "show" class on the element with class "explanation"', () => {
    document.body.innerHTML = `<div class="explanation"></div>`;
    const el = document.querySelector('.explanation');
    expect(el.classList.contains('show')).toBe(false);
    myFunction();
    expect(el.classList.contains('show')).toBe(true);
    myFunction();
    expect(el.classList.contains('show')).toBe(false);
  });

  it('should do nothing if there is no ".explanation" element', () => {
    document.body.innerHTML = '';
    expect(() => myFunction()).not.toThrow();
  });

  it('should only toggle the first ".explanation" if multiple exist', () => {
    document.body.innerHTML = `
      <div class="explanation"></div>
      <div class="explanation"></div>
    `;
    const els = document.getElementsByClassName('explanation');
    myFunction();
    expect(els[0].classList.contains('show')).toBe(true);
    expect(els[1].classList.contains('show')).toBe(false);
  });
});

describe('window.onclick handler', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="explanation_drop show">Drop1</div>
      <div class="explanation_drop show">Drop2</div>
      <span class="fa-plus"></span>
    `;
  });

//   it('should remove "show" class from all ".explanation_drop" if click is not on .fa-plus', () => {
//     const drops = document.getElementsByClassName('explanation_drop');
//     const event = new MouseEvent('click', { bubbles: true });
//     Object.defineProperty(event, 'target', { value: document.body, enumerable: true });
//     window.dispatchEvent(event);

//     expect(drops[0].classList.contains('show')).toBe(false);
//     expect(drops[1].classList.contains('show')).toBe(false);
//   });

  it('should not remove "show" class if click is on .fa-plus', () => {
    const drops = document.getElementsByClassName('explanation_drop');
    const faPlus = document.querySelector('.fa-plus');
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: faPlus, enumerable: true });
    window.dispatchEvent(event);

    expect(drops[0].classList.contains('show')).toBe(true);
    expect(drops[1].classList.contains('show')).toBe(true);
  });

  it('should do nothing if there are no ".explanation_drop" elements', () => {
    document.body.innerHTML = '';
    const event = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(event, 'target', { value: document.body, enumerable: true });
    expect(() => window.dispatchEvent(event)).not.toThrow();
  });
});