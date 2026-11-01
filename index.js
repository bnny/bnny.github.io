console.log(window.data);

class Expectation {
	p_3_plus_ones = 0;
	p_3_plus_twos = 0;
	p_3_plus_threes = 0;
	p_3_plus_fours = 0;
	p_3_plus_fives = 0;
	p_3_plus_sixes = 0;
	p_long_straight = 0;
	p_short_straight = 0;
	p_three_of_a_kind = 0;
	p_good_three_of_a_kind = 0;
	p_four_of_a_kind = 0;
	p_good_four_of_a_kind = 0;
	p_kniffel = 0;
	p_full_house = 0;
	p_good_chance = 0;
};

class Result {
	ones = 0;
	twos = 0;
	threes = 0;
	fours = 0;
	fives = 0;
	sixes = 0;
};

function result_to_str(result) {
	return `${result.ones},${result.twos},${result.threes},${result.fours},${result.fives},${result.sixes}`
}

function result_from_str(str) {
	var r = new Result();
	try {
		var splits = str.split(',');
		r.ones = Number(splits[0]);
		r.twos = Number(splits[1]);
		r.threes = Number(splits[2]);
		r.fours = Number(splits[3]);
		r.fives = Number(splits[4]);
		r.sixes = Number(splits[5]);
	} catch (error) { console.log(error); }
	return r;
}

/*
    printf("[%.3f,", fmt_percent(e.p_3_plus_ones));
    printf("%.3f,", fmt_percent(e.p_3_plus_twos));
    printf("%.3f,", fmt_percent(e.p_3_plus_threes));
    printf("%.3f,", fmt_percent(e.p_3_plus_fours));
    printf("%.3f,", fmt_percent(e.p_3_plus_fives));
    printf("%.3f,", fmt_percent(e.p_3_plus_sixes));
    printf("%.3f,", fmt_percent(e.p_three_of_a_kind));
    printf("%.3f,", fmt_percent(e.p_good_three_of_a_kind));
    printf("%.3f,", fmt_percent(e.p_four_of_a_kind));
    printf("%.3f,", fmt_percent(e.p_good_four_of_a_kind));
    printf("%.3f,", fmt_percent(e.p_full_house));
    printf("%.3f,", fmt_percent(e.p_short_straight));
    printf("%.3f,", fmt_percent(e.p_long_straight));
    printf("%.3f,", fmt_percent(e.p_kniffel));
    printf("%.3f]", fmt_percent(e.p_good_chance));
*/
function expectation_from_array(arr) {
	var e = new Expectation();
	try {
		e.p_3_plus_ones = arr[0];
		e.p_3_plus_twos = arr[1];
		e.p_3_plus_threes = arr[2];
		e.p_3_plus_fours = arr[3];
		e.p_3_plus_fives = arr[4];
		e.p_3_plus_sixes = arr[5];
		e.p_three_of_a_kind = arr[6];
		e.p_good_three_of_a_kind = arr[7];
		e.p_four_of_a_kind = arr[8];
		e.p_good_four_of_a_kind = arr[9];
		e.p_full_house = arr[10];
		e.p_short_straight = arr[11];
		e.p_long_straight = arr[12];
		e.p_kniffel = arr[13];
		e.p_good_chance = arr[14];
	} catch (error) { console.log(error); }
	return e;
}

function expectation_name_to_array_idx(name) {
	switch (name) {
		case "p_3_plus_ones": return 0;
		case "p_3_plus_twos": return 1;
		case "p_3_plus_threes": return 2;
		case "p_3_plus_fours": return 3;
		case "p_3_plus_fives": return 4;
		case "p_3_plus_sixes": return 5;
		case "p_three_of_a_kind": return 6;
		case "p_good_three_of_a_kind": return 7;
		case "p_four_of_a_kind": return 8;
		case "p_good_four_of_a_kind": return 9;
		case "p_full_house": return 10;
		case "p_short_straight": return 11;
		case "p_long_straight": return 12;
		case "p_kniffel": return 13;
		case "p_good_chance": return 14;
	}
}

