//Book Class: Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// UI class: Handle UI Tasks
class UI{
    static displayBooks(){
        const books=Store.getBooks();
        books.forEach(book =>UI.addBookToList(book));
        console.log(books);
    }
    static addBookToList(book)
    {
        const list=document.querySelector(".book-list");
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger delete btn-sm">X</a></td>`;
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector("#title").value="";
        document.querySelector("#author").value="";
        document.querySelector("#isbn").value="";
    }
    static deleteBookFromList(e){
        if(e.classList.contains("delete")==true){
       e.parentNode.parentNode.remove();
        }
       else 
       return;
    }
};
// Store class: Handles Storage
class Store{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('books')==null)
        {
            books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem('books'));
        }
    return books;
    }
    static addBook(book){
        let books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        let books=Store.getBooks();
        books.forEach((e,index)=>{
            if(e.isbn==isbn)
            books.splice(index,1);
        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks);
//Event: Add a Book
document.querySelector("#bookform").addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(Store.getBooks());
    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const isbn=document.querySelector("#isbn").value;
    const book=new Book(title,author,isbn);
    // Adding book to list
    UI.addBookToList(book);
    // Clearing fields
    UI.clearFields();
    // Adding book to local Storage
    Store.addBook(book);
});
//Event: Remove a Book
document.querySelector(".book-list").addEventListener("click",(e)=>
{
    UI.deleteBookFromList(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
}
);