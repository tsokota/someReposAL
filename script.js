/*--------------------------------------АНИМАЦИЯ------------------------------------------------------------*/
$(window).load(function () {
	var Shft = 158;
	var a = new Array(document.getElementById("P1"), document.getElementById("P2"),
		document.getElementById("P3"), document.getElementById("P4"),
		document.getElementById("P5")); // Получаем обьекты пунктов меню
	a[0].style.left = -Shft + 'px';
	qweqweqwe
	a[1].style.left = -Shft + 'px';
	a[2].style.left = -Shft + 'px';
	a[3].style.left = -Shft + 'px';
	a[4].style.left = -Shft + 'px';
	Animation(a[2], 0, Shft); // пускаем 1й столбец
	setTimeout(function () {
		Animation(a[1], a[4], Shft);
	}, 1000); // пускаем 2й столбец через сек
	setTimeout(function () {
		Animation(a[3], a[0], Shft);
	}, 2000); // пускаем 3й столбец через 2 сек
});

function Animation(M1, M2, Shft) { // Анимация
	var duration = 1000; //  длительность анимации  
	var tick = duration / 50;
	var Start = performance.now(); // старт
	setTimeout(function () {
		var Now = performance.now();
		var progress = (Now - Start) / duration; // Прогресс анимации (0..1)
		if (progress > 1) progress = 1;
		var coordinate = Coordinate(progress); // расчет сдвига елементов
		Draw(coordinate, M1, M2, Shft); // отрисовка
		if (progress < 1) setTimeout(arguments.callee, tick); // рекурсия, если не конец
	}, tick);
}

function Coordinate(progress) { // мат.формула прямолинейного движения с "торможением"
	return Math.pow(progress, 1 / 4)
}

function Draw(coordinate, M1, M2, Shft) { // отрисовка
	M1.style.left = -Shft + coordinate * Shft + 'px';
	if (M2 != 0) M2.style.left = -Shft + coordinate * Shft + 'px'; // 2й элемент (когда он есть)
}
/*--------------------------------------Переадресация-----------------------------------------------------------*/
function referToMaim() {
	setTimeout(function () {
		window.location.href = "./index.php";
	}, 3000);
}
/*--------------------------------------ВАЛИДАЦИЯ-----------------------------------------------------------*/
$(document).on('submit', '#target', function () {
	var re = /^[A-ZА-Я][a-zа-я-’]*[a-zа-я]$/u;
	var B = false;

	var date = $("#date7");
	var myDate = date.val();
	var name = $("#name");
	var sexM = $("#sexM").prop("checked");

	var today = new Date(); // дата сегодня
	var Day = today.getDate();
	var M = today.getMonth();
	var Y = today.getFullYear();

	var myDate = new Date(String(myDate)); // дата введенная

	var IDay = myDate.getDate();

	var IM = myDate.getMonth();
	var IY = myDate.getFullYear();
	var ageCntr = sexM ? 21 : 18; // проверить возрастн. ограничения
	var age = today.getFullYear() - myDate.getFullYear();
	if (today.getMonth() < myDate.getMonth() || (today.getMonth() == myDate.getMonth() && today.getDate() < myDate.getDate())) {
		age--;
	}

	if (isNaN(IDay) || isNaN(IM) || isNaN(IY)) { // если в дате есть неопр. поля
		resetError(date.parent());
		showError(date.parent(), ' Введите дату!');
		B = true;
	} else if (age < ageCntr) {
		resetError(date.parent());
		showError(date.parent(), " Нельзя зарегестрироваться! Возраст меньше " + ageCntr + " лет!");
		B = true;
	} else if (date.parent().hasClass('error'))
		resetError(date.parent());

	if (!re.test(name.val())) { // "плохое" имя
		resetError(name.parent());
		showError(name.parent(), ' Некорректное имя!');
		B = true;
	} else if (name.parent().hasClass('error'))
		resetError(name.parent());

	if (B) {
		return false;
	} // если есть ошибки
	else {
		alert("Регистрация прошла успешно!");
	} // нету ошибок
});

function showError(container, errorMessage) { // показать ошибку
	$(container.children()).css("border-color", "red");
	container.addClass("error");

	var span = $('<span />').addClass('error-message').html(errorMessage);
	container.parent().append(span);
}

function resetError(container) { // удалить ошибку
	$(container.children()).css("border-color", "black");

	container.removeClass("error");
	if (container.parent().children().last().hasClass('error-message')) {
		container.parent().children().last().remove();
	}
}
/*------------------------------------------------------AJAX-----------------------------------------------------------*/
$(document).ready(function () {
	$(".htooltip").mouseover(function () {
		var id = $(this).attr("id");
		$.ajax({
			url: './php/shopMoreInfo.php?req=parse2&id=' + id,
			type: 'GET',
			success: function (response) {
				var res = JSON.parse(response);
				var t = $("#content" + id);
				if (res["errorId"] == "")
					t.html("Производитель: " + res["MANUFACTURER"] + "<br>Серийный номер: " + res["SERNUM"] + "<br>Остаток на складе: " + +res["NUM"] + " шт.");
				else
					t.html(res["errorId"]);
				t.addClass("htooltipspan2");
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert("ОШИБКА! "+thrownError);
			}
		});
	});

	$(".htooltip").mouseleave(function () {
		$("#content" + $(this).attr("id")).removeClass("htooltipspan2");
	});
		
	
	$('#checkAll').click(function(){
		$("input:checkbox[name=scales]").each(function(){
			$(this).prop('checked',true);
		});
	});
	
	$('#deleteAll').click(function(){
		$("input:checkbox[name=scales]").each(function(){
			$(this).prop('checked',false);
		});
	});
	
	$('#invAll').click(function(){
		$("input:checkbox[name=scales]").each(function(){
			$(this).prop('checked',!$(this).prop('checked'));
		});
	});
});



