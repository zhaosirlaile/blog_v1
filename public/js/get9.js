function get9(){
    let ajaxGet = new XMLHttpRequest();
    get9Num ++;
    ajaxGet.open('GET',`/index/GET?baseNumber=${ baseNumber }`);
    ajaxGet.send();
    ajaxGet.onreadystatechange= function(){
        if (ajaxGet.readyState === 4 && ajaxGet.status === 200) {
            if (document.querySelector('.section-btn')) {
                document.querySelector('.section-btn').remove();
            }
            baseNumber += 9;
            let ajaxList = JSON.parse(ajaxGet.responseText);
            let typeList = {
                'CSS' : 'icon-css',
                'HTML' : 'icon-html',
                'Node' : 'icon-node',
                'JS' : 'icon-logo-javascript',
                'MySql' : 'icon-mysql',
                'Linux' : 'icon-linux',
                'Vue' :'icon-vuejs',
                '个人博客搭建': 'icon-zuopin',
                'React' : 'icon-react',
                'Angular' : 'icon-angular',
                'Mongodb' : 'icon-mongodb'
            }
            for (let i = 0 ; i < ajaxList.length; i++) {
                let myDom = document.createElement('div');
                myDom.classList.add('item');
                if (get9Num % 2 === 1) {
                    if (i % 2 === 0) {
                        myDom.innerHTML = `
                                    <div class="left" style="color:#0092FF">
                                        <div class="thing" data-ahref=${ ajaxList[i].aHref } style="border:2px solid #0092FF">
                                            <div class="thing-left" >
                                                <img src="${ ajaxList[i].aImg }" alt="图片">
                                                <div class="lean">
                                                    <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                </div>
                                            </div>
                                            <div class="thing-right">
                                                <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                <p class="describe">${ ajaxList[i].aDescribe }</p>
                                                <div>
                                                    <p class="article-type"><span class="iconfont ${ typeList[ajaxList[i].aType] }"></span></p>
                                                    <p class="see-number">浏览了${ ajaxList[i].aNumber }次</p>
                                                </div>
                                            </div>
                                            <div class='point-left' style="color:#0092FF">
    
                                            </div>
                                            <div class='point-right'>
    
                                            </div>
                                        </div>
                                        <div class="circle" style="color:#0092FF">
                                            <div class="in-circle" style="color:#0092FF"></div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <p class="alone-font"><span class="day">${ ajaxList[i].aTime.substring(0,10) }</span><span class="time">${ ajaxList[i].aTime.substring(11,19) }</span></p>
                                    </div>`;
                    } else {
                        myDom.innerHTML = `
                                    <div class="left">
                                        <p class="alone-font"><span class="day">${ ajaxList[i].aTime.substring(0,10) }</span><span class="time">${ ajaxList[i].aTime.substring(11,19) }</span></p>
                                    </div>
                                    <div class="right"  style="color: #0092FF">
                                        <div class="thing"  data-ahref=${ ajaxList[i].aHref }  style="border:2px solid #0092FF">
                                            <div class="thing-left" >
                                                <img src="${ ajaxList[i].aImg }" alt="图片">
                                                <div class="lean">
                                                    <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                </div>
                                            </div>
                                            <div class="thing-right">
                                                <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                <p class="describe">${ ajaxList[i].aDescribe }</p>
                                                <div>
                                                    <p class="article-type"><span class="iconfont ${ typeList[ajaxList[i].aType] }"></span></p>
                                                    <p class="see-number">浏览了${ ajaxList[i].aNumber }次</p>
                                                </div>
                                            </div>
                                            <div class='point-right' style="border-right-color:#0092FF">
                                            </div>
                                            <div class='point-left' >
    
                                            </div>
    
                                        </div>
                                        <div class="circle" style="border-color:#0092FF">
                                            <div class="in-circle" style="background:#0092FF"></div>
                                        </div>
                                    </div>
                                </div>`
                    }
                } else {
                    if (i % 2 === 1) {
                        myDom.innerHTML = `
                                    <div class="left" style="color:#0092FF">
                                        <div class="thing" data-ahref=${ ajaxList[i].aHref } style="border:2px solid #0092FF">
                                            <div class="thing-left" >
                                                <img src="${ ajaxList[i].aImg }" alt="图片">
                                                <div class="lean">
                                                    <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                </div>
                                            </div>
                                            <div class="thing-right">
                                                <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                <p class="describe">${ ajaxList[i].aDescribe }</p>
                                                <div>
                                                    <p class="article-type"><span class="iconfont ${ typeList[ajaxList[i].aType] }"></span></p>
                                                    <p class="see-number">浏览了${ ajaxList[i].aNumber }次</p>
                                                </div>
                                            </div>
                                            <div class='point-left' style="border-left-color:#0092FF">
    
                                            </div>
                                            <div class='point-right'>
    
                                            </div>
                                        </div>
                                        <div class="circle" style="border-color:#0092FF">
                                            <div class="in-circle" style="background:#0092FF"></div>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <p class="alone-font"><span class="day">${ ajaxList[i].aTime.substring(0,10) }</span><span class="time">${ ajaxList[i].aTime.substring(11,19) }</span></p>
                                    </div>`;
                    } else {
                        myDom.innerHTML = `
                                    <div class="left">
                                        <p class="alone-font"><span class="day">${ ajaxList[i].aTime.substring(0,10) }</span><span class="time">${ ajaxList[i].aTime.substring(11,19) }</span></p>
                                    </div>
                                    <div class="right"  style="color: #0092FF">
                                        <div class="thing"  data-ahref=${ ajaxList[i].aHref }  style="border:2px solid #0092FF">
                                            <div class="thing-left" >
                                                <img src="${ ajaxList[i].aImg }" alt="图片">
                                                <div class="lean">
                                                    <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                </div>
                                            </div>
                                            <div class="thing-right">
                                                <h2 class="title">${ ajaxList[i].aTitle }</h2>
                                                <p class="describe">${ ajaxList[i].aDescribe }</p>
                                                <div>
                                                    <p class="article-type"><span class="iconfont ${ typeList[ajaxList[i].aType] }"></span></p>
                                                    <p class="see-number">浏览了${ ajaxList[i].aNumber }次</p>
                                                </div>
                                            </div>
                                            <div class='point-right' style="border-right-color:#0092FF">
                                            </div>
                                            <div class='point-left' >
    
                                            </div>
    
                                        </div>
                                        <div class="circle" style="border-color:#0092FF">
                                            <div class="in-circle" style="background:#0092FF"></div>
                                        </div>
                                    </div>
                                </div>`
                    }
                }

                document.querySelector('section').appendChild(myDom);
            }
            if (ajaxList < 9) {
                let lastDom = document.createElement('p');
                lastDom.innerHTML = '到底了'
                document.querySelector('section').appendChild(lastDom);
            } else {
                addBtn();
                document.querySelector('.section-btn').children[0].onclick = function () {
                    addLading();
                }
            }			
            document.querySelector('section').classList.add('index-movein');
            let thingList = document.querySelector('section').querySelectorAll('.thing')
            for (let i = 0; i < thingList.length; i ++) {
                thingList[i].onclick = function(){
                    location.href = thingList[i].getAttribute('data-ahref');
                }
            }
        }
    }

}


function addBtn() {
    let btn = document.createElement('div');
    btn.classList.add('section-btn');
    btn.innerHTML = `<a>加载更多</a>`
    document.querySelector('section').appendChild(btn);
}
function addLading () {
    let btn = document.createElement('div');
    btn.classList.add('spinner');
    btn.innerHTML = `
        <div class="spinner-container container1">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
    `
    document.querySelector('.section-btn').children[0].remove();
    document.querySelector('.section-btn').appendChild(btn);
    get9()
}