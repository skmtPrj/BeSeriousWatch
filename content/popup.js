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
    onClickStatusbarIcon: function()
    {  
        // ウィンドウ表示済み
        if(this.open != true)
            {
                // 時刻表示用ラベルを生成
                this._popup.appendChild(this.CreateTimeLabel());

                var icon = document.getElementById("status-bar");
                this._panel.openPopup(icon, "before_end", 0, 0, false, false);

                this.SetCurrentTime();
                this.SetTimeImage();
            }
        else
            {  
                this._panel.hidePopup();  

                // 時刻表示用ラベルを破棄
                this.DestroyAppendElement(this._popup);
            }  
        
        // ウィンドウの表示状態を更新
        this.open = !(this.open);
    },

    /**
     * 時刻を表示するラベルを生成する
     * @param: なし
     * @return: ラベルエレメント
     */
    CreateTimeLabel: function()
    {
        var elem = document.createElement("vbox");
        elem.className = "bswPopupTimeLabel";
        return elem;
    },

    /**
     * 動的に追加されたエレメントの削除
     * @param: なし
     * @return: なし
     */
    DestroyAppendElement: function(elem)
    {
        // 時間ラベルの削除
        var timeLabelElm = document.getElementById("timeLabel");
        delete timeLabelElm.value;

        // 時間画像の削除
        var timeImageElm = document.getElementById("timeImage");
        delete timeImageElm.value;

        // ポップアップウィンドウの削除
        while(elem.firstChild)
            {
                elem.removeChild(elem.firstChild);
            }
    },

    /**
     * 現在時刻を取得し、ラベルに貼付ける
     * @param: なし
     * @return: なし
     */
    SetCurrentTime: function()
    {
        var timeLabelElm = document.getElementById("timeLabel");
        delete timeLabelElm.value;
        timeLabelElm.value = new Date().toLocaleTimeString();
    },


    /**
     * 現在時刻を取得し、ラベルに貼付ける
     * @param: なし
     * @return: なし
     */
    SetTimeImage: function()
    {
        var timeImageElm = document.getElementById("timeImage");
        delete timeImageElm.value;
        timeImageElm.src = "chrome://BeSeriousWatch/skin/bswLabel.png";
    }
};

// Windowロード時にラベルを生成するイベントを追加
window.addEventListener("load", function(e){popup.load(e);}, false);