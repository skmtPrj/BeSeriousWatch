var popup = {
    /**
     * ブラウザ起動時にパネルを生成
     * @param: なし
     */
    load: function()
    {
        // パネル作成
        this._panel = document.createElement("panel");
        // パネルの属性設定
        this._panel.setAttribute("noautofocus", "true");
        this._panel.setAttribute("noautohide", "true");
        this._panel.id = "bswPanel";

        // 生成したパネルをXULのpopupsetに追加
        var popupset = document.getElementById("bswPopupSet");  
        popupset.appendChild(this._panel);  
  
        // パネルの中身のポップアップウィンドウ作る  
        this._popup = document.createElement("vbox");  
        this._popup.className = "bswPopup";  
        this._popup.text = "";  
        this._panel.appendChild(this._popup); 
    },

    /**
     * ポップアップウィンドウの表示
     * @param: なし
     * @note: ウィンドウ表示済み: ウィンドウを隠す / ウィンドウ未表示: ウィンドウを表示
     */
    onClickStatusbarIcon: function(){  
        // ウィンドウ表示済み
        if(this.open != true)
            {
                var icon = document.getElementById("status-bar");     // xul側  
                this._panel.style.opacity = 0;
                this._panel.openPopup(icon, "before_end", 0, 0, false, false);
                this.fadeIn(0);
            }
        else
            {  
                this._panel.hidePopup();  
            }
        
        // ウィンドウの表示状態を更新
        this.open = !(this.open);
    },
    
    fadeIn: function(lastOp){
        if (lastOp < 1){
            duration = 300;
            dt = 10;
            lastOp += dt / duration;
            this.setOpacity(lastOp);
            setTimeout("popup.fadeIn("+lastOp+")", dt);
        }
    },
    
    setOpacity: function(level){
        this._panel.style.opacity = level;
    },

    /**
     * デバッグ用
     */
    alert: function()
    {
        window.alert("hoge fuga");
    }
};

// Windowロード時にラベルを生成するイベントを追加
window.addEventListener("load", function(e){popup.load(e);}, false); 