function find_subresult(result, rerolls, expectation_name) {
	var str = result_to_str(result);
	var expectation_idx = expectation_name_to_array_idx(expectation_name);
	var percent = window.data[rerolls][str][expectation_idx]
	console.log(result, rerolls, expectation_name, str, expectation_idx, percent);
	for (var ones = 0; ones <= result.ones; ones++) {
		for (var twos = 0; twos <= result.twos; twos++) {
			for (var threes = 0; threes <= result.threes; threes++) {
				for (var fours = 0; fours <= result.fours; fours++) {
					for (var fives = 0; fives <= result.fives; fives++) {
						for (var sixes = 0; sixes <= result.sixes; sixes++) {
							var r = new Result();
							r.ones = result.ones - ones;
							r.twos = result.twos - twos;
							r.threes = result.threes - threes;
							r.fours = result.fours - fours;
							r.fives = result.fives - fives;
							r.sixes = result.sixes - sixes;
							if ((ones + twos + threes + fours + fives + sixes) == 0) {
								continue;
							}
							console.log("sub", result_to_str(r), window.data[rerolls][result_to_str(r)][expectation_idx])
							if (window.data[rerolls][result_to_str(r)][expectation_idx] == percent) {
								console.log("found")
								return r;
							}
						}
					}
				}
			}
		}
	}
	return result;
}

function print_result_dice(result) {
	var str = ""
	for (var ones = 0; ones < result.ones; ones++) {
		str += "&#x2680"
	}
	for (var twos = 0; twos < result.twos; twos++) {
		str += "&#x2681"
	}
	for (var threes = 0; threes < result.threes; threes++) {
		str += "&#x2682"
	}
	for (var fours = 0; fours < result.fours; fours++) {
		str += "&#x2683"
	}
	for (var fives = 0; fives < result.fives; fives++) {
		str += "&#x2684"
	}
	for (var sixes = 0; sixes < result.sixes; sixes++) {
		str += "&#x2685"
	}
	return str;
}

function print_expectation(result) {
	var str = result_to_str(result);
	var e_0_rr = expectation_from_array(window.data[0][str]);
	var e_1_rr = expectation_from_array(window.data[1][str]);
	var e_2_rr = expectation_from_array(window.data[2][str]);
	return `
	<table>
	<thead>
	<tr><th>&nbsp;</th><th style="text-align:center;">1 Wurf</th><th style="text-align:center;">2 W&uuml;rfe</th><th style="text-align: center;">3 W&uuml;rfe</th></tr>
	</thead>
	<tbody>
	<tr>
		<th>3+ Einser</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_ones}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_ones}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_ones}%</td>
	</tr>
	<tr>
		<th>3+ Zweier</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_twos}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_twos}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_twos}%</td>
	</tr>
	<tr>
		<th>3+ Dreier</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_threes}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_threes}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_threes}%</td>
	</tr>
	<tr>
		<th>3+ Vierer</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_fours}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_fours}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_fours}%</td>
	</tr>
	<tr>
		<th>3+ F&uuml;nfer</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_fives}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_fives}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_fives}%</td>
	</tr>
	<tr>
		<th>3+ Sechser</th>
		<td style="text-align:right;">${e_0_rr.p_3_plus_sixes}%</td>
		<td style="text-align:right;">${e_1_rr.p_3_plus_sixes}%</td>
		<td style="text-align:right;">${e_2_rr.p_3_plus_sixes}%</td>
	</tr>
	<tr>
		<th>Dreierpasch</th>
		<td style="text-align:right;">${e_0_rr.p_three_of_a_kind}%</td>
		<td style="text-align:right;">${e_1_rr.p_three_of_a_kind}%</td>
		<td style="text-align:right;">${e_2_rr.p_three_of_a_kind}%</td>
	</tr>
	<tr>
		<th>16+ Dreierpasch</th>
		<td style="text-align:right;">${e_0_rr.p_good_three_of_a_kind}%</td>
		<td style="text-align:right;">${e_1_rr.p_good_three_of_a_kind}%</td>
		<td style="text-align:right;">${e_2_rr.p_good_three_of_a_kind}%</td>
	</tr>
	<tr>
		<th>Viererpasch</th>
		<td style="text-align:right;">${e_0_rr.p_four_of_a_kind}%</td>
		<td style="text-align:right;">${e_1_rr.p_four_of_a_kind}%</td>
		<td style="text-align:right;">${e_2_rr.p_four_of_a_kind}%</td>
	</tr>
	<tr>
		<th>16+ Viererpasch</th>
		<td style="text-align:right;">${e_0_rr.p_good_four_of_a_kind}%</td>
		<td style="text-align:right;">${e_1_rr.p_good_four_of_a_kind}%</td>
		<td style="text-align:right;">${e_2_rr.p_good_four_of_a_kind}%</td>
	</tr>
	<tr>
		<th>Full House</th>
		<td style="text-align:right;">${e_0_rr.p_full_house}%</td>
		<td style="text-align:right;">${e_1_rr.p_full_house}%</td>
		<td style="text-align:right;">${e_2_rr.p_full_house}%</td>
	</tr>
	<tr>
		<th>Kleine Stra&szlig;e</th>
		<td style="text-align:right;">${e_0_rr.p_short_straight}%</td>
		<td style="text-align:right;">${e_1_rr.p_short_straight}%</td>
		<td style="text-align:right;">${e_2_rr.p_short_straight}%</td>
	</tr>
	<tr>
		<th>Gro&szlig;e Stra&szlig;e</th>
		<td style="text-align:right;">${e_0_rr.p_long_straight}%</td>
		<td style="text-align:right;">${e_1_rr.p_long_straight}%</td>
		<td style="text-align:right;">${e_2_rr.p_long_straight}%</td>
	</tr>
	<tr>
		<th>Kniffel</th>
		<td style="text-align:right;">${e_0_rr.p_kniffel}%</td>
		<td style="text-align:right;">${e_1_rr.p_kniffel}%</td>
		<td style="text-align:right;">${e_2_rr.p_kniffel}%</td>
	</tr>
	<tr>
		<th>16+ Chance</th>
		<td style="text-align:right;">${e_0_rr.p_good_chance}%</td>
		<td style="text-align:right;">${e_1_rr.p_good_chance}%</td>
		<td style="text-align:right;">${e_2_rr.p_good_chance}%</td>
	</tr>
	</tbody>
	</table>
`;
}

