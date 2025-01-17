#pragma strict
var levelName : String;
var blackTexture : Texture;
var alpha : float = 1;

private var fadeout : boolean = false;
private var fadein : boolean = false;
var disableOnFadeout : boolean = false;

function Start () {
	NotificationCenter.DefaultCenter().AddObserver(this, "FadeOut");
}

function FadeOut(){
	Debug.Log("FADEOUT");
	//disableOnFadeout = true;
	fadeout = true;
}

function Update () {
	if(fadeout){
		alpha -= Mathf.Clamp01(Time.deltaTime / 5);
		if(alpha < 0){
			fadeout = false;
			if(disableOnFadeout){
				gameObject.active = false;
			}
		}
	}else if(fadein){
		alpha += Mathf.Clamp01(Time.deltaTime / 5);
		if(alpha > 1){
			fadein = false;
			Application.LoadLevel(levelName);
		}
	}
}

function OnGUI(){
	GUI.color = new Color(0, 0, 0, alpha);
	GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height ), blackTexture );
}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		//Player entered
		
		NotificationCenter.DefaultCenter().PostNotification(this, "ChangeLevel",0);
		fadein = true;
	}
    Debug.Log("TAG=" + other.tag);
}