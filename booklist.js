//book class author,title,isbn

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author=author;
        this.isbn=isbn;
    }
}

//Local Storage to store the books

class Store{
    static getBooks(){
        let books;

        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}

//UI Operations

class UI{
    static displayBooks(){
        const books = Store.getBooks()

        books.forEach((book)=>UI.addBookToList(book))
    }
    static addBookToList(book){
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <a href="#" class="btn btn-danger btn-sm delete">X</a>
        </td>
        `
        list.appendChild(row);
    }
    static clearFields(){

        document.getElementById('title').value = ""
        document.getElementById("author").value = ""
        document.getElementById("isbn").value = ""

    }

    static showAlert(message, className) {

        const div = document.createElement('div')

        div.className = `alert alert-${className}`

        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container')

        const form = document.getElementById("book-form")

        container.insertBefore(div,form)

        // vanish the alert message after a second

        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },1000)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove()
        }
    }
}


//display a book

    document.addEventListener('DOMContentLoaded', UI.displayBooks)

//remove a book

    document.querySelector('#book-list').addEventListener('click', function(e){
        // console.log(e.target)
        UI.deleteBook(e.target)

        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        UI.showAlert('Book is Removed', 'success')
    })

//adding a book

    document.addEventListener('submit', function(e){
        e.preventDefault();

    //get form values

    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    if(title == "" || author == "" || isbn == ""){
        UI.showAlert('Please fill all the fields', 'danger')
    }
    else{
        const book = new Book(title,author,isbn)
        
        UI.addBookToList(book)

        Store.addBook(book)

        UI.showAlert('Book Sucessfully Added', 'success')
    }

    UI.clearFields()

})
