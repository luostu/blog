!function(){
    var model={
        //获取数据
        init:function(){
            var APP_ID="QxR3Pz1qDII7ihDLs1Ctm5EP-gzGzoHsz"
            var app_Key="c5U0RQ4AGVWNIF9A6itUUnuB"
           var server_URLs="https://qxr3pz1q.lc-cn-n1-shared.com"
           AV.init({appId:APP_ID,appKey:app_Key,serverURLs:server_URLs})//这个前面的key不能改
        },
        fetch:function(){
            var query = new AV.Query('Message');
            return query.find()//promise对象
        },
        save:function(name,content){
            var Message = AV.Object.extend('Message');
             var message = new Message();
             return message.save({//promise对象
                 'name':name,
                 'content':content
             })
        }
    }
    var view=document.querySelector('section.message')
    var Controller={
        view:null,
        model:null,
        messageList:null,
        init:function(view,model){
            this.view=view
            this.model=model
            this.messageList=view.querySelector('#messageList')
            this.form=view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()

        },
        loadMessages:function(){
            this.model.fetch().then(
                (message)=>{
                    let array=message.map((item)=>item.attributes)
                    array.forEach((item) => {
                        let li=document.createElement('li')
                        li.innerText=`${item.name}:${item.content}`
                        this.messageList.appendChild(li)
                        li.classList.add('oneMessage')
                    });
                }
            )

        },
        bindEvents:function(){
        this.form.addEventListener('submit',function(e){
            e.preventDefault()
            this.saveMessage()
        }.bind(this))

        },
        saveMessage:function(){
            let myForm=this.form
            let content=myForm.querySelector('input[name=content]').value
            let name=myForm.querySelector('input[name=name]').value
            this.model.save(name,content).then(function(object){
                let li=document.createElement('li')
                li.innerText=`${object.attributes.name}:${object.attributes.content}`
                let messageList=document.querySelector('#messageList')
                messageList.appendChild(li)
                li.classList.add('oneMessage')
                myForm.querySelector('input[name=content]').value=''
                console.log(object)
            })
           
        }
    }
    Controller.init(view,model)
}.call()

