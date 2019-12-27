!function (){
    var view=document.querySelector('#myslides')
    var controller={
        view:null,
        swiper:null,
        swiperoPtions:{ loop: true,pagination: {el: '.swiper-pagination'},navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},},
        init:function(view){
         this.view=view
         this.initSwipeer()
        },
        initSwipeer:function(){
            this.swiper = new Swiper (
                this.view.querySelector('.swiper-container'),
               this.swiperoPtions
            )
        },
    }
    controller.init(view)
}.call()
    
   