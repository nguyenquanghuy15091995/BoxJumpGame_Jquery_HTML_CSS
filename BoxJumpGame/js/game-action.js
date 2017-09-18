$(document).ready(function(){

	/* initialization. */
	$(window).scroll(function() {
		scroll(0,0);
	});
	$("#btnPlay").html('Play');
	$("#btnJump").html('Jump');
	$("#btnJump").hide();
	$("#text-message-obj").html('Press spacebar or "Jump" button to jump');
	var is_play_game = false;
	var count;
	
	/* Main menu Sound. */
	var sound_mainmenu = new Audio("sound/mainmenu.mp3");
	sound_mainmenu.loop = true;
	sound_mainmenu.play();
	
	/* Jump sound. */
	var sound_jump = new Audio("sound/jump_sound.mp3");
	sound_jump.loop = false;
	
	/* Lose sound. */
	var sound_lose = new Audio("sound/lose_sound.mp3");
	sound_lose.loop = false;
	
	/* Button play event. */
	$("#btnPlay").click(function(){
		count = 3;
		$("#count-down-obj").html(count);
		$("#count-down-obj").show();
		$("#btnPlay").hide();
		$("#text-message-obj").hide();
		jump_times = 0;
		time_pass = 0;
		$("#time-out-obj").html('Time: ' + time_pass + 's');
		$("#jump-times-obj").html('Jump times: ' + jump_times);
		$("#btnJump").show();
		sound_mainmenu.pause();
	});
	
	/* Count down before play. */
	setInterval(function () {
		$("#count-down-obj").html(count);
		if(count == 0) {
			$("#count-down-obj").html('Start');
		}
		if(count == -1) {
			is_play_game = true;
			$("#count-down-obj").hide();
		}
		count--;
	}, 1000);
	
	/* Main character event. */ 
	var jump_times = 0;
	var rock_offset = $('#rock-obj').offset();
    $("body").keydown(function(e){
		if(is_play_game) {
			if(e.keyCode == 32){
				if ($("#main-obj").is(':animated'))
				{
					return false;
				}
				jump_times++;
				sound_jump.play();
				$("#jump-times-obj").html('Jump times: ' + jump_times);
				$("#main-obj").animate({top: '-=28%'});
				$("#main-obj").animate({top: '+=28%'});	
			}
		}
    });
	
	/* Jump button event. */
	$("#btnJump").mousedown(function() {
		if(is_play_game) {
			
			if ($("#main-obj").is(':animated'))
			{
				return false;
			}
			jump_times++;
			sound_jump.play();
			$("#jump-times-obj").html('Jump times: ' + jump_times);
			$("#main-obj").animate({top: '-=28%'});
			$("#main-obj").animate({top: '+=28%'});
		}
	});
	
	/* Rock event. */ 
	var time_pass = 0;
	var arr_time_out = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 2000, 2200, 2500];
	var time_out = 1000;
	
	var action = function() {
		if(is_play_game) {
			$("#rock-obj").animate({left: '5%'}, arr_time_out[Math.floor(Math.random() * (arr_time_out.length - 1))]);
			$("#rock-obj").animate({left: '90%'}, arr_time_out[Math.floor(Math.random() * (arr_time_out.length - 1))]);
			time_pass++;
			$("#time-out-obj").html('Time: ' + time_pass + 's');
		}
		setTimeout(action, time_out);
	};
	action();
	
	/* Collision event. */
	var check_time_out = 30;
	var checkCollisionPlay = function() {
		if(is_play_game){
			if(collision($("#rock-obj"),$("#main-obj"))) {
				is_play_game = false;
				$("#btnPlay").show();
				$("#btnPlay").html('Restart');
				$("#rock-obj").finish();
				$("#text-message-obj").html('Game Over! :v');
				$("#text-message-obj").show();
				$("#btnJump").hide();
				sound_jump.pause();
				sound_lose.play();
			}
		}
		setTimeout(checkCollisionPlay, check_time_out);
	};
	checkCollisionPlay();
	
	/* Function check collistion of 2 div. */
	function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

});