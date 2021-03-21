(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Login");
            this.set_background("#fffbe6");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_login", this);
            obj._setContents("<ColumnInfo><Column id=\"USER_ID\" type=\"STRING\" size=\"256\"/><Column id=\"USER_PW\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new ImageViewer("ImageViewer_login","612","145","58","56",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("url(\'theme://images/ico_map_03.png\')");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_id","509","ImageViewer_login:25","265","38",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_cssclass("edt_Login");
            obj.set_displaynulltext("아이디");
            obj.set_text("아이디");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_password","509","edt_id:10","265","38",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_cssclass("edt_Login");
            obj.set_displaynulltext("비밀번호");
            obj.set_password("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_login","509","edt_password:25","265","38",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("로그인");
            obj.set_cssclass("btn_Login");
            this.addChild(obj.name, obj);

            obj = new Static("stt_signUp","514","btn_login:20","106","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("회원이 아니신가요?");
            obj.set_cssclass("stt_SignUp");
            this.addChild(obj.name, obj);

            obj = new Button("btn_signUp","719","btn_login:20","50","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("회원가입");
            obj.set_cssclass("btn_SignUp");
            this.addChild(obj.name, obj);

            obj = new Static("stt_line01","509","443","105","1",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_cssclass("stt_Line");
            this.addChild(obj.name, obj);

            obj = new Static("stt_line02","669","443","105","1",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_cssclass("stt_Line");
            this.addChild(obj.name, obj);

            obj = new Static("stt_or","635","433","12","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("or");
            obj.set_cssclass("stt_Or");
            this.addChild(obj.name, obj);

            obj = new Button("btn_kakao","509","stt_line01:25","265","38",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("카카오 계정으로 로그인");
            obj.set_cssclass("btn_Kakao");
            this.addChild(obj.name, obj);

            obj = new Button("btn_google","509","532","265","38",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("Google 계정으로 로그인");
            obj.set_cssclass("btn_Google");
            this.addChild(obj.name, obj);

            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("login_form.xfdl", function() {
        /*
        ___________________________________________________________________________________________________
           @업무구분   :   시스템 - 업무 - 업무세부
           @작성자     :   이원모
           @작성일     :   2021.03.20
           @화면개요   :   로그인폼
        ___________________________________________________________________________________________________
           @수정이력   :
              수정일      |      수정자      |      수정내역
           -----------------------------------------------------------------------------------------------
        ___________________________________________________________________________________________________
        */
        //_________________________________________________________________________________________________
        //
        //      [ PART 1 ]
        //      form 전역변수 선언 및 초기화(폼로드, 유효성, 콤보 설정)
        //_________________________________________________________________________________________________
        var FORM = this;
        // 폼로드
        this.form_onload = function() {

        }
        //_________________________________________________________________________________________________
        //
        //      [ PART 2 ]
        //      CRUD 트랜잭션
        //_________________________________________________________________________________________________
        //로그인 트랜잭션
        this.fn_search = function() {
        	if(this.edt_id.value == undefined || this.edt_id.value == "" || this.edt_password.value == undefined || this.edt_password.value == "") {
        		this.alert("아이디 또는 패스워드를 입력해주세요.")
        	} else {
        		this.ds_login.addRow()
        		this.ds_login.setColumn(this.ds_login.rowposition, "USER_ID", this.edt_id.value);
        		this.ds_login.setColumn(this.ds_login.rowposition, "USER_PW", this.edt_password.value);

        		trace(this.ds_login.getColumn(this.ds_login.rowposition, "USER_ID"));
        		trace(this.ds_login.getColumn(this.ds_login.rowposition, "USER_PW"));

        		var id = "search";
        		var url = "/test.jsp";
        		var reqDs = "";
        		var respDs = "ds_login=ds_login";
        		var args = "";
        		var callback = "received";

        		this.transaction(id, url, reqDs, respDs, args, callback);
        	}
        }
        //_________________________________________________________________________________________________
        //
        //      [ PART 3 ]
        //      사용자 정의 함수
        //_________________________________________________________________________________________________

        //_________________________________________________________________________________________________
        //
        //      [ PART 4 ]
        //      Callback 함수
        //_________________________________________________________________________________________________
        //로그인 콜백
        this.received = function(id, code, message) {
        	if (code == 0) {
        	  this.alert(this.ds_login.rowcount + " numbers of data have been found.");
        	  trace(this.ds_login.rowcount + " numbers of data have been found.");
        	} else {
        	  this.alert("Error["+code+"]:"+message);
        	  trace("Error["+code+"]:"+message);
        	}
        }
        //_________________________________________________________________________________________________
        //
        //      [ PART 5 ]
        //      Component의 Event
        //_________________________________________________________________________________________________
        //버튼 이벤트
        this.Button_onclick = function(obj,e) {
        	this.fn_search();
        };
        //edit 이벤트
        this.Edit_onkeyup = function(obj,e) {
        	if(e.keycode != 13) return;
        	switch(obj.name) {
        	case "edt_id" :
        		this.fn_search();
        		break;
        	case "edt_password" :
        		this.fn_search();
        		break;
        	}
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.edt_id.addEventHandler("onkeyup",this.Edit_onkeyup,this);
            this.edt_password.addEventHandler("onkeyup",this.Edit_onkeyup,this);
            this.btn_login.addEventHandler("onclick",this.Button_onclick,this);
        };

        this.loadIncludeScript("login_form.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
