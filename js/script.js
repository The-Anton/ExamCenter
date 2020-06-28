// intial params
let pdf ;
let canvas;
let isPageRendering;
let  pageRenderingQueue = null;
let canvasContext;
let totalPages;
let currentPageNum = 1;

// events
window.addEventListener('load', function () {
    isPageRendering= false;
    pageRenderingQueue = null;
    canvas = document.getElementById('pdf_canvas');
    canvasContext = canvas.getContext('2d');
    
    initEvents();
    initPDFRenderer();
});

function initEvents() {
    let prevPageBtn = document.getElementById('prev_page');
    let nextPageBtn = document.getElementById('next_page');
    let goToPage = document.getElementById('go_to_page');
    prevPageBtn.addEventListener('click', renderPreviousPage);
    nextPageBtn.addEventListener('click',renderNextPage);
    goToPage.addEventListener('click', goToPageNum);
}

// init when window is loaded
function initPDFRenderer() {
    const url = 'https://firebasestorage.googleapis.com/v0/b/examcentre-6b0a6.appspot.com/o/currentaffairs%2FINSIGHTS%20DAILY%20CURRENT%20AFFAIRS%20%2B%20PIB%20SUMMARY-%206%20June%202020%20-%20INSIGHTSIAS.pdf?alt=media&token=bf549105-44d5-4a2d-83c3-f3445a5d1bdb'; // replace with your pdf location
    // const cMapUrl = '/cmaps/';
    // const cMapPacked = true;
    let option  = { url};
    

    pdfjsLib.getDocument(option).promise.then(pdfData => {
        totalPages = pdfData.numPages;
        let pagesCounter= document.getElementById('total_page_num');
        pagesCounter.textContent = totalPages;

        // assigning read pdfContent to global variable
        pdf = pdfData;
        console.log(pdfData);
        renderPage(currentPageNum);
    });
}

function renderPage(pageNumToRender = 1, scale = 1) {
    isPageRendering = true;
    document.getElementById('current_page_num').textContent = pageNumToRender;
    pdf.getPage(pageNumToRender).then(page => {
        const viewport = page.getViewport({scale :1});
        canvas.height = viewport.height;
        canvas.width = viewport.width;  
        let renderCtx = {canvasContext ,viewport};
        page.render(renderCtx).promise.then(()=> {
            isPageRendering = false;
            if(pageRenderingQueue !== null) { // this is to check of there is next page to be rendered in the queue
                renderPage(pageNumToRender);
                pageRenderingQueue = null; 
            }
        });        
    }); 
}

function renderPageQueue(pageNum) {
    if(pageRenderingQueue != null) {
        pageRenderingQueue = pageNum;
    } else {
        renderPage(pageNum);
    }
}

function renderNextPage(ev) {
    if(currentPageNum >= totalPages) {
        alert("This is the last page");
        return ;
    } 
    currentPageNum++;
    renderPageQueue(currentPageNum);
}

function renderPreviousPage(ev) {
    if(currentPageNum<=1) {
        alert("This is the first page");
        return ;
    }
    currentPageNum--;
    renderPageQueue(currentPageNum);
}

function goToPageNum(ev) {
    let numberInput = document.getElementById('page_num');
    let pageNumber = parseInt(numberInput.value);
    if(pageNumber) {
        if(pageNumber <= totalPages && pageNumber >= 1){
            currentPageNum = pageNumber;
            numberInput.value ="";
            renderPageQueue(pageNumber);
            return ;
        }
    }
        alert("Enter a valide page numer");
}