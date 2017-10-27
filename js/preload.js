/**
 * 图片预加载
 */

(function($){
    function PreLoad(imgs,options){
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({},PreLoad.DEFAULTS,options);


        if(this.opts.order == 'ordered'){
            this._oredered();
        }else{
            this._unoredered();
        }
    }

    PreLoad.DEFAULTS = {
        order:'unoredered', //默认情况下使用无序预加载
        each:null, //每一张图片加载完毕后执行
        all:null //所有图片加载完毕后执行
    };

    PreLoad.prototype._oredered = function(){ //有序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        //有序预加载
        load();
        function load(){

            var imgObj = new Image();

            $(imgObj).on('load error',function(){

                opts.each && opts.each(count);

                if(count >= len){
                    //所以图片已经加载完毕
                    opts.all && opts.all();
                }else{
                    load();
                }

                count ++;
            });
            imgObj.src=imgs[count];
        }
    };

    PreLoad.prototype._unoredered = function(){ //无序加载

        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs,function(i,src){

            if(typeof src != 'string') return;

            var imgObj = new Image();

            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);

                if(count >= len-1){
                    opts.all && opts.all();
                }
                count++;
            });

            imgObj.src = src;
        });
    };

    $.extend({
        preload:function(imgs,opts){
            new PreLoad(imgs,opts)
        }
    })

})(jQuery);

