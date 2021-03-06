var images;
var timeStrings;
var timerId;
var printedTime;

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
        this.open = false;
        // 生成したパネルをXULのpopupsetに追加
        var popupset = document.getElementById("bswPopupSet");  
        popupset.appendChild(this._panel);  
  
        // パネルの中身のポップアップウィンドウ作る  
        this._popup = document.createElement("vbox");  
        this._popup.className = "bswPopup";  
        this._popup.text = "";  
        this._panel.appendChild(this._popup); 

        // 表示する文字列と画像パスを格納
        images = new Array(24);
        for(var i = 0; i < images.length; ++i)
            {
                images[i] = "chrome://BeSeriousWatch/skin/" + i + ".png";
            }
        timeStringsLine1 = new Array(24);
        timeStringsLine2 = new Array(24);
        timeStringsLine1[0] = "少しは反省するんですよ。";
        timeStringsLine2[0] = "でも次の日には忘れちゃう！";
        timeStringsLine1[1] = "1時です";
        timeStringsLine2[1] = "1時です";
        timeStringsLine1[2] = "我々は最も近代的で、";
        timeStringsLine2[2] = "最も古代的なものでありたい";
        timeStringsLine1[3] = "3時です";
        timeStringsLine2[3] = "3時です";
        timeStringsLine1[4] = "4時です";
        timeStringsLine2[4] = "4時です";
        timeStringsLine1[5] = "日本の夜明けぜよ";
        timeStringsLine2[5] = "";
        timeStringsLine1[6] = "6時です";
        timeStringsLine2[6] = "6時です";
        timeStringsLine1[7] = "7時です";
        timeStringsLine2[7] = "7時です";
        timeStringsLine1[8] = "今日からお前は、";
        timeStringsLine2[8] = "富士山だ！！！！！";
        timeStringsLine1[9] = "9時です";
        timeStringsLine2[9] = "9時です";
        timeStringsLine1[10] = "私は画家になり、";
        timeStringsLine2[10] = "結局ピカソとなった。";
        timeStringsLine1[11] = "11時です";
        timeStringsLine2[11] = "11時です";
        timeStringsLine1[12] = "12時です";
        timeStringsLine2[12] = "12時です";
        timeStringsLine1[13] = "運命よそこをどけ。";
        timeStringsLine2[13] = "俺が通る。";
        timeStringsLine1[14] = "14時です";
        timeStringsLine2[14] = "14時です";
        timeStringsLine1[15] = "15時です";
        timeStringsLine2[15] = "15時です";
        timeStringsLine1[16] = "16時です";
        timeStringsLine2[16] = "16時です";
        timeStringsLine1[17] = "17時です";
        timeStringsLine2[17] = "17時です";
        timeStringsLine1[18] = "18時です";
        timeStringsLine2[18] = "18時です";
        timeStringsLine1[19] = "19時です";
        timeStringsLine2[19] = "19時です";
        timeStringsLine1[20] = "20時です";
        timeStringsLine2[20] = "20時です";
        timeStringsLine1[21] = "芸術は";
        timeStringsLine2[21] = "爆発だ！！！";
        timeStringsLine1[22] = "テンション上がってきた";
        timeStringsLine2[22] = "";
        timeStringsLine1[23] = "俺の体は";
        timeStringsLine2[23] = "ひとつしかないんだぞコラ";
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
                // フェードイン
                this.fadeIn(1);
                // 時刻文字列&画像を生成
                printedTime = new Date();
                this.CreateCurrentTimeLabel();
                this.CreateTimeImage();
                this.CreateTimeString();
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
     * パネルのフェードイン前処理
     * @param: endOpacity 目標透過度
     * @return: なし
     */
    fadeIn: function(endOpacity)
    {
        // フェードイン時間[ms]
        var duration = 100;
        
        // 時間刻み幅[ms]
        var dt = 5;
        
        // 時間刻み幅あたりの透過度増加分
        var incOpacity = dt / duration * endOpacity;
        
        // パネルの透過度を一旦0にセット
        this._panel.style.opacity = 0;

        // 透過度をセットする関数を呼び出し
        this.setOpacity(0, endOpacity, incOpacity, dt);
    },
    
    /**
     * パネルのフェードイン実処理
     * @param: curOpacity 現在透過度
     * @param: endOpacity 目標透過度
     * @param: incOpacity 透過度増加分
     * @param: dt 時間刻み幅
     * @return: なし
     */
    setOpacity: function(curOpacity, endOpacity, incOpacity, dt)
    { 
        if (curOpacity < endOpacity)
            {
                // 現在透過度増加
                curOpacity += incOpacity;
                
                // CSSに反映
                this._panel.style.opacity = curOpacity;
                
                // dt間隔で再帰呼び出し
                setTimeout("popup.setOpacity("+curOpacity+", "+endOpacity+", "+incOpacity+", "+dt+")", dt);
            }
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
        // this.DeleteTimeImage();
        // 時刻文字列の削除
        this.DeleteTimeString();
        // ポップアップウィンドウの削除
        while(elem.firstChild)
            {
                elem.removeChild(elem.firstChild);
            }
    },

    /**
     * 時刻/画像/時刻文字列を表示するラベルを生成する
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
        // 文字列生成
        timeLabelElm.value = this.GetTimeString();
    },

    /**
     * ポップアップウィンドウ内の時刻表示ラベルの文字列更新
     * @note: 1秒間隔で更新の有無を確認する
     * @param: なし
     * @return: なし
     */
    UpdatePopupElements: function()
    {
        // 現在表示中の時刻を取得
        var oldHour = printedTime.getHours();
        // 表示時刻の更新
        printedTime = new Date();
        // 時刻は1秒ごとに更新
        this.CreateCurrentTimeLabel();
        // 時刻が変わったとき
        if(oldHour != printedTime.getHours())
            {
                this.CreateTimeImage();
                this.CreateTimeString();
            }
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
        var timeImageDiv = document.getElementById("timeStrContainer");
        timeImageDiv.style.backgroundImage = "url(" + images[printedTime.getHours()] + ")";
    },

    /**
     * ポップアップウィンドウ内の画像の削除
     * @param: なし
     * @return: なし
     */
    DeleteTimeImage: function()
    {
        var timeImageElm = document.getElementById("timeImage");
        delete timeImageElm.src;
    },

    /**
     * printedTimeに格納されている時刻をhh:mm:ss形式で文字列化する
     * @param: なし
     * @return: hh:mm:ss形式の時刻
     */
    GetTimeString: function()
    {
        // hh:mm:ss形式で時刻表示
        return (("00" + printedTime.getHours()).slice(-2) + 
                ":" +
                ("00" + printedTime.getMinutes()).slice(-2) + 
                ":" +
                ("00" + printedTime.getSeconds()).slice(-2));
    },

    /**
     * 現在時刻を取得し、時刻文字列を生成する
     * @param: なし
     * @return: なし
     */
    CreateTimeString: function()
    {
        var timeStringElm1 = document.getElementById("timeStrLine1");
        var timeStringElm2 = document.getElementById("timeStrLine2");
        timeStringElm1.value = timeStringsLine1[printedTime.getHours()];
        timeStringElm2.value = timeStringsLine2[printedTime.getHours()];
    },

    /**
     * ポップアップウィンドウ内の時刻文字列の削除
     * @param: なし
     * @return: なし
     */
    DeleteTimeString: function()
    {
        var timeStringElm1 = document.getElementById("timeStrLine1");
        var timeStringElm2 = document.getElementById("timeStrLine2");
        delete timeStringElm1.value;
        delete timeStringElm2.value;
    },
};

// Windowロード時にラベルを生成するイベントを追加
window.addEventListener("load", function(e){popup.load(e);}, false);
