
const params=new URLSearchParams(window.location.search);
const pdfName=params.get('pdf')||'pdf1.pdf';
const pdfPath='pdfs/'+pdfName;

pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

async function loadBook(){
 const pdf=await pdfjsLib.getDocument(pdfPath).promise;
 const pages=[];

 for(let i=1;i<=pdf.numPages;i++){
  const page=await pdf.getPage(i);
  const viewport=page.getViewport({scale:2});

  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d');

  canvas.width=viewport.width;
  canvas.height=viewport.height;

  await page.render({canvasContext:ctx,viewport}).promise;

  const wrapper=document.createElement('div');
  wrapper.className='page';
  wrapper.appendChild(canvas);
  pages.push(wrapper);
 }

 const book=document.getElementById('book');
 pages.forEach(p=>book.appendChild(p));

 const flip=new St.PageFlip(book,{
   width:650,
   height:900,
   size:'stretch',
   showCover:true,
   mobileScrollSupport:true,
   maxShadowOpacity:.5
 });

 flip.loadFromHTML(document.querySelectorAll('.page'));
}

loadBook():
document.getElementById("loader").style.display = "none";
