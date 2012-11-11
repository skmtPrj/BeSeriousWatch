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
        // ウィンドウ未表示
        if(this.open != true)
            {
                // 時刻表示用ラベルを生成
                this._popup.appendChild(this.CreateTimeLabel());
                // ポップアップウィンドウを表示
                var icon = document.getElementById("status-bar");
                this._panel.openPopup(icon, "before_end", 0, 0, false, false);
                // 時刻文字列&画像を生成
                this.CreateCurrentTimeLabel();
                this.CreateTimeImage();
                // タイマーイベントのセット
                var popupObj = this;
                timerId = window.setInterval(function(){popupObj.UpdatePopupElements();}, 1000);
            }
        else
            {  
                // ポップアップウィンドウを非表示にする
                this._panel.hidePopup();  
                // 時刻表示用ラベルを破棄
                this.DeleteAppendElement(this._popup);
                // タイマーイベントをクリア
                window.clearInterval(timerId);
            }  
        
        // ウィンドウの表示状態を更新
        this.open = !(this.open);
    },


    /**
     * 動的に追加されたエレメントの削除
     * @param: なし
     * @return: なし
     */
    DeleteAppendElement: function(elem)
    {
        // 時間ラベルの削除
        this.DeleteCurrentTimeLabel();

        // 時間画像の削除
        this.DeleteTimeImage();

        // ポップアップウィンドウの削除
        while(elem.firstChild)
            {
                elem.removeChild(elem.firstChild);
            }
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
     * 現在時刻を取得し、ラベルに貼付ける
     * @param: なし
     * @return: なし
     */
    CreateCurrentTimeLabel: function()
    {
        var timeLabelElm = document.getElementById("timeLabel");
        timeLabelElm.value = new Date().toLocaleTimeString();
    },

    /**
     * ポップアップウィンドウ内の時刻表示ラベルの文字列更新
     * @note: 1秒間隔で更新の有無を確認する
     * @param: なし
     * @return: なし
     */
    UpdatePopupElements: function()
    {
        // TODO: 時刻文字列更新が必要かどうかの確認処理実装
        var timeLabelElm = document.getElementById("timeLabel");

        // 時刻文字列更新が必要だった場合
        timeLabelElm.value = new Date().toLocaleTimeString();
    },

    /**
     * ポップアップウィンドウ内の時刻表示ラベルの削除
     * @param: なし
     * @return: なし
     */
    DeleteCurrentTimeLabel: function()
    {
        var timeLabelElm = document.getElementById("timeLabel");
        delete timeLabelElm.value;
    },

    /**
     * 現在時刻を取得し、ラベルに貼付ける
     * @param: なし
     * @return: なし
     */
    CreateTimeImage: function()
    {
        var timeImageElm = document.getElementById("timeImage");
        delete timeImageElm.value;
        timeImageElm.src = "chrome://BeSeriousWatch/skin/bswLabel.png";
    },

    /**
     * ポップアップウィンドウ内の画像の削除
     * @param: なし
     * @return: なし
     */
    DeleteTimeImage: function()
    {
        var timeImageElm = document.getElementById("timeImage");
        delete timeImageElm.value;
    }
};

// Windowロード時にラベルを生成するイベントを追加
window.addEventListener("load", function(e){popup.load(e);}, false);