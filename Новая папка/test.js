const { JSDOM } = require('jsdom');
const fs = require('fs');

describe('Книжный магазин', () => {
  let dom;
  let window;
  let document;

  beforeAll(() => {
    // Инициализация DOM перед всеми тестами
    const html = fs.readFileSync('./каталог.html', 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;
    document = window.document;

    window.localStorage = {
      store: {},
      getItem(key) { return this.store[key] || null; },
      setItem(key, value) { this.store[key] = value; },
      clear() { this.store = {}; }
    };

    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
  });

  beforeEach(() => {

    window.localStorage.clear();
    jest.clearAllMocks();
    
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookGenre').value = '';
    document.getElementById('bookPrice').value = '';
    window.books = {};
  });
  test('Добавление новой книги', () => {

    document.getElementById('bookTitle').value = 'Новая книга';
    document.getElementById('bookAuthor').value = 'Автор';
    document.getElementById('bookGenre').value = 'Фантастика';
    document.getElementById('bookPrice').value = '500₽';
    window.addBook();
    const storedBooks = JSON.parse(window.localStorage.getItem('books'));
    expect(Object.keys(storedBooks).length).toBe(1);
    const bookKey = Object.keys(storedBooks)[0];
    expect(storedBooks[bookKey]).toEqual({
      title: 'Новая книга',
      author: 'Автор',
      genre: 'Фантастика',
      price: '500₽',
      availability: 'В наличии'
    });
    expect(window.alert).toHaveBeenCalledWith('Книга успешно добавлена!');
    expect(document.getElementById('bookTitle').value).toBe('');
  });

  test('Удаление существующей книги', () => {
    const testBook = {
      title: 'Тестовая книга',
      author: 'Автор',
      genre: 'Детектив',
      price: '300₽',
      availability: 'В наличии'
    };
    window.localStorage.setItem('books', JSON.stringify({ 'test-id': testBook }));
    window.deleteBook('test-id');
    expect(JSON.parse(window.localStorage.getItem('books'))).toEqual({});
    expect(window.confirm).toHaveBeenCalledWith('Вы уверены что хотите удалить книгу?');
  });
});