window.state = new Result();
function update() {
	document.getElementById("expectation").innerHTML = print_expectation(window.state);
	document.getElementById("ones").innerHTML = window.state.ones;
	document.getElementById("twos").innerHTML = window.state.twos;
	document.getElementById("threes").innerHTML = window.state.threes;
	document.getElementById("fours").innerHTML = window.state.fours;
	document.getElementById("fives").innerHTML = window.state.fives;
	document.getElementById("sixes").innerHTML = window.state.sixes;
}

function add(num) {
	switch (num) {
		case (1): {
			window.state.ones += 1;
			window.state.ones = Math.min(5, Math.max(window.state.ones, 0));
			break;
		}
		case (2): {
			window.state.twos += 1;
			window.state.twos = Math.min(5, Math.max(window.state.twos, 0));
			break;
		}
		case (3): {
			window.state.threes += 1;
			window.state.threes = Math.min(5, Math.max(window.state.threes, 0));
			break;
		}
		case (4): {
			window.state.fours += 1;
			window.state.fours = Math.min(5, Math.max(window.state.fours, 0));
			break;
		}
		case (5): {
			window.state.fives += 1;
			window.state.fives = Math.min(5, Math.max(window.state.fives, 0));
			break;
		}
		case (6): {
			window.state.sixes += 1;
			window.state.sixes = Math.min(5, Math.max(window.state.sixes, 0));
			break;
		}
	}
	update();
}

function sub(num) {
	switch (num) {
		case (1): {
			window.state.ones -= 1;
			window.state.ones = Math.min(5, Math.max(window.state.ones, 0));
			break;
		}
		case (2): {
			window.state.twos -= 1;
			window.state.twos = Math.min(5, Math.max(window.state.twos, 0));
			break;
		}
		case (3): {
			window.state.threes -= 1;
			window.state.threes = Math.min(5, Math.max(window.state.threes, 0));
			break;
		}
		case (4): {
			window.state.fours -= 1;
			window.state.fours = Math.min(5, Math.max(window.state.fours, 0));
			break;
		}
		case (5): {
			window.state.fives -= 1;
			window.state.fives = Math.min(5, Math.max(window.state.fives, 0));
			break;
		}
		case (6): {
			window.state.sixes -= 1;
			window.state.sixes = Math.min(5, Math.max(window.state.sixes, 0));
			break;
		}
	}
	update();
}

function reset() {
	window.state = new Result();
	update();
}

update();

