function getPageno(){
  const param = new URLSearchParams(location.search);
  const pageno = parseInt(param.get('pageno'));

  if(isNaN(pageno))
    return 1;
  else if(pageno<1)
    return 1;
  return pageno;  
}

async function fetch(pageno=1, pagesize=10){
  const api = 'http://sample.bmaster.kro.kr/contacts';
  const url = `${api}?pageno=${pageno}&pagesize=${pagesize}`;
    try{
      return await $.ajax(url);
    }catch(err){
      console.log(err);
      return null;      
    }
}

function printContacts(contacts) {
  const $parent = $('#tbody');
  for (c of contacts) {
      const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
      $parent.append(html);
  }
}

function getPagination({ pageno, pagesize, totalcount, blockSize = 5 }) {

  const countOfPage = Math.ceil(totalcount / pagesize);

  const prev = Math.floor((pageno - 1) / blockSize) * blockSize;
  const start = prev + 1;
  let end = prev + blockSize;
  let next = end + 1;
  if (end >= countOfPage) {
      end = countOfPage;
      next = 0;
  }
  
  return { prev, start, end, next, pageno };
}

function pringPagination({prev, start, end, next, pageno}){
  const $parent = $('pagination');
  if(prev>0){
    const html =`
    <li class = "page-item">
      <a href="reback.html?pageno=${prev}" class="page-link">이전으로</a>
    </li>`;
    $parent.append(html);
  }    
  for(let i=start; i<=end; i++){
    const className = 'page-item';
    if(i===pageno)
      className = 'page-item active'    
    const html =`
    <li class="${classname}">
      <a href="reback.html?pageno=${i}" class="page-link">${i}</a>
    </li>`;
    $parent.append(html);
  }
  if(next>0){
    `<li class = "page-item"><a href="reback.html?pageno=${next}" class="page-link">다음으로</a></li>`;
    $parent.append(html);
  }
}