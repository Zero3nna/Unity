#pragma strict
private var timer = 0.0; 
 var bobbingSpeed = 0.05; 
 var bobbingAmount = 0.05; 
 var midpoint = 0; 
 
 function Update () { 
    var waveslice = 0.0; 
    var horizontal = Input.GetAxis("Horizontal"); 
    var vertical = Input.GetAxis("Vertical"); 
    if (Mathf.Abs(horizontal) == 0 && Mathf.Abs(vertical) == 0) { 
       timer = 0.0; 
    } 
    else { 
       waveslice = Mathf.Sin(timer); 
       timer = timer + bobbingSpeed; 
       if (timer > Mathf.PI * 2) { 
          timer = timer - (Mathf.PI * 2); 
       } 
    } 
    if (waveslice != 0) { 
       var translateChange = waveslice * bobbingAmount; 
       var totalAxes = Mathf.Abs(horizontal) + Mathf.Abs(vertical); 
       totalAxes = Mathf.Clamp (totalAxes, 0.0, 1.0); 
       translateChange = totalAxes * translateChange; 
       transform.localPosition.y = midpoint + translateChange; 
    } 
    else { 
       transform.localPosition.y = midpoint; 
    } 
 }