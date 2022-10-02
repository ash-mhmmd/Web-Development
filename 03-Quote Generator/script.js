const quoteContainer = document.getElementById('quote_container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new_quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// SHOW LOADING
function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

// HIDE LOADING
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// SHOW NEW QUOTES
function newQuote() {
    loading();
    
    // PICK A RANDOM QUOTE FROM APIQUOTES ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    //CHECKING IF AUTHOR FIELD IS NULL/BLANK AND REPLACE WITH 'UNKNOWN'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    
    //CHECKING QUOTE LENGTH TO DETERMINE STYLING
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    
    //SET QUOTE, HIDE LOADER
	quoteText.textContent = quote.text;
    complete();
}

// GET QUOTES FROM API
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();	
        newQuote();							
    } catch (error) {
    }
}

//TWEET QUOTE
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');	//'_blank' sets the link to open in a new tab
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON LOAD
getQuotes();


