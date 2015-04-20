/*
Copyright (C) 2015 Eldar Khalilov, Michal Antkiewicz  <http://gsd.uwaterloo.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

$(document).ready(function(){

	/* DEMO */
		var template = 	'<div class="col-xs-12 col-md-6 test-item">'+
											'<div class="model-viewer">'+
							          '<div class="m-v-header clearfix">'+
							              '<div class="time"></div>'+
							              '<button class="btn btn-primary btn-xs full" data-toggle="modal" data-target=".bs-example-modal-lg">Open</button>'+
							              '<button class="btn btn-primary btn-xs collapseBtn">Collapse All</button>'+
							              '<button class="btn btn-primary btn-xs tab-btn" data-tab="tree">Tree</button>'+
							              '<button class="btn btn-primary btn-xs tab-btn" data-tab="goals">Goals</button>'+
							              '<div class="name"></div>'+ 
							          '</div>'+

							          '<div class="tab active tree cf"><div class="json"></div></div>'+
							          '<div class="tab goals cf"><div class="json"></div></div>'+
							        '</div>'+
							       '</div>';

		$('.tests').each(function(){
			for (var i = 0; i < tests.length; i++) {
				var wrap = $(this),
						testItem = $(template).appendTo(wrap),
						resTree,
						resGoals;

				try {
					resTree = process(tests[i], 'getTopTree');
					testItem.find('.tree .json').JSONView(resTree[0]);
					testItem.find('.time').text(resTree[1] + ' ms.');
					testItem.data('tree', resTree[0]);
				}	
				catch(e) {
					testItem.find('.tree .json').append('<div class="alert alert-danger" role="alert">'+e+'</div>');
				}

				try {
					resGoals = process(tests[i], 'getGoals');
					testItem.find('.goals .json').JSONView(resGoals[0]);
					testItem.data('goals', resGoals[0]);
				}	
				catch(e) {
					testItem.find('.goals .json').append('<div class="alert alert-danger" role="alert">'+e+'</div>');
				}	
							

				testItem.find('.name').text(tests[i]['name']);

			};
		});		        


		$('.model-viewer').each(function(){
				var viewer = $(this),
						processBtn = $(this).find('.process'),
						model = $(this).find('.model-ta'),
						time = $(this).find('.time'),
						collapsBtn = $(this).find('.collapseBtn'),
						openBtn = $(this).find('.full'),
						result = $(this).find('.json');

				processBtn.click(function(e){
					var modelText = model.val();

					if(modelText.length) {
							var json = JSON.parse(modelText);

							var res = process(json, 'getTopTree');



							time.text(res[1] + ' ms.');

							result.JSONView(res[0]);
					}
				});


				collapsBtn.click(function(){
					if($(this).hasClass('is-collapsed')){
						result.JSONView('expand');
						$(this).removeClass('is-collapsed').text('Collapse All');
					} else {
						result.JSONView('collapse');
						$(this).addClass('is-collapsed').text('Expand All');
					}
				});

				openBtn.click(function(){
					var modalJSON = $('<div class="json"></div>');
					var tree = $(this).closest('.test-item').data('tree');
					$('.modal-json').empty().append(modalJSON);
					modalJSON.JSONView(tree);
				});


				/* TABS */
					var tabs = $(this).find('.tab'),
							tabBtns = $(this).find('.tab-btn');

					tabBtns.click(function(){
						tabs.removeClass('active');
						viewer.find('.tab').filter('.'+ $(this).data('tab')).addClass('active');
					});
					
				/* END TABS*/

				
		});

				


    function process(json, func) {
			var a = performance.now(),
					resultJSON;

				var processor = new ClaferProcessor(json);	

				switch(func) {
					case 'getTopTree': {
						resultJSON = processor.getTopClaferTree('root');
						break;
					}

					case 'getGoals' : {
						resultJSON = processor.getGoals();
						break;
					}
				}

				var b = performance.now();

				return [resultJSON, (b - a).toFixed(2)];

				
		}
		
	/* END DEMO*/
	


/* MENU */
	var showLeftPush = $('#showLeftPush'),
			menuLeft = $('#cbp-spmenu-s1'),
			body = $('body');

		showLeftPush.click(function(){
			$(this).toggleClass('active');
			body.toggleClass('cbp-spmenu-push-toright');
			menuLeft.toggleClass('cbp-spmenu-open');
		});

	$('.showTab').click(function(e){
		e.preventDefault();
		var tab = $(this).data('tab');

		$('.tests .tab').removeClass('active').filter('.'+tab).addClass('active');
	});

	$('.collapseAll').click(function(e){
		e.preventDefault();
		$('.collapseBtn:not(".is-collapsed")').trigger('click');
		$('.json').JSONView('collapse');
	});

	$('.expandAll').click(function(e){
		e.preventDefault();
		$('.collapseBtn.is-collapsed').trigger('click');
		$('.json').JSONView('expand');
	});
	
/* END MENU*/






});



